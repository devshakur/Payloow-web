import React from 'react'
import { motion } from 'framer-motion';
import SharesLayout from './SharesLayout'
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import HistoryData from './HistoryData';

const Transaction = () => {
  return (
    <SharesLayout>
      {/* Title Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className='font-semibold text-[30px]'>Transaction History</h2>
      </motion.div>

      {/* Filter & Sort Section with animation */}
      <motion.div 
        className='flex justify-between mt-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className='lg:flex items-center gap-4'>
          {/* Filter Button with hover animation */}
          <motion.button 
            className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.2 }}
          >
            <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
            <p className='text-lg text-blue-700'>Filters</p>
          </motion.button>

         
          <div className='hidden lg:flex gap-3'>
            <p className='font-poppins text-lg font-semibold flex items-center gap-2 text-blue-400'>
              Type <IoIosArrowDown className='text-blue-400' />
            </p>
          </div>
        </div>

      
        <motion.p
          className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>November<IoIosArrowDown /></span>
        </motion.p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <HistoryData />
      </motion.div>
    </SharesLayout>
  )
}

export default Transaction;
