import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const LockModal = ({isOpens, setIsOpens, handleAssuredModal}) => {
   
  return (
    <>
    <Dialog open={isOpens} onClose={() => setIsOpens(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="w-full max-w-xl space-y-6 bg-white p-6">
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
                    <h4 className='font-normal font-poppins text-lg'>Payment Progres</h4>
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
            <button className='w-full bg-blue-700 text-white py-2 rounded-md' onClick={handleAssuredModal}>lock</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </>
  )
}

export default LockModal
