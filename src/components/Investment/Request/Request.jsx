import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Sort, More } from 'iconsax-react';
import DebtorLayoutPage from '../Debtor/DebtorLayoutPage';
import { userRequest } from '../Loans/UserData';
import useInvestment from '../../../hooks/useInvetment';
import { format } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';

const Request = () => {
  const { GetInvestmentRequest, ViewBusiness, AcceptInvestmentRequest, DeclineInvestmentRequest } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage); 

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {

    const fetchBusinessDetails = async () => {
      try {
        const resp = await ViewBusiness();
        const businessData = resp?.data?.data?.businesses || [];
        setBusinesses(businessData);
        console.log('Businesses:', businessData);
      } catch (error) {
        toast.error('Failed to fetch business data:', error);
      }
    };

    fetchBusinessDetails();
  }, []);

  useEffect(() => {
  
    const fetchInvestmentRequests = async () => {
      try {
        const allRequests = [];

       
        for (let business of businesses) {
          if (business.has_loan === true) {
            console.log(business);
            const businessId = business.business_id; // Use business_id from businesses
            const resp = await GetInvestmentRequest(businessId); 
            const investmentRequests = resp?.data?.data?.investments?.investments || [];
            console.log(investmentRequests);
            allRequests.push(...investmentRequests); 
          }
        }

        setData(allRequests); // Set the combined data from all businesses
        console.log('Combined Investment Requests:', allRequests);
      } catch (error) {
        console.error('Failed to fetch investment requests:', error);
      }
    };

    if (businesses.length > 0) {
      fetchInvestmentRequests();
    }
  }, [businesses]); 

  const acceptRequest = async (investmentId) => {
    try {
        
        const resp = await AcceptInvestmentRequest(investmentId);

      
        if (resp?.data?.success === true) {
            toast.success('Investment request accepted successfully!');
        } else {
         
            toast.error('Failed to accept investment request.');
        }
    } catch (error) {
    
        if (error?.response?.data?.success === false) {
           
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage || 'An error occurred while accepting the investment request.');
        } else {
           
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
};


const declineRequest = async (investmentId) => {
    try {
        const resp = await DeclineInvestmentRequest(investmentId);

        
        if (resp?.data?.success === true) {
            toast.success('Investment request accepted successfully!');
        } else {
         
            toast.error('Failed to accept investment request.');
        }
    } catch (error) {
       
        if (error?.response?.data?.success === false) {
         
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage || 'An error occurred while accepting the investment request.');
        } else {
            
            toast.error('An unexpected error occurred. Please try again.');
        }
    }
}

  const displayedRequests = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <DebtorLayoutPage>
      <main className='w-[100vw]'>
        <header className='flex justify-between mx-12 lg:mx-0 my-5 items-center w-[100%]'>
          <h3 className='font-poppins text-xl font-semibold'>Investment Request</h3>
          <button className='px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400'>
            <Sort size="20" color="blue" />
            <p className='text-lg text-blue-600 font-semibold font-poppins'>Filter</p>
          </button>
        </header>

        <article className="bg-white overflow-y-scroll mx-4 lg:mx-0 rounded-lg p-4">
          <ul className="lg:flex justify-between bg-white shadow-lg hidden">
            <li className="font-semibold text-lg lg:mr-5">Investor</li>
            <li className="font-semibold text-lg">Business Name</li>
            <li className="font-semibold text-lg lg:mr-5">Amount</li>
            <li className="font-semibold text-lg lg:mr-7">Expected ROI</li>
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3rem]">Installment Amount</li>
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.4rem]">Repayment Term</li>
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.5rem]">Date of Request</li>
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.8rem]">Total Profit</li>
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.8rem]">Status</li>
            <li className="font-semibold text-lg relative right-[-20px]  xl:left-[-4rem]">Action</li>
          </ul>

          {displayedRequests && displayedRequests.length > 0 ?
            displayedRequests.map((user) => {
              return (
                <div key={user.id} className='bg-[[#F1F3F9] ] rounded-lg p-4 mb-4 shadow-sm'>
                  <div className='flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row'>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Investor:</p>
                      <span className='text-sm justify-start ml-[-1rem] font-poppins font-semibold lg:max-w-[5rem] lg:truncate'>{user.investor.first_name} {user.investor.last_name}</span>
                    </div>
                    <div className="flex justify-between  lg:w-auto mt-3">
                 <p className="font-poppins text-lg font-semibold lg:hidden">Business Name:</p>
                 <span className="text-sm font-poppins font-semibold lg:ml-[-1rem] lg:max-w-[8rem] lg:truncate">{user.Business.business_name}</span>
                 </div>


                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Invested Amount:</p>
                      <span className='font-poppins text-sm font-semibold lg:ml-[-1rem]'>{user.investment_amount}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Expected Roi:</p>
                      <span className='text-sm font-poppins font-semibold lg:mx-6'>{user.expected_roi}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Installment Amount:</p>
                      <span className='text-sm font-poppins font-semibold lg:relative left-7'>{user.installment_amount}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Repayment Term:</p>
                      <span className='font-poppins text-sm font-semibold lg:relative lg:left-[7rem]'>{user.repayment_term}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Date of Request:</p>
                      <span className='font-poppins text-sm font-semibold lg:relative lg:left-[11rem]'>{format(new Date(user.created_at), 'dd/MM/yyyy')}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Total Profit:</p>
                      <span className='font-poppins text-sm font-semibold lg:relative lg:left-[13rem]'>{user.total_profit}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Status:</p>
                      <p className='font-poppins text-sm font-semibold lg:relative lg:left-[14rem]' style={{
                    color: user.investment_status === 'pending' ? 'orange' :
                      user.investment_status === 'accepted' ? 'green' :
                        user.investment_status === 'declined' ? 'red' : 'black'
                  }}>
                    {user.investment_status}
                  </p>
                  
                    </div>

                    <div className='w-full ml-12 flex flex-col gap-5 mx-5 relative right-14 lg:left-[8rem] lg:flex-row lg:w-auto mt-3'>
                      {user.StatusImage === "/images/pending.png" ? (
                        <>
                          <button  className='w-full py-2 px-4 rounded-lg bg-blue-600 text-white'>✔</button>
                          <button  className='w-full py-2 px-4 bg-blue-600 rounded-lg text-white'>✖</button>
                        </>
                      ) : (
                        <>
                          <button onClick={()=> acceptRequest(user.investment_id)} className='w-full py-2 px-4 rounded-lg bg-green-600 text-white'>✔</button>
                          <button onClick={()=> declineRequest(user.investment_id)} className='w-full py-2 px-4 border rounded-lg border-blue-500 text-blue-500'>✖</button>
                        </>
                      )}
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3 relative right-14'>
                
                    </div>
                  </div>
                </div>
              );
            }) : <div className='text-xl my-6 mx-6'>No Available Investment Request</div>
          }

          <div className='flex'>
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'flex justify-center mt-6'}
              pageClassName={'mx-1'}
              pageLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
              previousClassName={'mx-1'}
              previousLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
              nextClassName={'mx-1'}
              nextLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
              activeClassName={'bg-blue-600 text-white'}
              disabledClassName={'opacity-50 cursor-not-allowed'}
            />
          </div>
        </article>
        <Toaster />
      </main>
    </DebtorLayoutPage>
  );
};

export default Request;
