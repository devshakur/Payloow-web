import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BuyersLayoutGen from '../BuyersLayoutGen';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import InstallmentModal from './InstallmentModal';
import useInvestment from '../../../../hooks/useInvetment';
import { toast, Toaster } from 'react-hot-toast'

const Installment = () => {
  const { GetUInstallmentOrders } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([])
  const [totalAmount, setTotalAmount] = useState()
  const [amountPaid, setAmountPaid] = useState(0)
  const [balance, setBalance] = useState(0)
  let [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the clicked order as the selected order
   setIsOpen(true)      // Open the modal
  };
  const itemsPerPage = 4;

 const formatDueDate = (dueDate) => {
  const now = new Date();
  const nextDueDate = new Date(dueDate); // Convert string to Date object
  const timeDifference = nextDueDate - now; // Difference in milliseconds


  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes

    return {
      formatted: `${days} Days`, // Display days
      time: `${hours} : ${minutes}`, // Display time as "hours : minutes"
    };
  } else {
    // If the due date is within the same day but past the current time, adjust logic
    if (nextDueDate.getDate() === now.getDate()) {
      return {
        formatted: "Today", // Display 'Today' if it's the same day
        time: "Past due",    // Indicate that it's overdue
      };
    }
    return null; // Return null if the due date is in the past (from a previous day)
  }
};


useEffect(() => {
  const getInstallmentOrders = async () => {
    try {
      const resp = await GetUInstallmentOrders();
      const message = resp?.data?.message;
      const productsData = resp?.data?.data?.data;

      if (productsData) {
        let totalPaid = 0;
        let totalBalance = 0;

        const formattedOrders = productsData.map((order) => {
          const installments = order?.installmentDetails?.installments || [];
          const totalPaidAmount = installments.reduce((sum, inst) => {
            return inst.status === "paid" ? sum + inst.amount : sum;
          }, 0);

          const remainingBalance = order?.totalAmount - totalPaidAmount;

          // Add to the total paid and remaining balance
          totalPaid += totalPaidAmount;
          totalBalance += remainingBalance;

          // Format due dates for the next installment
          const nextDueDetails = installments.length > 0 ? formatDueDate(installments[0]?.dueDate) : null;

          return {
            productName: order?.cartItems[0]?.product?.name,
            dueDates: installments.map((inst) => ({
              dueDate: new Date(inst?.dueDate).toLocaleDateString(),
              amount: `$${inst?.amount.toFixed(2)}`,
              status: inst?.status,
            })),
            nextDueDetails, // Add the next due date details here
            purchaseDate: new Date(order?.createdAt).toLocaleDateString(),
            totalAmount: order?.totalAmount,
            paymentStatus: order?.paymentStatus,
            totalPaidAmount: `$${totalPaidAmount.toFixed(2)}`,
            remainingBalance: `$${remainingBalance.toFixed(2)}`,
          };
        });

        const totalAmount = formattedOrders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        const formattedTotalAmount = `${totalAmount.toFixed(2)}`;

        // Update state with the formatted data
        setTotalAmount(formattedTotalAmount);
        setAmountPaid(totalPaid.toFixed(2));
        setBalance(totalBalance.toFixed(2));
        setOrders(formattedOrders);
        toast.success(message || 'Fetched all orders');
      } else {
        toast.success('No orders found');
      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Failed to fetch products');
      }
    }
  };

  getInstallmentOrders();
}, []);

  
  
const pageCount = Math.ceil(orders.length / itemsPerPage);
const displayedOrders = orders.slice(
  currentPage * itemsPerPage,
  (currentPage + 1) * itemsPerPage
);

