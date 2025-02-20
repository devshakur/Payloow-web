import React from 'react';
import { GiElectric } from "react-icons/gi";
import { GoArrowSwitch } from "react-icons/go";
import { PiDevicesDuotone } from "react-icons/pi";
import { BiCopy } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from 'framer-motion'; 
import { useRouter } from '../../../Routes/router';

const HeaderOne = () => {
  const router = useRouter();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleRoutes = (path)=>{
   router.push(path)
  }
  return (
    <div>
      <section className='w-full lg:grid lg:grid-cols-3 gap-5'>
        <motion.div 
          className='bg-[#1E3DD7] w-full rounded-lg p-6 lg:p-8 lg:h-[300px]' 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}  
          transition={{ duration: 0.5 }} 
        >
          <h3 className='font-poppins font-medium text-2xl text-white'>Available Balances</h3>
          <h4 className='font-poppins font-medium text-3xl text-white mt-3'><span className='text-sm'>₦</span>{(currentUser?.wallet?.balance ?? 0).toLocaleString()}</h4>
          <div className='flex mt-3 text-white gap-3'>
            <p>Wema bank: 4054673854</p>
            <span className='text-white'>
              <BiCopy className='w-4 h-4 text-white' />
            </span>
          </div>
          <div className='w-full my-5'>
            <button className='bg-[#FFFF] text-blue-800 font-semibold py-3 w-full rounded-md text-sm lg:mt-5'>
              Make Payment
            </button>
          </div>
        </motion.div>

        {/* Repayment Status Section with animation */}
        <motion.div
          className='bg-white w-full shadow-sm rounded-lg mt-8 lg:mt-0 lg:h-[300px]'
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}   
          transition={{ duration: 0.6, delay: 0.2 }} 
        >
          <div className='flex justify-between mx-5 mt-2'>
            <h4 className='font-poppins text-xl text-[#1D2433] font-normal'>Repayment Status</h4>
            <span className='font-semibold'>...</span>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-center'>
              <motion.img
                className='relative top-8'
                src="/images/track.png"
                alt="tracker"
                initial={{ opacity: 0 }} // Start with no opacity
                animate={{ opacity: 1 }}  // Fade in to full opacity
                transition={{ duration: 0.5, delay: 0.4 }} // Fade-in delay
              />
            </div>
            <div className='flex justify-center'>
              <motion.p
                className='text-[24px] lg:text-[18px] relative md:top-3 mt-1 -top-10 xl:-top-6 2xl:-top-28 font-medium font-poppins'
                initial={{ opacity: 0, y: 20 }} // Slide from bottom and fade in
                animate={{ opacity: 1, y: 0 }}  // Normal opacity and position
                transition={{ duration: 0.5, delay: 0.6 }} // Fade-in and slide effect with delay
              >
                {/* You are 74% Behind */}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Services Section with animation */}
        <motion.div
          className='bg-white w-full 2xl:max-w-xs shadow-sm rounded-lg mt-8 lg:mt-0 lg:h-[300px]'
          initial={{ opacity: 0, y: 50 }} // Initial state: opacity 0 and moved down
          animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and normal position
          transition={{ duration: 0.6, delay: 0.3 }} // Duration with delay for staggered effect
        >
          <h3 className='text-xl font-poppins font-normal p-3'>Services</h3>
          <div className='flex gap-5 lg:flex-col justify-evenly'>
            {/* Phone service item */}
            <motion.div
              className='flex flex-col lg:flex-row text-center lg:items-center lg:ml-10 lg:gap-3 cursor-pointer'
              initial={{ opacity: 0, x: -30 }} // Start with no opacity and move from left
              animate={{ opacity: 1, x: 0 }}  // Fade in and move to normal position
              transition={{ duration: 0.5, delay: 0.4 }} // Animation with delay
              onClick={()=> handleRoutes('/phones-page')} 
            >
              <div className='h-16 w-16 bg-[#DBE7FE] rounded-[50%] flex justify-center items-center'>
                <PiDevicesDuotone className='w-10 h-10 text-blue-700' />
              </div>
              <p  className='lg:flex items-center gap-3'>
                Phones
                <span className='hidden lg:block text-center lg:ml-2 xl:ml-24'>
                  <IoIosArrowForward  className='w-5 h-5' />
                </span>
              </p>
            </motion.div>

            {/* Solar service item */}
            <motion.div
              className="flex flex-col text-center lg:flex-row lg:items-center lg:ml-10 lg:gap-3 cursor-pointer"
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}  
              transition={{ duration: 0.5, delay: 0.6 }} 
              onClick={()=> handleRoutes('/solar-page')} 
            >
              <div className='h-16 w-16 bg-[#DBE7FE] rounded-[50%] flex justify-center items-center'>
                <GiElectric className='w-10 h-10 text-blue-700' />
              </div>
              <p className='lg:flex items-center gap-3'>
                Solar
                <span className='hidden lg:block text-center lg:ml-6 xl:ml-28'>
                  <IoIosArrowForward className='w-5 h-5' />
                </span>
              </p>
            </motion.div>

            {/* Swap service item */}
            <motion.div
              className="flex flex-col text-center lg:flex-row lg:items-center lg:ml-10 lg:gap-3 cursor-pointer"
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}  
              transition={{ duration: 0.5, delay: 0.8 }} 
              onClick={()=> handleRoutes('/swap-product')} 
            >
              <div className='h-16 w-16 bg-[#DBE7FE] rounded-[50%] flex justify-center items-center'>
                <GoArrowSwitch className='w-10 h-10 text-blue-700' />
              </div>
              <p className='lg:flex items-center gap-3'>
                Swap
                <span className='hidden lg:block text-center lg:ml-6 xl:ml-28'>
                  <IoIosArrowForward className='w-5 h-5' />
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default HeaderOne;
