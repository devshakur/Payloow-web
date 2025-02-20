import React from 'react'
import { motion } from 'framer-motion';

const Admin_Headers = ({one, two,three,four,five,six, six_text, seven, eight, nine, img, img1, img1_text, img2, arrow}) => {
  return (
    <>
        <div className='w-full lg:w-[80%] grid grid-cols-2 md:grid-cols-3 gap-4'>
    <motion.div className="bg-white shadow-lg rounded-lg w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-normal text-[#1D2433] text-lg font-poppins'>
               {one}

                </h3>
              </div>
              <p className='text-[20px] text-[#1D2433] font-medium font-poppins mt-2'>{two}</p>
              <div className="mt-3 flex gap-2">
                <img src={img1} alt="up" />

                <p className={`text-${img1_text}-500`}>{three}%</p>
              </div>
            </motion.div>
            <motion.div className="bg-white shadow-lg rounded-lg w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-medium text-lg text-[#000] font-poppins'>
              {four}

                </h3>
              </div>
              <p className='text-[20px] text-[#1D2433] font-medium font-poppins mt-2'>{five}</p>
              <div className="mt-3 flex gap-2">
                <img src={img2} />

                <p className={`text-${six_text}-500`}>{six}%</p>
              </div>
            </motion.div>
            <motion.div className="bg-white shadow-lg rounded-lg w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-medium text-lg text-[#000] font-poppins'>
              {seven}

                </h3>
              </div>
              <p className='text-[20px] text-[#1D2433] font-medium font-poppins mt-2'>{eight}</p>
              <div className="mt-3 flex gap-2">
                <img src={img}  alt="up" />

                <p  className={`text-${arrow}-500`}>{nine}</p>
              </div>
            </motion.div>
            </div> 
    </>
  )
}

export default Admin_Headers