const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};

  return (
    <BuyersLayoutGen>
      {/* Total Amount Section with Animation */}
      <motion.div
        className="flex flex-col md:grid md:grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="bg-[#FFFFFF] shadow-md p-3" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between">
            <h3 className="font-poppins font-normal text-[20px] text-[#1D2433]">Total Amount</h3>
            <p className="font-medium">...</p>
          </div>
          <h3 className="font-poppins font-medium text-[28px] text-[#1D2433] py-2">₦{totalAmount || 0}</h3>
        </motion.div>

        <motion.div className="bg-[#FFFFFF] shadow-md p-3" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex justify-between">
            <p className="font-poppins font-normal text-[20px] text-[#1D2433]">Amount Paid</p>
            <p className="font-medium">...</p>
          </div>
          <h3 className="font-poppins font-medium text-[28px] text-[#1D2433] py-2">₦{amountPaid}</h3>
        </motion.div>

        <motion.div className="bg-[#FFFFFF] shadow-md p-3" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.9 }}>
          <div className="flex justify-between">
            <h3 className="font-poppins font-normal text-[20px] text-[#1D2433]">Remaining Balance</h3>
            <p className="font-medium">...</p>
          </div>
          <h3 className="font-poppins font-medium text-[28px] text-[#1D2433] py-2">₦{balance}</h3>
        </motion.div>
      </motion.div>

      {/* Next Due Date and Installment Purchases Section */}
      <motion.div
        className="md:grid md:grid-cols-2 mt-4 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="bg-[#FFFFFF] shadow-md p-3" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
   
        {orders.length > 0 && (
        <motion.div
          className="bg-[#FFFFFF] shadow-md p-3"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="font-poppins font-medium text-[22px] text-[#1D2433]">
            Next Due Date
          </h4>
          <div className="flex items-center justify-between mx-6">
            <div>
              <h4 className="font-poppins font-normal italic text-xl">In</h4>
              {/* Display next due details of the last product */}
              <p className="font-poppins font-medium text-[28px] text-[#000]">
                {orders[orders.length - 1].nextDueDetails
                  ? orders[orders.length - 1].nextDueDetails.formatted
                  : "N/A"}
              </p>
              <p className="font-poppins font-medium text-lg text-[#1D2433CC]">
                {orders[orders.length - 1].nextDueDetails
                  ? orders[orders.length - 1].nextDueDetails.time
                  : "Past due"}
              </p>
            </div>
            <div>
              <img src="/images/Progress-circle.png" alt="progress-bar" />
              <p className="relative left-6 lg:left-14 -top-24 font-poppins font-semibold text-[32px] text-[#000]">
                {orders[orders.length - 1].nextDueDetails
                  ? orders[orders.length - 1].nextDueDetails.time
                  : "N/A"}
              </p>
            </div>
          </div>
        </motion.div>
      )}

        </motion.div>

        {/* Installment Purchases List */}
        <motion.div className="bg-[#FFFFFF] shadow-md p-3" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex justify-between">
            <h3 className="font-poppins font-medium text-xl text-[#1D2433]">Installment Purchases</h3>
            <h5 className="font-poppins font-medium text-lg text-blue-600">View all</h5>
          </div>
          {displayedOrders && displayedOrders.length > 0 ?
            displayedOrders.map((item) => (
              <motion.div
                key={item._id}
                className="flex justify-between mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-[50%] border border-gray-200 flex justify-center items-center">
                    <img className="w-[30px] h-[30px]" src={item.img || '/images/iphon-green.png'} alt={item.name} />
                  </div>
                  <p>{item.productName}</p>
                </div>
                <button
                  onClick={()=>handleViewDetails(item)}
                  className={`px-4 h-8 rounded-md ${item.status === 'active' ? 'text-green-500 bg-green-200' : 'text-red-600 bg-red-100'}`}
                >
                  {item.status}
                </button>
              </motion.div>
            )) : <div className='text-gray-700 font-medium text-lg font-plus-jakarta'>No Installment plan</div>}
          {selectedOrder && <InstallmentModal isOpen={isOpen} setIsOpen={setIsOpen} selectedOrder={selectedOrder} />}
        </motion.div>
      </motion.div>

      {/* Filters and Orders List */}
      <motion.div
        className="flex justify-between mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="lg:flex items-center gap-4">
          <motion.button
            className="border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IoFilterOutline className="text-blue-800 w-7 h-7" />
            <p className="text-lg text-blue-700">Filters</p>
          </motion.button>
          <div className="hidden lg:flex gap-3">
            <p className="font-poppins text-lg font-semibold text-blue-700 flex items-center gap-2">Amount ({displayedOrders.length}) <IoIosArrowDown /> </p>
          </div>
        </div>
        <p className="font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]">
          {/* Sort by: <span className="flex gap-2 items-center text-blue-800 font-poppins font-medium">Most popular <IoIosArrowDown /></span> */}
        </p>
      </motion.div>

      {/* Orders List with Pagination */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
            {displayedOrders && displayedOrders.length > 0 ? (
  displayedOrders.map((item, index) => (
    <motion.div
      key={index}
      className="rounded-lg p-4 mb-4 shadow-md bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card Header: Product Image and Details */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex justify-center items-center">
          <img
            src={item.img || '/images/iphon-green.png'}
            alt={item.productName}
            className="w-12 h-12 object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-poppins font-semibold text-gray-800">{item.productName}</h3>
          <p className="text-sm font-poppins text-gray-500">Purchased: {item.purchaseDate}</p>
        </div>
        <button
          onClick={()=>handleViewDetails(item)}
          className="px-4 py-1 text-sm rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          View Details
        </button>
      </div>

      {/* Installments Section */}
      <div>
        <h4 className="font-poppins font-medium text-gray-700 mb-2">Installment Details:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {item.dueDates.map((dueDate, idx) => (
            <div
              key={idx}
              className="p-3 rounded-md bg-gray-50 border border-gray-200 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <p className="text-sm font-poppins text-gray-600">Due Date:</p>
                <p className="text-sm font-poppins text-gray-800">{dueDate.dueDate}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-poppins text-gray-600">Amount:</p>
                <p className="text-sm font-poppins text-gray-800">{dueDate.amount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-poppins text-gray-600">Status:</p>
                <p
                  className={`text-sm font-poppins font-semibold ${
                    dueDate.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                  }`}
                >
                  {dueDate.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  ))
) : (
  <div className="text-gray-700 font-medium text-lg font-plus-jakarta">No Installment plan</div>
)}

          {/* Pagination Controls */}
          <motion.div
            className="flex text-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4"
        pageClassName="mx-1"
        pageLinkClassName="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
        previousClassName="mx-1"
        previousLinkClassName="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
        nextClassName="mx-1"
        nextLinkClassName="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
        activeClassName="bg-blue-500 text-white"
      />
          </motion.div>
        </article>
      </motion.div>
      <Toaster />
    </BuyersLayoutGen>
  );
}

export default Installment;
