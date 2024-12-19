import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import './Partners.css'

const ModalOne = ({isOpen, setIsOpen, handleViews,}) => {
  
  return (
    <>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="w-full max-w-xl space-y-6 bg-white p-6">
          <DialogTitle className="flex justify-between">
            <h3 className='font-poppins font-medium text-lg text-[#000]'>Choose Customer Item to lock or Unlock</h3>
            <span>X</span>
          </DialogTitle>
          <Description>
            <ul className='flex flex-col gap-4 cursor-pointer'>
                <li id='focus' tabIndex={0}  className ='flex gap-3 items-center bg-blue-100 rounded-md p-2'>
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex justify-center items-center">
                    <img className='w-9 h-9' src="/images/iphon-black.png" alt="black" />
                    </div>
                    <h4 className='font-plus-jakarta font-medium text-[#1D2433]'>Iphone Xr</h4>
                </li>
                <li tabIndex={0} id='focus' className='flex gap-3 items-center bg-blue-100 rounded-md p-2  focus:bg-blue-700'>
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex justify-center items-center">
                    <img className='w-9 h-9' src="/images/iphon-green.png" alt="green" />
                    </div>
                    <h4 className='font-plus-jakarta font-medium text-[#1D2433]'>Iphone 11</h4>
                </li>
                <li tabIndex={0} id='focus' className='flex gap-3 items-center bg-blue-100 rounded-md p-2'>
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex justify-center items-center">
                    <img className='w-9 h-9' src="/images/iphon-yellow.png" alt="black" />
                    </div>
                    <h4 className='font-plus-jakarta font-medium text-[#1D2433]'>Iphone 13</h4>
                </li>
            </ul>
          </Description>
          <div className="w-full flex gap-4">
            <button className='w-full border border-blue-700 text-blue-600 py-2 rounded-md' onClick={() => setIsOpen(false)}>Cancel</button>
            <button className='w-full bg-blue-700 text-white py-2 rounded-md' onClick={handleViews}>Next</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </>
  )
}

export default ModalOne
