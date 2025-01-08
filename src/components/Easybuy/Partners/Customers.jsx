import React, { useState } from 'react';
import PartnersLayout from './PartnersLayout';
import { IoIosArrowDown } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from 'framer-motion'; 

const orders = [
 {
    productName: 'Yusuf A Baba',
    ProductId: '#3097674',
    productPrice: '+234-7890876723',
    orderDate: '04/10/2024',
    productStatus: 'active',
},
{
    productName: 'Mayowa Sanusi',
    ProductId: '#0297214',
    productPrice: '+234-7890876723',
    orderDate: '05/03/2022',
    productStatus: 'active',
},
{
    productName: 'Solomon Boss',
    ProductId: '#0457876',
    productPrice: '+234-7890876723',
    orderDate: '24/11/2024',
    productStatus: 'inactive',
},
{
    productName: 'Marvelous Boss',
    ProductId: '#0409876',
    productPrice: '+234-7890876723',
    orderDate: '14/03/2021',
    productStatus: 'active',
},
{
    productName: 'Boss Kabir',
    ProductId: '#0203476',
    productPrice: '+234-7890876723',
    orderDate: '02/12/2024',
    productStatus: 'inactive',
},
{
    productName: 'Yusuf A Baba',
    ProductId: '#3097674',
    productPrice: '+234-7890876723',
    orderDate: '04/10/2024',
    productStatus: 'active',
},
{
    productName: 'Mayowa Sanusi',
    ProductId: '#0297214',
    productPrice: '+234-7890876723',
    orderDate: '05/03/2022',
    productStatus: 'inactive',
},
{
    productName: 'Solomon Boss',
    ProductId: '#0457876',
    productPrice: '+234-7890876723',
    orderDate: '24/11/2024',
    productStatus: 'active',
},
{
    productName: 'Marvelous Boss',
    ProductId: '#0409876',
    productPrice: '+234-7890876723',
    orderDate: '14/03/2021',
    productStatus: 'inactive',
},
{
    productName: 'Yusuf A Baba',
    ProductId: '#3097674',
    productPrice: '+234-7890876723',
    orderDate: '04/10/2024',
    productStatus: 'active',
},
{
    productName: 'Mayowa Sanusi',
    ProductId: '#0297214',
    productPrice: '+234-7890876723',
    orderDate: '05/03/2022',
    productStatus: 'inactive',
},
{
    productName: 'Solomon Boss',
    ProductId: '#0457876',
    productPrice: '+234-7890876723',
    orderDate: '24/11/2024',
    productStatus: 'active',
},
{
    productName: 'Marvelous Boss',
    ProductId: '#0409876',
    productPrice: '+234-7890876723',
    orderDate: '14/03/2021',
    productStatus: 'inactive',
},
]


const Customers = ({ handleStep }) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Items per page for pagination
    const itemsPerPage = 6;
    const pageCount = Math.ceil(orders.length / itemsPerPage);
    const displayedOrders = orders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

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
                    <li>Pending</li>
                    <li>Leads</li>
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
                        <li className="font-medium text-md relative lg:-left-8">Name</li>
                        <li className="font-medium text-md relative lg:-left-8">Phone Number</li>
                        <li className="font-medium text-md relative lg:-left-4">Date</li>
                        <li className="font-medium text-md lg:mr-7 relative xl:left-[-2rem]">Status</li>
                        <li className="font-medium text-md lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                    </ul>

                    {/* Animate individual order items */}
                    {displayedOrders.map((item, index) => (
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
                                    <div className="text-sm justify-start ml-[-1rem] font-poppins font-medium lg:truncate">
                                        <p>{item.ProductId}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between lg:w-auto mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Name</p>
                                    <span className="text-sm font-poppins font-medium lg:relative lg:right-24 lg:max-w-[8rem] lg:truncate">
                                        {item.productName}
                                    </span>
                                </div>
                                <div className="flex justify-between w-full lg:w-auto mt-3">
                                    <p className="font-poppins text-md font-medium lg:hidden">Phone Number</p>
                                    <span className="font-poppins text-sm font-medium lg:ml-[-6rem] xl:ml-[-9rem]">{item.productPrice}</span>
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
                    ))}

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
        </PartnersLayout>
    );
};

export default Customers;

