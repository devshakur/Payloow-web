import React, { useState, useEffect } from 'react'
import BuyersLayoutGen from './BuyersLayoutGen'
import { BiCopy } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import {toast, Toaster} from 'react-hot-toast'
import { motion } from 'framer-motion';
import useInvestment from '../../../hooks/useInvetment';



const Payment = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const { GetUserOrders} = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([])
 const [totalPaid, setTotalPaid] = useState([])
 const [pendingAmount, setPendingAmount] = useState([])
 const [approved, setApproved] = useState([])
 const [processing, setProcessing] = useState([])
 const [date, setDate] = useState()
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

                setOrders(formattedOrders);
                toast.success(message || 'Fetched all orders');
                const totalPaid = formattedOrders
                    .filter((order) => order.productStatus === 'paid')
                    .reduce((sum, order) => {
                        // Parse price if it's a string
                        const price = typeof order.productPrice === 'string'
                            ? parseFloat(order.productPrice.replace(/[$,]/g, '')) // Remove $ and ,
                            : order.productPrice;

                        return sum + price;
                    }, 0);
                    const paidOrders = formattedOrders.filter((order) => order.productStatus === 'paid')
                    const pendingOrders = formattedOrders.filter((order) => order.productStatus === 'pending')
                    const pendingAmount = formattedOrders
                    .filter((order) => order.productStatus === 'pending')
                    .reduce((sum, order) => {
                        // Parse price if it's a string
                        const price = typeof order.productPrice === 'string'
                            ? parseFloat(order.productPrice.replace(/[$,]/g, '')) // Remove $ and ,
                            : order.productPrice;

                        return sum + price;
                    }, 0);
                    const ApprovedOrders = paidOrders.length
                     const processingOrders = pendingOrders.length
               setTotalPaid(totalPaid)
               setPendingAmount(pendingAmount)
               setApproved(ApprovedOrders)
               setProcessing(processingOrders)
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
const user = JSON.parse(localStorage.getItem(('currentUser')))


  // Filter orders based on selected status
  const filteredOrders = selectedStatus === 'All'
    ? orders
    : orders.filter(order => order.productStatus.toLowerCase() === selectedStatus.toLowerCase());

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Items per page for pagination
  const itemsPerPage = 4;
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(()=>{
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    setDate(formattedDate)

  },[])
  return (
    <BuyersLayoutGen>
      <div className='lg:grid lg:grid-cols-3 lg:gap-4'>
        {/* Available Balance Card */}
        <motion.div 
          className='bg-[#1E3DD7] w-full rounded-lg p-6 lg:p-8 lg:h-[300px]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className='font-poppins font-medium text-2xl text-white'>Available Balance</h3>
          <h4 className='font-poppins font-medium text-4xl text-white mt-3'>₦{user ? user?.wallet?.balance.toLocaleString() : '0'}</h4>
          <div className='flex mt-3 text-white gap-3'>
            <p>Wema bank: 4054673854</p>
            <span className='text-white'>
              <BiCopy className='w-4 h-4 text-white'/>
            </span>
          </div>
          <div className='w-full my-5'>
            <button className='bg-[#FFFF] text-blue-800 font-semibold py-3 w-full rounded-md text-sm lg:mt-5'>
              Make Payment
            </button>
          </div>
        </motion.div>

        {/* Total Amount, Weekly Rate, Amount Behind Cards */}
        <div className='flex flex-col gap-6 mt-4 lg:mt-0'>
          <motion.div 
            className='bg-[#DBE7FE] flex flex-col gap-8 rounded-lg w-auto lg:max-w-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex items-center gap-5 mt-4 p-2'>
              <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'>
                <BiCopy className='w-2 h-2 text-blue-300'/>
              </span>
              <p className='font-normal text-lg font-poppins'>Total Amount Paid</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>
            ₦{totalPaid? totalPaid.toLocaleString() : '0'}
            </div>
          </motion.div>

          <motion.div 
            className='bg-[#DBE7FE] flex flex-col gap-8 rounded-lg w-auto lg:max-w-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className='flex items-center gap-5 mt-4 p-2'>
              <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'>
                <BiCopy className='w-2 h-2 text-blue-300'/>
              </span>
              <p className='font-normal text-lg font-poppins'>Approved Purchase</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>
              {approved? approved : '0'}
            </div>
          </motion.div>
        </div>

        <div className='flex flex-col gap-6 mt-4 lg:mt-0'>
          <motion.div 
            className='bg-[#D6F7FF] flex flex-col gap-8 rounded-lg w-auto lg:max-w-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <div className='flex items-center gap-5 mt-4 p-2'>
              <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'>
                <BiCopy className='w-2 h-2 text-blue-300'/>
              </span>
              <p className='font-normal text-lg font-poppins'>Total Pending</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>
              ₦{pendingAmount ? pendingAmount.toLocaleString() : '0'}
            </div>
          </motion.div>

          <motion.div 
            className='bg-[#D6F7FF] flex flex-col gap-8 rounded-lg w-auto lg:max-w-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className='flex items-center gap-5 mt-4 p-2'>
              <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'>
                <BiCopy className='w-2 h-2 text-blue-300'/>
              </span>
              <p className='font-normal text-lg font-poppins'>Pending Purchase</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>
             {processing ? processing : '0'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment History Section */}
      <motion.div 
        className='flex justify-between mt-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className='font-medium text-[#000000] text-lg font-poppins'>Payment History</h3>
        <p className='text-blue-800'>See all</p>
      </motion.div>

      {/* Filters and Sorting */}
      <motion.div 
        className='flex justify-between'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='lg:flex items-center gap-4'>
          <button className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'>
            <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
            <p className='text-lg text-blue-700'> Filters</p>
          </button>
          <div className='hidden lg:flex gap-3'>
            <p className='font-poppins text-lg font-semibold flex items-center gap-2 text-blue-400'>
              Type <IoIosArrowDown className='text-blue-400' />
            </p>
          </div>
        </div>
        <p className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'>
          Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>{date}<IoIosArrowDown /></span>
        </p>
      </motion.div>

      {/* Payment History Table */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
          <ul className="lg:flex justify-between bg-white shadow-lg hidden">
            <li className="font-semibold text-lg lg:mr-5">Product ID</li>
            <li className="font-semibold text-lg relative lg:-right-6">Date</li>
            <li className="font-semibold text-lg relative lg:-left-2">Amount</li>
            {/* <li className="font-semibold text-lg lg:mr-7">Transaction Type</li> */}
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-1rem]">Status</li>
            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
          </ul>

          {displayedOrders.map(item => (
            <motion.div
              key={item.ProductId}
              className="rounded-lg p-4 mb-4 shadow-md lg:shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                <div className="flex justify-between w-full lg:w-[12%] mt-3">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Product ID:</p>
                  <div className="text-sm justify-start ml-[-1rem] font-poppins font-semibold lg:truncate">
                    <p>{item.ProductId}</p>
                  </div>
                </div>
                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Date:</p>
                  <span className="text-sm font-poppins font-semibold lg:relative lg:right-20">{item.orderDate}</span>
                </div>
                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Amount:</p>
                  <span className="font-poppins text-sm font-semibold lg:ml-[-6rem] xl:ml-[-8rem]">{item.productPrice}</span>
                </div>
                {/* <div className="flex justify-between lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Transaction Type:</p>
                  <span className="text-sm font-poppins font-semibold lg:relative lg:right-20 lg:max-w-[8rem] lg:truncate">
                    {item.name}
                  </span>
                </div> */}

                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Status:</p>
                  <span
                    className={`text-sm font-poppins font-semibold lg:relative right-9 xl:right-20 ${item.productStatus.toLowerCase() === 'pending' ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {item.productStatus}
                  </span>
                </div>

                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Action:</p>
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
            <div className='px-6 h-8 mt-5 text-white bg-blue-700 flex items-center gap-3 rounded-lg'>
              <span>Page</span>
              <span>{currentPage + 1} of {pageCount}</span>
            </div>
          </div>
        </article>
      </motion.div>
      <Toaster />
    </BuyersLayoutGen>
  );
};

export default Payment;
