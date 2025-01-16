import React, { useState, useEffect } from 'react';
import PartnersLayout from './PartnersLayout';
import { IoIosArrowDown } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from 'framer-motion'; 
import {toast, Toaster} from 'react-hot-toast'
import useInvestment from '../../../hooks/useInvetment';




const Customers = ({ handleStep }) => {
    const {GetPartnerCustomers} = useInvestment()
    const [currentPage, setCurrentPage] = useState(0);
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const GetCustomers = async () => {
            try {
                const resp = await GetPartnerCustomers();
                const message = resp?.data?.message; 
                const customersData = resp?.data?.data; // Updated to match API response structure
                if (customersData) {
                    // Map the response data to match your component's expected format
                    const formattedCustomers = customersData.map((customer) => ({
                        ProductId: customer._id,
                        productName: customer.user.email,
                        productPrice: customer.user.Address,
                        orderDate: new Date(customer.createdAt).toLocaleDateString(),
                        productStatus: 'active', // Assuming all customers are active; adjust based on logic
                    }));
                    setCustomers(formattedCustomers);
                    toast.success(message);
                } else {
                    toast.success('Fetched Customers');
                }
            } catch (error) {
                if (error?.response?.data?.msg) {
                    toast.error(error.response.data.msg);  
                } else {
                    toast.error('Failed to fetch customers'); 
                }
            }
        };
        GetCustomers();
    }, []);
    

    // Handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Items per page for pagination
    const itemsPerPage = 6;
    const pageCount = Math.ceil(customers.length / itemsPerPage);
    const displayedOrders = customers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <PartnersLayout>
            <motion.div 
                className="md:flex md:justify-between"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <ul className='flex gap-3 border-b border-gray-300 cursor-pointer'>
                    <li>All Customers</li>
                </ul>
                <div>
                    <button 
                        onClick={handleStep} 
                        className='mt-5 md:mt-0 bg-blue-600 py-2 px-12 text-sm rounded-md text-white'
                    >
                        Add new Customer
                    </button>
                </div>
            </motion.div>

            <motion.div 
                className="flex justify-between mt-5"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className='lg:flex items-center gap-4'>
                    <button className='p-2'>
                        <p className='text-md text-[#000]'> Filters</p>
                    </button>
                    <div className='hidden lg:flex gap-3'>
                        <p className='font-poppins text-md font-semibold flex items-center gap-2 text-blue-400'>
                            Type <IoIosArrowDown className='text-blue-400' />
                        </p>
                    </div>
                </div>
                <p className='font-poppins font-medium flex items-center gap-2 text-md text-[#101928]'>
                    Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>November<IoIosArrowDown /></span>
                </p>
            </motion.div>

            <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
                    <ul className="lg:flex justify-between bg-white shadow-lg hidden">
                        <li className="font-medium text-md lg:mr-5">Customer ID</li>
                        <li className="font-medium text-md relative lg:-left-8">EMAIL</li>
                        <li className="font-medium text-md relative lg:-left-8">Address</li>
                        <li className="font-medium text-md relative lg:-right-20">Date</li>
                        <li className="font-medium text-md lg:mr-7 relative xl:left-[1rem]">Status</li>
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
                            key={item.ProductId} 
                            className="rounded-lg p-4 mb-4 shadow-md lg:shadow-sm"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.4, delay: 0.2 * index }} // Delay for each item to appear staggered
                        >
                            <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                <div className="flex justify-between w-full lg:w-[12%] mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Customer ID:</p>
                                    <div className="text-sm justify-start ml-[-1rem] font-poppins font-medium truncate">
                                        <p>{item.ProductId}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between lg:w-auto mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Email</p>
                                    <span className="text-sm font-poppins font-medium lg:relative lg:right-24 lg:max-w-[8rem] lg:truncate">
                                        {item.productName}
                                    </span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Address</p>
                                    <span className="font-poppins text-sm font-medium lg:ml-[-6rem] xl:ml-[-9rem] truncate">{item.productPrice}</span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Date</p>
                                    <span className="text-sm font-poppins font-medium lg:relative lg:right-8">{item.orderDate}</span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Status:</p>
                                    <span
                                        className={`text-sm font-poppins font-medium lg:relative right-9 xl:right-20 ${item.productStatus.toLowerCase() === 'inactive' ? 'text-red-500' : 'text-green-500'}`}
                                    >
                                        {item.productStatus}
                                    </span>
                                </div>

                                <div className="flex justify-between w-full lg:w-auto mt-3">
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
                </article>
            </motion.div>
            <Toaster />
        </PartnersLayout>
    );
};

export default Customers;

