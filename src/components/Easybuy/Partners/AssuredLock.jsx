import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const AssuredLock = ({isOpened, setIsOpened}) => {
  return (
    <>
    <Dialog open={isOpened} onClose={() => setIsOpened(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="w-full max-w-xl space-y-6 bg-white p-6">
          <DialogTitle className="font-bold flex justify-between">
            <h3 className='font-medium font-plus-jakarta text-lg text-[#1D2433]'>Lock Items ?</h3>
            <span>X</span>
          </DialogTitle>
          <Description className='font-poppins font-medium text-[16px] text-[#1D2433]'>Are you sure you want to lock this device?</Description>
          <p className='font-poppins text-[16px] font-normal text-[#1D2433CC]'>Locking will restrict the user until payment is resolved.</p>
          <div className="w-full flex gap-4">
            <button className='w-full border border-blue-700 text-blue-600 py-2 rounded-md' onClick={() => setIsOpened(false)}>Cancel</button>
            <button className='w-full bg-blue-700 text-white py-2 rounded-md' onClick={() => setIsOpened(false)}>lock</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </>
  )
}

export default AssuredLock
