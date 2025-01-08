import React, { useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import framer-motion
import BuyersLayoutGen from '../BuyersLayoutGen';


const Phones = ({phones}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

 

  const itemsPerPage = 6; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(phones.length / itemsPerPage);

  // Handle pagination page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Slicing items array to get the current page items
  const displayedItems = phones.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <BuyersLayoutGen>
      <div className='h-[211px] w-full bg-[#FFFFFF] shadow-md flex justify-center items-center'>
        <motion.h3 
          className='font-poppins text-[50px] font-medium lg:text-[100px]'
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          Ads Here
        </motion.h3>
      </div>
      <main className='my-9'>
        <motion.h3 
          className='font-poppins font-medium text-xl text-[#00000]' 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Phones Deals
        </motion.h3>

        <div className='grid lg:grid-cols-3 justify-center gap-x-6 sm:grid-cols-2 gap-y-8'>
          {displayedItems.map((product) => (
            <motion.div 
              key={product.id} 
              className='w-full product-card'
              whileHover={{ scale: 1.05 }}  // Scale effect on hover
              whileTap={{ scale: 0.95 }}   // Scale down effect on click
              transition={{ type: 'spring', stiffness: 300 }}
            >
               <Link to={`/product-details/${product.id}`}>
              <div className='w-full h-[300px]'>
                <img src={product.img} alt={product.id} className='w-auto h-auto' />
              </div>
              <div className='lg:w-[80%] w-[100%] lg:-mt-6 flex justify-between md:w-[70%]'>
                <p className='font-poppins font-medium text-[#101928] text-lg'>{product.name}</p>
                <p className='font-poppins font-[450] text-[#101928] text-xl'>{product.amount}</p>
              </div>
              <div>
                <p className='font-poppins w-[80%] truncate font-normal text-[14px] text-[#101928]'>{product.descrp}</p>
              </div>
              <motion.button 
                className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span><IoCartOutline className='text-[#475367]' /></span>
                <p className='text-[14px] text-[#475367] font-poppins font-semibold'> Add to Cart</p>
              </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className='flex justify-center'>
          <motion.button
            className='bg-[#2751E9] py-2 px-6 rounded-lg text-white font-poppins font-semibold text-[12px]'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            View More
          </motion.button>
        </div>

        {/* Pagination Section */}
        <div className="flex text-center justify-between ">
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
          <div className='px-6 py-1 text-white mt-4 bg-blue-700 flex items-center gap-3 rounded-lg'>
            <IoIosArrowBack className='w-6 h-6' /> <IoIosArrowForward className='w-6 h-6' />
          </div>
        </div>
      </main>
    </BuyersLayoutGen>
  );
};

export default Phones;
