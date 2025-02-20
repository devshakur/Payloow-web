import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import BuyersLayoutGen from '../BuyersLayoutGen';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import {toast, Toaster} from 'react-hot-toast'
import useInvestment from '../../../../hooks/useInvetment';


const UserOrders = () => {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const {GetUserOrders} = useInvestment();
   const [allOrders, setAllOrders] = useState([])
const [showBrandInput, setShowBrandInput] = useState(false);
const [showPriceInput, setShowPriceInput] = useState(false);
const [brandFilter, setBrandFilter] = useState('');
const [priceFilter, setPriceFilter] = useState('');

   
    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const resp = await GetUserOrders();
                const data = resp?.data?.data?.data; // Nested data structure
                const message = resp?.data?.message;

                if (data) {
                    const formattedOrders = data.map((order) => ({
                        img: order.product?.imageKey || '/images/placeholder.png',
                        productName: order.product?.name || 'Unknown Product',
                        ProductId: order.transactionReference,
                        productPrice: `$${order.price.toLocaleString()}`,
                        orderDate: new Date(order.createdAt).toLocaleDateString(),
                        productStatus: order.paymentStatus,
                    }));

                    setAllOrders(formattedOrders);
                    toast.success(message || 'Fetched all orders');
                } else {
                    toast.success('No orders found');
                }
            } catch (error) {
                const errorMessage = error?.response?.data?.msg || 'Failed to fetch products';
                toast.error(errorMessage);
            }
        };

        getAllOrders();
    }, []);
   

    // Filter orders based on selected status
    const filteredOrder = selectedStatus === 'All'
        ? allOrders
        : allOrders.filter(order => order.productStatus.toLowerCase() === selectedStatus.toLowerCase());

    // Handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
  


