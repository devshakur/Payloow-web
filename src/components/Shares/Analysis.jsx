import React, { useEffect, useState } from 'react';
import SharesLayout from './SharesLayout';
import { IoIosArrowDown } from "react-icons/io";
import { motion } from 'framer-motion';

const Analysis = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200); // lad time
    return () => clearTimeout(timer);
  }, []);

  // Defineing  animations
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const hoverEffect = {
    whileHover: { scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }
  };

  return (
    <SharesLayout>
      <motion.div
        className="flex flex-col md:grid md:grid-cols-3 gap-3"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
      >
        {/* Total Revenue */}
        <motion.div
          className="bg-white shadow-md w-full p-3 rounded-md"
          variants={hoverEffect}
        >
          <div className="flex justify-between">
            <h3 className="font-medium text-lg text-[#000]">Total Revenue</h3>
            <span>...</span>
          </div>
          <p className="text-[24px] text-[#1D2433] font-medium font-poppins mt-6">200</p>
          <div className="mt-3 flex gap-2">
            <img src="/images/chart-ups.png" alt="up" />
            <p className="text-green-600">32.3%</p>
          </div>
        </motion.div>

     
        <motion.div
          className="bg-white shadow-md w-full p-3 rounded-md"
          variants={hoverEffect}
        >
          <div className="flex justify-between">
            <h3 className="font-medium text-lg text-[#000]">Portfolio Growth Rate</h3>
            <span>...</span>
          </div>
          <p className="text-[24px] text-[#1D2433] font-medium font-poppins mt-6">8%</p>
          <div className="mt-3 flex gap-2">
            <img src="/images/chart-ups.png" alt="up" />
            <p className="text-green-600">32.3%</p>
          </div>
        </motion.div>

        {/* Transaction */}
        <motion.div
          className="bg-white shadow-md w-full p-3 rounded-md"
          variants={hoverEffect}
        >
          <div className="flex justify-between">
            <h3 className="font-medium text-lg text-[#000]">Transaction</h3>
            <span>...</span>
          </div>
          <p className="text-[24px] text-[#1D2433] font-medium font-poppins mt-6">200</p>
          <div className="mt-3 flex gap-2">
            <img src="/images/chart-down.png" alt="down" />
            <p className="text-red-600">32.3%</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div
        className="mt-6 bg-white "
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <motion.div
          className="flex justify-between mx-3"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={slideInLeft}
        >
          <h3 className="font-medium text-lg font-poppins">Analytics</h3>
          <h6 className="flex items-center gap-3 font-medium text-sm font-poppins">
            Last Month <span><IoIosArrowDown /></span>
          </h6>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className='w-[98%]'
        >
          <img loading='lazy' style={{objectFit:'contain', width:'100%', height:'auto'}} src="/images/secondline.png" alt="chart" />
        </motion.div>
      </motion.div>
    </SharesLayout>
  );
};

export default Analysis;
