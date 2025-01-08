import { useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion' 

const LockModal = ({ isOpens, setIsOpens, handleAssuredModal }) => {

  return (
    <>
      <Dialog open={isOpens} onClose={() => setIsOpens(false)} className="relative z-50">
     
        <motion.div
          className="fixed inset-0 bg-black/30"
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          exit={{ opacity: 0 }}    
          transition={{ duration: 0.3 }}
        />
        
        
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        
          <motion.div
            className="w-full max-w-xl space-y-6 bg-white p-6"
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}    
            exit={{ opacity: 0, y: 50 }}      
            transition={{ duration: 0.5 }}   
          >
            <DialogTitle className="font-bold flex justify-between">
              <h4 className='font-poppins font-medium text-[24px] text-[#1D2433]'>Item Status</h4>
              <button onClick={() => setIsOpens(false)}>X</button>
            </DialogTitle>
            <Description className='border border-gray-200'>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between mx-2">
                  <h4 className='font-normal font-poppins text-lg'>Product Name</h4>
                  <span className='font-poppins font-medium text-lg text-[#000]'>Iphone Xr</span>
                </div>
                <div className="flex justify-between mx-2">
                  <h4 className='font-normal font-poppins text-lg'>Status</h4>
                  <span className='font-poppins font-medium text-lg text-green-500'>Unlock</span>
                </div>
                <div className="flex justify-between mx-2">
                  <h4 className='font-normal font-poppins text-lg'>Payment Progress</h4>
                  <img src="/images/Progress-bar.png" className='w-1/2 h-3' alt="progress" />
                </div>
                <div className="flex justify-between mx-2">
                  <h4 className='font-normal font-poppins text-lg'>Payment Amount</h4>
                  <span className='font-poppins font-medium text-lg text-[#000]'>$10,000</span>
                </div>
              </div>
            </Description>
            <div className="w-full flex gap-4">
              <button className='w-full border border-blue-700 text-blue-600 py-2 rounded-md' onClick={() => setIsOpens(false)}>Cancel</button>
              <button className='w-full bg-blue-700 text-white py-2 rounded-md' onClick={handleAssuredModal}>Lock</button>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}

export default LockModal;
