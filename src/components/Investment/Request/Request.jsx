// import React, { useState,  useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import { Sort, More } from 'iconsax-react';
// import DebtorLayoutPage from '../Debtor/DebtorLayoutPage';
// import { userRequest } from '../Loans/UserData';
// import useInvestment from '../../../hooks/useInvetment';

// const Request = () => {
//     const {GetInvestmentRequest, ViewBusiness } = useInvestment()
//     const [currentPage, setCurrentPage] = useState(0);
//     const [data, setData] = useState()

//     const itemsPerPage = 8; 
//     const totalPages = Math.ceil(userRequest.length / itemsPerPage);

//     const handlePageClick = (data) => {
//         setCurrentPage(data.selected);
//     };

//     useEffect(()=>{
//         const businessDetails = async ()=>{
//           try {
//             const resp = await ViewBusiness();
//             let info = resp?.data?.data?.businesses           
//             console.log(info);
//           } catch (error) {
//             console.error("Failed to fetch information on business:", error); 
//           }
        
//         }
//           businessDetails();
//         }, [])

// //  useEffect(()=>{
// //      const getRequest = async ()=>{
// //          try {
// //           const resp = await  GetInvestmentRequest()
// //           let info = resp?.data
// //           if(info){
// //              setData(info)
// //           }
// //          } catch(error) {
             
// //              console.error("Failed to fetch information on Investment Request", error);
// //          }
// //      }
// //      getRequest();
// //  }, [])

//   const displayedRequests = userRequest.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
// // const displayedRequests = data;
//     return (
//         <DebtorLayoutPage>
//             <main className='w-[100vw] '>
//                 <header className='flex justify-between mx-12 my-5 items-center w-[70%]'>
//                     <h3 className='font-poppins text-xl font-semibold'>Investment Request</h3>
//                     <button className='px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400'>
//                         <Sort size="20" color="blue" />
//                         <p className='text-lg text-blue-600 font-semibold font-poppins'>Filter</p>
//                     </button>
//                 </header>
//                 <article className='bg-white w-[70%] overflow-y-scroll overflow-x-hidden mx-[4rem] rounded-lg p-6'>
//                     <ul className='lg:flex mx-6 justify-between bg-white shadow-lg py-3 w-[75%] hidden'>
//                         <li className='font-semibold text-lg'>Investor</li>
//                         <li className='font-semibold text-lg'>Business Name</li>
//                         <li className='font-semibold text-lg'>Amount</li>
//                         <li className='font-semibold text-lg'>Date of Request</li>
//                         <li className='font-semibold text-lg'>Status</li>
//                         <li className='font-semibold text-lg relative right-3'>Action</li>
//                     </ul>
//                     {displayedRequests && displayedRequests.length > 0 ?
//                     displayedRequests.map((user) => (
//                           <div key={user.id} className='bg-[#F1F3F9] rounded-lg p-4 mb-4 shadow-sm'>
//                         <div key={user.id} className='flex gap-5 mx-5 justify-center lg:justify-between lg:items-center flex-col lg:flex-row'>
//                             <div className='flex justify-between w-full lg:w-auto mt-3'>
//                                 <p className='font-poppins text-lg font-semibold lg:hidden'>Investor:</p>
//                                 <span className='w-15 text-sm font-poppins font-semibold'>{user.Investor}</span>
//                             </div>
//                             <div className='flex justify-between w-full lg:w-auto mt-3'>
//                                 <p className='font-poppins text-lg font-semibold lg:hidden'>Business Name:</p>
//                                 <span className='text-sm font-poppins font-semibold'>{user.BusinessName}</span>
//                             </div>
//                             <div className='flex justify-between w-full lg:w-auto mt-3'>
//                                 <p className='font-poppins text-lg font-semibold lg:hidden'>Amount:</p>
//                                 <span className='font-poppins text-sm font-semibold'>{user.Amount}</span>
//                             </div>
//                             <div className='flex justify-between w-full lg:w-auto mt-3'>
//                                 <p className='font-poppins text-lg font-semibold lg:hidden'>Date of Request:</p>
//                                 <span className='font-poppins text-sm font-semibold'>{user.DateOfRequest}</span>
//                             </div>
//                             <div className='flex justify-between w-full lg:w-auto mt-3'>
//                                 <p className='font-poppins text-lg font-semibold lg:hidden'>Status:</p>
//                                 <img src={user.StatusImage} className='my-5' alt="status" />
//                             </div>
                           
