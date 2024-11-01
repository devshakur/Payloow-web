import React, {useState} from 'react'
import InvestorLayoutPage from './InvestorLayoutPage'
import { Sort, More, Briefcase } from 'iconsax-react'
import ReactPaginate from 'react-paginate';
import { Investment } from '../Loans/UserData';
const MyInvestment = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 8; 
    const totalPages = Math.ceil(Investment.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayedRequests = Investment.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
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
                            <p className='text-3xl mx-6 my-3 font-poppins font-[600]'>₦10,000,000</p>
                        </div>
                        <div className='bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center justify-between gap-2 mx-2'>
                                <p className='font-normal text-xl font-poppins text-[#1D2433]'>Active Investments</p>
                                <More size="22" color="#000000"/>
                            </div>
                            <p className='text-[33px] flex justify-center mx-8 my-3 font-poppins font-[600]'>4</p>
                        </div>
                        <div className='bg-[#F1F3F9] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center justify-between  gap-2 mx-2'>
                                <p className='font-normal text-xl font-poppins text-[#1D2433]'>Completed</p>
                                <More size="22" color="#000000"/>
                            </div>
                            <p className='text-[33px] flex justify-center mx-8 my-3 font-poppins font-[600]'>30</p>
                            
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
    {displayedRequests.map((user) => (
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
    ))}
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
