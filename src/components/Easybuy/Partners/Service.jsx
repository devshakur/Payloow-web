import React from 'react';
import PartnersLayout from './PartnersLayout';
import { BiMenuAltRight } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdAddLocation } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { motion } from 'framer-motion';

const Service = () => {
  return (
    <PartnersLayout>
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-poppins font-medium text-[24px] text-[#1D2433]">Service Centers</h3>
        <span><BiMenuAltRight className="w-6 h-6" /></span>
      </motion.div>
      
      <motion.div 
        className="md:grid md:grid-cols-2 md:gap-3 mt-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-[#DBE7FE] h-[29vh] rounded-lg">
          <motion.div 
            className="flex justify-between p-4"
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl">Kano Regional</h4>
            <span className="flex items-center gap-2 text-blue-500">
              <BiEdit /> Edit
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-2"
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <span className="text-blue-500"><MdAddLocation /></span>
            <p className="font-normal font-poppins text-[16px]">No. 36 Ahmadu Bello Way, Kano State Library</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-2"
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-blue-500"><FaPhone /></span>
            <p className="font-normal font-poppins text-[16px]">07083175021</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-2"
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="text-blue-500"><MdOutlineMail /></span>
            <p className="font-normal font-poppins text-[16px]">mayowasunusi@gmail.com</p>
          </motion.div>
        </div>

        <motion.div 
          className="w-full mt-6 md:mt-0"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img className="w-full" src="/images/map.png" alt="map" />
        </motion.div>
      </motion.div>
    </PartnersLayout>
  );
}

export default Service;
