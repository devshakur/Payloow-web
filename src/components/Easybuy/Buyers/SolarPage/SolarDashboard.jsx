import React, { useState } from 'react';
import { motion } from 'framer-motion';  // Import framer-motion for animations
import BuyersLayoutGen from '../BuyersLayoutGen';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from '../../../../Routes/router';



const SolarDashboard = ({solars}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const navigate = useNavigate();
  const router = useRouter();

 

  const handleEnergy = () => {
    router.push('/energy-calculator');
  };

  const handleDesign = () => {
    router.push('/design-solar');
  };



  // Calculate total pages
  const totalPages = Math.ceil(solars.length / itemsPerPage);

  // Handle pagination page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Slice the items array to get the current page items
  const displayedItems = solars.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  return (
    <BuyersLayoutGen>
      <header className='flex gap-6 flex-col sm:flex-row sm:gap-3'>
        <div className='bg-blue-100 p-3 flex flex-col gap-3'>
          <motion.h3
            className='font-poppins font-medium text-2xl text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Energy Calculator
          </motion.h3>
          <motion.p
            className='font-plus-jakarta font-normal text-lg text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Discover your potential savings! Calculate the energy and cost benefits of switching to solar with our easy-to-use Energy Calculator.
          </motion.p>
          <div className="w-full sm:flex sm:justify-between sm:items-center">
            <div className='w-full'>
              <motion.button
                onClick={handleEnergy}
                className='w-full bg-blue-500 text-white py-3'
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Get Started
              </motion.button>
            </div>
            <div className='w-full flex justify-center sm:justify-end'>
              <motion.img
                src="/images/solar-logo.png"
                alt="solar-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
        <div className='bg-blue-100 p-3 flex flex-col gap-3'>
          <motion.h3
            className='font-poppins font-medium text-2xl text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Solar System Design Tool
          </motion.h3>
          <motion.p
            className='font-plus-jakarta font-normal text-lg text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Design your ideal solar setup! Get an accurate quote and personalized solar system design tailored to your energy needs.
          </motion.p>
          <div className='w-full sm:flex sm:justify-between sm:items-center'>
            <div className='w-full'>
              <motion.button
                onClick={handleDesign}
                className='w-full bg-blue-500 text-white py-3'
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Get Started
              </motion.button>
            </div>
            <div className='w-full flex justify-center sm:justify-end'>
              <motion.img
                src="/images/solar-energy.png"
                alt="solar-energy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </header>
      <main className='my-6'>
        <motion.h3
          className='font-poppins font-medium text-lg text-[#1D2433]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Solar Deals
        </motion.h3>
        <div className='grid lg:grid-cols-3 justify-center gap-x-4 sm:grid-cols-2 gap-y-8'>
          {displayedItems.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
               <Link to={`/product-details/${product.id}`} >
              <div className='w-full h-[300px]'>
                <img src={product.img} alt={product.id} className='w-auto h-auto' />
              </div>
              <div className='lg:w-[80%] w-[50%] lg:-mt-6 flex justify-between md:w-[70%]'>
                <p className='font-poppins font-medium text-[#101928] text-lg'>{product.name}</p>
                <p className='font-poppins font-[450] text-[#101928] text-xl'>{product.amount}</p>
              </div>
              <div>
                <p className='font-poppins font-normal text-[14px] text-[#101928]'>{product.descrp}</p>
              </div>
              <motion.button
                className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
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
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={()=> itemsPerPage > 6 ? setItemsPerPage(6) : setItemsPerPage(12)}
          >
             {itemsPerPage > 6 ? 'View Less' : ' View More'}
           
          </motion.button>
        </div>

        {/* Pagination Section */}
        <div className="flex text-center justify-between">
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
          <div className='px-6 py-1 text-white bg-blue-700 flex items-center gap-3 rounded-lg'>
            <IoIosArrowBack onClick={()=>setItemsPerPage(6)} className='w-6 h-6'/> <IoIosArrowForward onClick={()=>setItemsPerPage(12)} className='w-6 h-6'/>
          </div>
        </div>
      </main>
    </BuyersLayoutGen>
  );
}

export default SolarDashboard;