const filteredOrders = allOrders.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.productStatus.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesBrand = brandFilter === '' || 
        (order.productName && order.productName.toLowerCase().includes(brandFilter.toLowerCase()));
    
    // Remove "$" from productPrice and convert to a number
    const numericPrice = parseFloat(order.productPrice.replace(/[^0-9.-]+/g, '')); 
    const matchesPrice = priceFilter === '' || numericPrice <= parseFloat(priceFilter);

    return matchesStatus && matchesBrand && matchesPrice;
});


   

    // Items per page for pagination
    const itemsPerPage = 4;
    const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
    const displayedOrders = filteredOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    

   
    return (
        <BuyersLayoutGen>
            <div>
                <div className='w-full flex justify-start cursor-pointer'>
                    <ul className='flex gap-8 border-gray-900 p-3 text-lg mb-5'>
                        <li
                            className={selectedStatus === 'All' ? 'bg-black text-white p-2 shadow-md rounded-md' : 'text-blue-600 bg-blue-100 p-2 shadow-md rounded-md'}
                            onClick={() => setSelectedStatus('All')}
                        >
                            All Orders
                        </li>
                        <li
                            className={selectedStatus === 'pending' ? 'bg-black text-white p-2 shadow-md rounded-md' : 'text-blue-600 bg-blue-100 p-2 shadow-md rounded-md'}
                            onClick={() => setSelectedStatus('pending')}
                        >
                            Pending
                        </li>
                        <li
                            className={selectedStatus === 'paid' ? 'bg-black text-white p-2 shadow-md rounded-md' : 'text-blue-600 bg-blue-100 p-2 shadow-md rounded-md'}
                            onClick={() => setSelectedStatus('paid')}
                        >
                            Shipped
                        </li>
                    </ul>
                </div>

                <div className='flex justify-between'>
                    <div className='lg:flex items-center gap-4'>
                        <button className='hidden border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 md:flex justify-start items-center gap-3'>
                            <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
                            <p className='text-lg text-blue-700'> Filters</p>
                        </button>
                <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <p className="font-poppins text-lg font-semibold text-blue-700 flex items-center gap-2 cursor-pointer"
                           onClick={() => setShowBrandInput(!showBrandInput)}>
                            Brand <IoIosArrowDown />
                        </p>
                        {showBrandInput && (
                            <input
                                type="text"
                                placeholder="Enter brand"
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className="border px-3 py-2 rounded"
                            />
                        )}
                        <p className="font-poppins text-lg font-semibold flex items-center gap-2 cursor-pointer"
                           onClick={() => setShowPriceInput(!showPriceInput)}>
                            Price <IoIosArrowDown />
                        </p>
                        {showPriceInput && (
                            <input
                                type="number"
                                placeholder="Enter max price"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="border px-3 py-2 rounded"
                            />
                        )}
                    </div>
                </div>
                    
                    </div>
                    </div>
                    <p className='hidden font-poppins font-medium md:flex items-center gap-2 text-lg text-[#101928]'>
                        Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>Most Recent <IoIosArrowDown /></span>
                    </p>
                </div>

                <div className="flex justify-center">
                    <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
                        <ul className="lg:flex justify-between bg-white shadow-lg hidden">
                            <li className="font-semibold text-lg lg:mr-5">Product</li>
                            <li className="font-semibold text-lg relative lg:-left-2 xl:left-12">Product ID</li>
                            <li className="font-semibold text-lg relative lg:left-3 xl:left-14">Price</li>
                            <li className="font-semibold text-lg lg:-mr-2">Order Date</li>
                            <li className="font-semibold text-lg lg:mr-3 relative xl:left-[-2rem]">Status</li>
                            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                        </ul>

                        {/* Animate the list of orders */}
                        {displayedOrders.map((item) => (
                            <motion.div
                                key={item.ProductId}
                                className="rounded-lg p-4 mb-4 shadow-sm"
                                initial={{ opacity: 0, x: -50 }}  // Start from left with 0 opacity
                                animate={{ opacity: 1, x: 0 }}  // Slide in and fade in
                                transition={{ duration: 0.6, ease: "easeOut" }}  // Smooth transition
                            >
                                <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                    <div className="flex justify-between w-full lg:w-[12%] mt-3">
                                        <p className="font-plus-jakarta text-lg font-medium lg:hidden">Product:</p>
                                        <div className="text-sm flex gap-2 justify-start ml-[-1rem] font-poppins font-semibold lg:truncate">
                                            <img src={item.img} alt="phone" style={{ width: '30px', height: '30px' }} />
                                            <p>{item.productName}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between lg:w-auto mt-3">
                                        <p className="font-plus-jakarta text-lg font-medium lg:hidden">Product ID:</p>
                                        <span className="text-sm font-plus-jakarta font-medium   lg:ml-[-3rem] lg:max-w-[8rem] lg:truncate">
                                            {item.ProductId}
                                        </span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-plus-jakarta text-lg font-medium lg:hidden">Price:</p>
                                        <span className=" text-sm font-plus-jakarta font-medium  lg:ml-[-3.5rem]">{item.productPrice}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-plus-jakarta text-lg font-medium lg:hidden">Order Date:</p>
                                        <span className="text-sm font-plus-jakarta font-medium  lg:relative lg:right-10 xl:right-14">{item.orderDate}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-plus-jakarta text-lg font-medium lg:hidden">Status:</p>
                                        <span
                                            className={`text-sm font-plus-jakarta font-medium lg:relative right-9 xl:right-20 ${item.productStatus.toLowerCase() === 'pending' ? 'text-red-500' : 'text-green-500'}`}
                                        >
                                            {item.productStatus}
                                        </span>
                                    </div>

                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-plus-jakarta text-lg font-medium lg:hidden">Action:</p>
                                        <span className="font-poppins text-sm font-semibold lg:relative lg:right-9 xl:right-24">...</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

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
                            <div className='px-6 h-8 mt-5 text-white bg-blue-700 flex items-center gap-3 rounded-lg'><IoIosArrowBack className='w-4 h-4' /> <IoIosArrowForward className='w-4 h-4' /></div>
                        </div>
                    </article>
                </div>
            </div>
            <Toaster/>
        </BuyersLayoutGen>
    );
};

export default UserOrders;


