import React, {useState, useEffect} from 'react'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion'; 
import {toast, Toaster} from 'react-hot-toast'



const Investors = ({investors}) => {
    const [currentPage, setCurrentPage] = useState(0);


    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
    
    // Items per page for pagination
    const itemsPerPage = 4;
    const pageCount = Math.ceil(investors.length / itemsPerPage);
    const displayedOrders = investors.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  return (
    <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
                    <ul className="lg:flex justify-between bg-gray-200 p-3 rounded-lg shadow-lg hidden">
                        <li className="font-medium text-md lg:mr-8">Investor ID</li>
                        <li className="font-medium text-md relative lg:-left-5">Name</li>
                        <li className="font-medium text-md relative lg:-left-2">Contact</li>
                        <li className="font-medium text-md relative lg:-right-5">Email</li>
                        <li className="font-medium text-md lg:mr-6 relative xl:left-[3rem]">Industry</li>
                        <li className="font-medium text-md lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                    </ul>

                    {/* Animate individual order items */}
                    {displayedOrders.length === 0 ?(
                 <>
                 <div className='flex justify-start'>
                    <p className='text-lg font-medium font-plus-jakarta text-gray-600'>No Available Customers</p>
                 </div>
                 </>
                    ): 
                    displayedOrders.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="rounded-lg p-4 mb-4 shadow-md lg:shadow-sm"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.4, delay: 0.2 * index }} // Delay for each item to appear staggered
                        >
                            <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                <div className="flex justify-between items-center w-full lg:w-[12%]">
                                    <p className="font-poppins text-md font-medium lg:hidden">Investor ID:</p>
                                    <div className="text-sm justify-start ml-[-1rem] font-poppins  font-medium truncate">
                                        <p className='w-[80px] md:w-[160px] lg:w-[140px] truncate'>{item._id}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between lg:w-auto">
                                    <p className="font-poppins text-md font-medium lg:hidden">Name:</p>
                                    <span className="text-sm font-poppins font-medium lg:relative lg:right-4 xl:right-16 lg:max-w-[8rem] lg:truncate">
                                    {`${item.user.firstName}  ${item.user.lastName}` }
                                    </span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto">
                                    <p className="font-poppins text-md font-medium lg:hidden">Contact</p>
                                    <span className="font-poppins text-sm font-medium lg:ml-[-1rem] xl:ml-[-4rem] truncate">{item.contact_phone_number}</span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto">
                                    <p className="font-poppins text-md font-medium lg:hidden">Email:</p>
                                    <span className="text-sm font-poppins font-medium lg:relative lg:right-4">{item.contact_email}</span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto">
                                    <p className="font-poppins text-md font-medium lg:hidden">Industry:</p>
                                    <span
                                        className='text-sm font-poppins  font-medium lg:relative right-9 xl:right-18 text-green-500 '
                                    >
                                        {item.industry[0]}
                                    </span>
                                </div>

                                <div className="flex justify-between w-full lg:w-auto">
                                    <p className="font-poppins text-md font-medium lg:hidden">Action:</p>
                                    <span className="font-poppins text-sm font-semibold lg:relative lg:right-9 xl:right-24">...</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                }
                    {/* Pagination with animation */}
                    <div className="flex text-center justify-between">
                        <ReactPaginate
                            previousLabel="←"
                            nextLabel="→"
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="flex justify-center mt-6"
                            pageClassName="mx-1"
                            pageLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200"
                            previousClassName="mx-1"
                            previousLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200"
                            nextClassName="mx-1"
                            nextLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200"
                            activeClassName="bg-blue-600 text-white"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                        <div className='px-6 h-8 mt-5 text-white bg-blue-700 flex items-center gap-3 rounded-lg'>
                            <IoIosArrowBack className='w-4 h-4' /> <IoIosArrowForward className='w-4 h-4' />
                        </div>
                    </div>
                    <Toaster />
                </article>
  )
}

export default Investors
