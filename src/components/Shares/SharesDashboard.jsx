import React, { useState } from 'react';
import SharesLayout from './SharesLayout';
import { IoIosArrowDown } from "react-icons/io";
import BuySharesModal from './SharesModal/BuySharesModal';
import PurchaseSuccessfullModal from './SharesModal/PurchaseSuccessfullModal';
import SellSharesModal from './SharesModal/SellSharesModal';
import SellSuccessfull from './SharesModal/SellSuccessfull';
import { motion } from 'framer-motion';

const SharesDashboard = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState('zero');

  const handleOpenBuyModal = () => {
    setIsOpen(true);
    setSteps('one');
  };
  const handleSuccess = () => {
    setIsOpen(false);
    setSteps('two');
  };
  const handleSellsSuccess = () => {
    setIsOpen(false);
    setSteps('four');
  };
  const handleOpenSellsModal = () => {
    setIsOpen(true);
    setSteps('three');
  };

  // Animation Variants
  const cardFadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const hoverEffect = {
    whileHover: { scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }
  };

  const recentActivitySlide = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <SharesLayout>
      <motion.div
        className="w-full flex flex-col gap-3 md:grid md:grid-cols-[2fr_2fr_1fr] md:gap-5"
        initial="hidden"
        animate="visible"
        variants={cardFadeIn}
      >
        <motion.div className='bg-blue-700 p-4 rounded-md' variants={cardFadeIn}>
          <h3 className='font-plus-jakarta font-normal text-[20px] text-[#FFFFFF]'>Total Invested</h3>
          <h5 className='font-plus-jakarta font-medium text-[26px] text-[#FFFFFF] p-2'><span className='text-sm'>₦</span>50,000</h5>
          <div className="w-full flex gap-2">
            <button onClick={handleOpenBuyModal} className='w-full bg-white py-2 text-blue-700 rounded-md'>
              Buy
            </button>
            <button onClick={handleOpenSellsModal} className='w-full text-white py-2 border border-white rounded-md'>
              Sell
            </button>
          </div>
        </motion.div>

        <motion.div className='bg-white p-4 rounded-md' variants={cardFadeIn}>
          <h3 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Current Investment Balance</h3>
          <h5 className='font-plus-jakarta font-medium text-[26px] text-[#1D2433] p-2'><span className='text-sm'>₦</span>90,900</h5>
          <div className="w-full flex gap-2">
            <button className='w-full bg-blue-700 py-2 text-white rounded-md'>
              Withdraw
            </button>
            <button className='w-full text-blue-700 py-2 border border-blue-700 rounded-md'>
              Top up
            </button>
          </div>
        </motion.div>

        <motion.div className="bg-white shadow-md w-full p-3" variants={cardFadeIn}>
          <div className="flex justify-between">
            <h3 className='font-plus-jakarta font-medium text-md text-[#000]'>Price Per Piece</h3>
            <span>...</span>
          </div>
          <p className='text-[26px] text-[#1D2433] font-medium font-poppins mt-6'><span className='text-sm'>₦</span>9,900</p>
          <div className="mt-3 flex gap-2">
            <img src="/images/chart-ups.png" alt="up" />
            <p className='text-green-600'>32.3%</p>
          </div>
        </motion.div>
      </motion.div>

      <main>
        <section className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-3 mt-8">
          <motion.div className="bg-white" initial="hidden" animate="visible" variants={cardFadeIn}>
            <div className="flex justify-between mx-3">
              <h3 className='font-medium text-md font-plus-jakarta'>Analytics</h3>
              <h6 className='flex items-center gap-3 font-medium text-sm font-plus-jakarta'>
                Last Month <span><IoIosArrowDown /></span>
              </h6>
            </div>
            <div className="mx-2">
              <img className='w-[96%] object-contain' src="/images/chartline.png" alt="chart" />
            </div>
          </motion.div>

          <motion.div className="bg-white" initial="hidden" animate="visible" variants={cardFadeIn}>
            <div className="flex justify-between mx-3">
              <h3 className='font-medium text-md font-plus-jakarta'>Portfolio Performance</h3>
              <h6 className='flex items-center gap-3 font-medium text-sm font-plus-jakarta'>
                Last Month <span><IoIosArrowDown /></span>
              </h6>
            </div>
            <div className="mx-2">
              <img className='w-[96%] object-contain' src="/images/linecart.png" alt="chart" />
            </div>
          </motion.div>
        </section>

        <div className="mt-6 w-full md:w-1/2 bg-white">
          <div className="flex justify-between items-center mx-4">
            <h3 className='font-plus-jakarta text-md font-medium'>Recent Activities</h3>
            <span className='text-blue-600'>see more</span>
          </div>
          <motion.section
            initial="hidden"
            animate="visible"
            variants={recentActivitySlide}
            className="space-y-4"
          >
            {/* Activity Item 1 */}
            <motion.div className='flex justify-between items-center p-2' variants={recentActivitySlide}>
              <div className="flex">
                <img className='ml-3 w-10 h-10' src="/images/Logopay.png" alt="payloow-logo" />
                <div className='ml-2'>
                  <h4 className='font-plus-jakarta font-medium text-[16px] text-[#1D2433]'>Investment</h4>
                  <p className='font-plus-jakarta font-normal text-[14px] text-[#1D2433]'>Your Investment in payloow</p>
                </div>
              </div>
              <div>
                <p className='font-poppins font-medium text-[16px] text-[#1D2433]'><span className='text-sm'>₦</span>90,900</p>
              </div>
            </motion.div>

            {/* Activity Item 2 */}
            <motion.div className='flex justify-between items-center p-2' variants={recentActivitySlide}>
              <div className="flex">
                <img className='ml-3 w-10 h-10' src="/images/Logopay.png" alt="payloow-logo" />
                <div className='ml-2'>
                  <h4 className='font-plus-jakarta font-medium text-[16px] text-[#1D2433]'>Withdraw</h4>
                  <p className='font-plus-jakarta font-normal text-[14px] text-[#1D2433]'>payloow.inc</p>
                </div>
              </div>
              <div>
                <p className='font-plus-jakarta font-medium text-[16px] text-[#1D2433]'>-<span className='text-sm'>₦</span>50,900</p>
              </div>
            </motion.div>

            {/* Activity Item 3 */}
            <motion.div className='flex justify-between items-center p-2' variants={recentActivitySlide}>
              <div className="flex">
                <img className='ml-3 w-10 h-10' src="/images/Logopay.png" alt="payloow-logo" />
                <div className='ml-2'>
                  <h4 className='font-plus-jakarta font-medium text-[16px] text-[#1D2433]'>Withdraw</h4>
                  <p className='font-plus-jakarta font-normal text-[14px] text-[#1D2433]'>Your Investment in payloow</p>
                </div>
              </div>
              <div>
                <p className='font-plus-jakarta font-medium text-[16px] text-[#1D2433]'>-<span className='text-sm'>₦</span>90,900</p>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </main>

      {/* Modals */}
      {steps === 'one' && <BuySharesModal isOpen={isOpen} setIsOpen={setIsOpen} handleSuccess={handleSuccess} />}
      {steps === 'two' && <PurchaseSuccessfullModal />}
      {steps === 'three' && <SellSharesModal isOpen={isOpen} setIsOpen={setIsOpen} handleSellsSuccess={handleSellsSuccess} />}
      {steps === 'four' && <SellSuccessfull />}
    </SharesLayout>
  );
};

export default SharesDashboard;