//                             <div className='flex flex-col gap-5 mx-5 relative right-14 lg:flex-row lg:w-auto mt-3'>
//                                 {user.StatusImage === "/images/pending.png" ? (
//                                     <>
//                             <button className='w-full py-2 px-4 rounded-lg bg-blue-600 text-white'>✔</button>
//                             <button className='w-full py-2 px-4 bg-blue-600 rounded-lg text-white'>✖</button>
//                             </>
//                                 ) : (   
//                                 <>
//                                 <button className='w-full py-2 px-4 rounded-lg bg-green-600 text-white'>✔</button>
//                                 <button className='w-full py-2 px-4 border rounded-lg border-blue-500 text-blue-500'>✖</button> 
//                                 </>
//                                )}
//                             </div>
//                             <div className='flex justify-between w-full lg:w-auto mt-3 relative right-14'>
//                             <More size="24" color="gray" />
//                             </div>
//                         </div>
//                         </div>
//                     )) : <div className='text-xl'>No Available Investment Request</div>}
//                     <div className='flex'>
//                     <ReactPaginate
//                         previousLabel={'←'}
//                         nextLabel={'→'}
//                         breakLabel={'...'}
//                         pageCount={totalPages}
//                         marginPagesDisplayed={2}
//                         pageRangeDisplayed={5}
//                         onPageChange={handlePageClick}
//                         containerClassName={'flex justify-center mt-6'}
//                         pageClassName={'mx-1'}
//                         pageLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
//                         previousClassName={'mx-1'}
//                         previousLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
//                         nextClassName={'mx-1'}
//                         nextLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
//                         activeClassName={'bg-blue-600 text-white'}
//                         disabledClassName={'opacity-50 cursor-not-allowed'}
//                     />
//                     </div>
//                 </article>
//             </main>
//         </DebtorLayoutPage>
//     );
// };

// export default Request;

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Sort, More } from 'iconsax-react';
import DebtorLayoutPage from '../Debtor/DebtorLayoutPage';
import { userRequest } from '../Loans/UserData';
import useInvestment from '../../../hooks/useInvetment';

const Request = () => {
  const { GetInvestmentRequest, ViewBusiness } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage); // Update to use 'data' for pagination

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    // Fetch business details
    const fetchBusinessDetails = async () => {
      try {
        const resp = await ViewBusiness();
        const businessData = resp?.data?.data?.businesses || [];
        setBusinesses(businessData);
        console.log('Businesses:', businessData);
      } catch (error) {
        console.error('Failed to fetch business data:', error);
      }
    };

    fetchBusinessDetails();
  }, []);

  useEffect(() => {
    // Fetch investment requests for each business_id
    const fetchInvestmentRequests = async () => {
      try {
        const allRequests = [];
        
        // Loop through each business and fetch investment requests for each business_id
        for (let business of businesses) {
          if( business.has_loan === true){
            console.log(business);
              const businessId = business.business_id; // Use business_id from businesses
              const resp = await GetInvestmentRequest(businessId); // Pass business_id to the request
              const investmentRequests = resp?.data?.data?.investment || [];
              allRequests.push(...investmentRequests); // Add all the requests from this business to the array
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
  }, [businesses]); // Dependency on businesses to trigger fetching investment requests once businesses are fetched

  const displayedRequests = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <DebtorLayoutPage>
      <main className='w-[100vw]'>
        <header className='flex justify-between mx-12 my-5 items-center w-[70%]'>
          <h3 className='font-poppins text-xl font-semibold'>Investment Request</h3>
          <button className='px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400'>
            <Sort size="20" color="blue" />
            <p className='text-lg text-blue-600 font-semibold font-poppins'>Filter</p>
          </button>
        </header>

        <article className='bg-white w-[70%] overflow-y-scroll overflow-x-hidden mx-[4rem] rounded-lg p-6'>
          <ul className='lg:flex mx-6 justify-between bg-white shadow-lg py-3 w-[75%] hidden'>
            <li className='font-semibold text-lg'>Investor</li>
            <li className='font-semibold text-lg'>Business Name</li>
            <li className='font-semibold text-lg'>Amount</li>
            <li className='font-semibold text-lg'>Date of Request</li>
            <li className='font-semibold text-lg'>Status</li>
            <li className='font-semibold text-lg relative right-3'>Action</li>
          </ul>

          {displayedRequests && displayedRequests.length > 0 ? 
            displayedRequests.map((user) => {
              return (
                <div key={user.id} className='bg-[#F1F3F9] rounded-lg p-4 mb-4 shadow-sm'>
                  <div className='flex gap-5 mx-5 justify-center lg:justify-between lg:items-center flex-col lg:flex-row'>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Investor:</p>
                      <span className='w-15 text-sm font-poppins font-semibold'>{user.Investor}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Business Name:</p>
                      <span className='text-sm font-poppins font-semibold'>{user.BusinessName}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Amount:</p>
                      <span className='font-poppins text-sm font-semibold'>{user.Amount}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Date of Request:</p>
                      <span className='font-poppins text-sm font-semibold'>{user.DateOfRequest}</span>
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3'>
                      <p className='font-poppins text-lg font-semibold lg:hidden'>Status:</p>
                      <img src={user.StatusImage} className='my-5' alt="status" />
                    </div>

                    <div className='w-full ml-12 flex flex-col gap-5 mx-5 relative right-14 lg:flex-row lg:w-auto mt-3'>
                      {user.StatusImage === "/images/pending.png" ? (
                        <>
                          <button className='w-full py-2 px-4 rounded-lg bg-blue-600 text-white'>✔</button>
                          <button className='w-full py-2 px-4 bg-blue-600 rounded-lg text-white'>✖</button>
                        </>
                      ) : (
                        <>
                          <button className='w-full py-2 px-4 rounded-lg bg-green-600 text-white'>✔</button>
                          <button className='w-full py-2 px-4 border rounded-lg border-blue-500 text-blue-500'>✖</button>
                        </>
                      )}
                    </div>
                    <div className='flex justify-between w-full lg:w-auto mt-3 relative right-14'>
                      <More size="24" color="gray" />
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
      </main>
    </DebtorLayoutPage>
  );
};

export default Request;
