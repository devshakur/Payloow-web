import React, { useState } from 'react'
import PartnersLayout from './PartnersLayout'
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import AnalyticsSide from './AnalyticsSide';
import CustomerPayment from './CustomerPayment';
import ModalOne from './ModalOne';
import LockModal from './LockModal';
import AssuredLock from './AssuredLock';
import { motion } from 'framer-motion'; 

const Analytics = () => {
  const [active, setActive] = useState('analytics');
  let [isOpen, setIsOpen] = useState(false);
  let [isOpens, setIsOpens] = useState(false);
  let [isOpened, setIsOpened] = useState(false);
  const [view, setView] = useState('one');

  const handleViews = () => {
    setIsOpen(false);
    setView('two');
    setIsOpens(true);
  };
  
  const handleAssuredModal = () => {
    setIsOpens(false);
    setView('three');
    setIsOpened(true);
  };

  const handleAnalytics = () => {
    setActive('analytics');
  };

  const handlePayment = () => {
    setActive('payment');
  };

  return (
    <PartnersLayout>
      <motion.div 
        className="flex justify-between mb-4"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} 
      >
        <h4 className='text-blue-500 text-[14px]'>
          Customer <span className='text-black'>/ Yusuf Baba</span>
        </h4>
        <button 
          onClick={() => setIsOpen(true)} 
          className='bg-blue-600 text-white py-2 px-5 text-[14px] rounded-md'
        >
          Lock & Unlock Item
        </button>
      </motion.div>

      <motion.main 
        className='md:grid md:grid-cols-2 md:gap-4' 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="bg-white rounded-md"
          initial={{ x: -200 }} 
          animate={{ x: 0 }} 
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className='flex gap-2'>
            <img src="/images/profilep.png" alt="profile" />
            <div className="flex flex-col">
              <p>Yusuf A Baba</p>
              <span className='text-green-500 text-[14px]'>Active</span>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col gap-6">
            <motion.div className='flex gap-6 mx-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <FaPhoneAlt className='mt-2 w-5 h-5' />
              <div className="flex flex-col">
                <p className='font-poppins font-normal text-[14px] text-[#1D2433]'>Phone Number</p>
                <span className=' text-[12px] text-blue-600'>+2347612345645</span>
              </div> 
            </motion.div>
            <motion.div className='flex gap-6 mx-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <MdOutlineMail className='mt-2 w-5 h-5' />
              <div className="flex flex-col">
                <p>Email Address</p>
                <span className='text-blue-600 text-[14px]'>yusufababah50@gmail.com</span>
              </div>  
            </motion.div>
            <motion.div className='flex gap-6 mx-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <IoLocationOutline className='mt-2 w-5 h-5' />
              <div className="flex flex-col">
                <p>Address</p>
                <span className='text-blue-600 text-[14px]'>Ahmadu Bello Road, Kano State</span>
              </div>  
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <ul className='flex gap-3 cursor-pointer mt-6 md:mt-0'>
            <motion.li 
              tabIndex={0} 
              onClick={handleAnalytics} 
              className='focus:text-blue-600'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Analytics
            </motion.li>
            <motion.li 
              tabIndex={0} 
              onClick={handlePayment} 
              className='focus:text-blue-600'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Payment
            </motion.li>  
          </ul>
          {active === 'analytics' ? <AnalyticsSide /> : <CustomerPayment />}
        </motion.div>
      </motion.main>

      {isOpen && <ModalOne isOpen={isOpen} setIsOpen={setIsOpen} handleViews={handleViews} />}
      {view === 'two' && <LockModal isOpens={isOpens} setIsOpens={setIsOpens} handleAssuredModal={handleAssuredModal} />}
      {view === 'three' && <AssuredLock isOpened={isOpened} setIsOpened={setIsOpened} />}
    </PartnersLayout>
  );
};

export default Analytics;
