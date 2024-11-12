import React, {useState, useEffect} from 'react'
import InvestorLayoutPage from './InvestorLayoutPage'
import { Sort, More, Briefcase } from 'iconsax-react'
import ReactPaginate from 'react-paginate';
import { Investment } from '../Loans/UserData';
import useInvestment from '../../../hooks/useInvetment';
const MyInvestment = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {getUserDetails, GetInvestmentRequest,  ViewBusiness } = useInvestment();
    const [user, setUser] = useState({});
    const [wallet, setWallet] = useState({});
    const [businesses, setBusinesses] = useState([]);
    const [data, setData] = useState([]);

    const itemsPerPage = 8; 
    const totalPages = Math.ceil(Investment.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    
    useEffect(() => {
        const userDetails = async () => {
            try {
                const resp = await getUserDetails();
                let info = resp.data.data;
                let balance = resp.data.data.wallet
                if(info){
                    console.log(info);
                    setUser(info)
                    setWallet(balance)

                }
            } catch (error) {
                console.error("Failed to fetch information on User:", error);
            }
        };

        userDetails();
    }, []);

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
    <InvestorLayoutPage>
          <header className='flex justify-between mx-2 my-3 items-center'>
                <div>
                    <h3 className='font-poppins text-2xl font-semibold'>Welcome Mayowa</h3>
                    <p className='font-poppins font-normal my-1 leading-6 text-lg text-[#000000]'>Track your investment portfolio and monitor business growth.</p>
                </div>
                <button className='px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400'>
                    <Sort size="20" color="blue" />
                    <p className='text-lg text-blue-600 font-semibold font-poppins'>Filter</p>
                </button>
            </header>
            <div className='md:flex gap-5 w-[95%]'>
                        <div className='bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md'>
                            <div className='flex items-center justify-between gap-2 mx-6'>
                                <p className='font-medium text-xl font-poppins text-[#1D2433]'>Total Invested</p>
                                <More size="22" color="#000000"/>
                            </div>
                            <p className='text-3xl mx-6 my-3 font-poppins font-[600]'>₦{wallet.balance}</p>
                        </div>
                        <div className='bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center justify-between gap-2 mx-2'>
                                <p className='font-normal text-xl font-poppins text-[#1D2433]'>Active Investments</p>
                                <More size="22" color="#000000"/>
                            </div>
                            <p className='text-[33px] flex justify-center mx-8 my-3 font-poppins font-[600]'>{wallet.balance}</p>
                        </div>
                        <div className='bg-[#F1F3F9] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center justify-between  gap-2 mx-2'>
                                <p className='font-normal text-xl font-poppins text-[#1D2433]'>Completed</p>
                                <More size="22" color="#000000"/>
                            </div>
                            <p className='text-[33px] flex justify-center mx-8 my-3 font-poppins font-[600]'>{wallet.balance}</p>
                            
                        </div>
                    </div>
                    <article className='bg-white w-[90%]  overflow-y-scroll overflow-x-hidden mx-5 rounded-lg p-6'>
    <ul className='lg:flex mx-6 justify-between bg-white shadow-lg py-3 w-[90%] hidden'>
        <li className='font-semibold text-lg'>Business Name</li>
        <li className='font-semibold text-lg relative right-10'>Amount</li>
        <li className='font-semibold text-lg relative right-14'>Expected ROI</li>
        <li className='font-semibold text-lg relative right-14'>Date of Investment</li>
        <li className='font-semibold text-lg relative right-24'>Status</li>
        <li className='font-semibold text-lg relative right-20'>Action</li>
    </ul>
    {displayedRequests && displayedRequests.length > 0 ?
    displayedRequests.map((user) => (
        <div key={user.id} className='bg-[#F1F3F9] rounded-lg p-4 mb-4 shadow-sm'>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='flex-1 mt-2'>
                    <p className='font-poppins text-lg font-semibold lg:hidden'>Business Name:</p>
                    <span className='lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black'>{user.BusinessName}</span>
                </div>

                
                <div className='flex-1 mt-2'>
                    <p className='font-poppins text-lg font-semibold lg:hidden'>Amount:</p>
                    <span className='lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black'>{user.Amount}</span>
                </div>
                <div className='flex-1 mt-2'>
                    <p className='font-poppins text-lg font-semibold lg:hidden'>Expected ROI:</p>
                    <span className='lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black'>{user.ExpectedRoi}</span>
                </div>
                <div className='flex-1 mt-2'>
                    <p className='font-poppins text-lg font-semibold lg:hidden'>Date of Request:</p>
                    <span className='lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black'>{user.DateOfRequest}</span>
                </div>
                <div className='flex-1 mt-2'>
                    <p className='font-poppins text-lg font-semibold lg:hidden'>Status:</p>
                    <img src={user.StatusImage} className='my-2' alt="status" />
                </div>
                <div className='flex-1 mt-2'>
                    <More size="24" color="gray" />
                </div>
            </div>
        </div>
    )): <p className='my-6 text-xl mx-6'>You do not have any active investment. Start investing now!!</p>}
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


    </InvestorLayoutPage>
  )
}

export default MyInvestment
