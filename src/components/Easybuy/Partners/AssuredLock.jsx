import { useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'  

const AssuredLock = ({ isOpened, setIsOpened }) => {
  return (
    <>
      <Dialog open={isOpened} onClose={() => setIsOpened(false)} className="relative z-50">
        
        <motion.div
          className="fixed inset-0 bg-black/30"
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          exit={{ opacity: 0 }}     
          transition={{ duration: 0.3 }}
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel */}
          <motion.div
            className="w-full max-w-xl space-y-6 bg-white p-6"
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}    
            exit={{ opacity: 0, y: 50 }}     
            transition={{ duration: 0.5 }}  
          >
            <DialogTitle className="font-bold flex justify-between">
              <h3 className='font-medium font-plus-jakarta text-lg text-[#1D2433]'>Lock Items ?</h3>
              <span onClick={() => setIsOpened(false)} className="cursor-pointer">X</span>
            </DialogTitle>
            <Description className='font-poppins font-medium text-[16px] text-[#1D2433]'>
              Are you sure you want to lock this device?
            </Description>
            <p className='font-poppins text-[16px] font-normal text-[#1D2433CC]'>
              Locking will restrict the user until payment is resolved.
            </p>
            <div className="w-full flex gap-4">
              <button className='w-full border border-blue-700 text-blue-600 py-2 rounded-md' onClick={() => setIsOpened(false)}>Cancel</button>
              <button className='w-full bg-blue-700 text-white py-2 rounded-md' onClick={() => setIsOpened(false)}>Lock</button>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}

export default AssuredLock;
