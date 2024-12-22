import React from 'react';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from 'framer-motion';  // Importing framer-motion

const BuyersDashboardTwo = () => {
  return (
    <div>
      {/* <BuyersLayoutPage> */}
        <motion.main
          initial={{ opacity: 0 }} // Initial opacity to 0 for fade-in effect
          animate={{ opacity: 1 }} // Animate to full opacity
          transition={{ duration: 0.5 }} // Duration of fade-in effect
        >
          <motion.h3
            className='text-blue-700 text-lg font-medium font-plus-jakarta'
            initial={{ x: -50, opacity: 0 }} // Start from left with 0 opacity
            animate={{ x: 0, opacity: 1 }} // Animate to its position and full opacity
            transition={{ duration: 0.5, delay: 0.2 }} // Duration with delay for staggered effect
          >
            Home
            <span className='text-black ml-2 font-poppins font-medium'>/  Iphones</span>
          </motion.h3>

          <div className='flex justify-between'>
            <div className='lg:flex items-center gap-4'>
              <motion.button
                className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'
                whileHover={{ scale: 1.05 }} // Button hover effect (scale)
                whileTap={{ scale: 0.95 }}  // Button tap effect (scale down)
              >
                <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
                <p className='text-lg text-blue-700'>Filters</p>
              </motion.button>

              <div className='hidden lg:flex gap-3'>
                <motion.p
                  className='font-poppins text-lg font-semibold text-blue-700 flex items-center gap-2'
                  initial={{ opacity: 0, y: -10 }} // Slide from the top
                  animate={{ opacity: 1, y: 0 }}  // Move to normal position
                  transition={{ duration: 0.4, delay: 0.4 }} // Delay for staggered appearance
                >
                  Brand (1) <IoIosArrowDown />
                </motion.p>

                <motion.p
                  className='font-poppins text-lg font-semibold flex items-center gap-2'
                  initial={{ opacity: 0, y: -10 }} // Slide from the top
                  animate={{ opacity: 1, y: 0 }}  // Move to normal position
                  transition={{ duration: 0.4, delay: 0.6 }} // Delay for staggered appearance
                >
                  Color <IoIosArrowDown />
                </motion.p>

                <motion.p
                  className='font-poppins text-lg font-semibold flex items-center gap-2'
                  initial={{ opacity: 0, y: -10 }} // Slide from the top
                  animate={{ opacity: 1, y: 0 }}  // Move to normal position
                  transition={{ duration: 0.4, delay: 0.8 }} // Delay for staggered appearance
                >
                  Price <IoIosArrowDown />
                </motion.p>
              </div>
            </div>

            <motion.p
              className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'
              initial={{ opacity: 0, x: 50 }} // Start from the right
              animate={{ opacity: 1, x: 0 }} // Animate to full opacity and normal position
              transition={{ duration: 0.5, delay: 0.3 }} // Delay for staggered effect
            >
              Sort by: 
              <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>
                Most popular <IoIosArrowDown />
              </span>
            </motion.p>
          </div>

          <div className='mt-5 flex justify-between'>
            <motion.button
              className='bg-blue-300 text-[#000] px-6 text-lg font-poppins font-medium rounded-lg py-1 border-2 border-blue-400'
              whileHover={{ scale: 1.05 }} // Button hover effect (scale)
              whileTap={{ scale: 0.95 }}  // Button tap effect (scale down)
            >
              iPhone X
            </motion.button>

            <motion.p
              className='text-[#101928] font-poppins text-lg font-medium'
              initial={{ opacity: 0 }} // Start with 0 opacity
              animate={{ opacity: 1 }}  // Fade in to full opacity
              transition={{ duration: 0.5, delay: 0.2 }} // Fade-in effect
            >
              Showing 1-6 of 20 results
            </motion.p>
          </div>
        </motion.main>
      {/* </BuyersLayoutPage> */}
    </div>
  );
}

export default BuyersDashboardTwo;
