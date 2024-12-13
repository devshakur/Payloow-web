import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const InstallmentModal = ({isOpen, setIsOpen}) => {

  return (
    <div>
       <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-[50rem] space-y-4 bg-white p-12">
            <DialogTitle className="font-bold flex justify-between">
            <h3>Item Details</h3>
             <button onClick={() => setIsOpen(false)}>X</button>
            </DialogTitle>
            <Description>
                <div className='flex items-center justify-between gap-5 border border-gray-700 px-4'>
                    <div className='flex items-center'>
                    <div><img src='/images/iphon-green.png' alt="iphone" /></div>
                    <p className='font-poppins text-xl font-medium'>Iphone 11</p>
                    </div>
                    <div className='text-center'>
                        <h4 className='font-semibold text-lg font-poppins'>₦ 300,000 or ₦ 50,000/month</h4>
                        <h5 className='font-poppins text-lg text-[#1D2433CC] font-normal'>With 4 months easybuy special financing</h5>
                    </div>
                </div>
            </Description>
            <div className='border border-gray-600 p-3 flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <h4 className='font-poppins font-medium text-lg text-[#1D2433CC]'>Product Name</h4>
                    <h6  className='font-poppins font-medium text-lg text-[#000]'>Iphone Xr</h6>
                </div>
                <div className='flex justify-between'>
                    <h4 lassName='font-poppins font-medium text-lg text-[#1D2433CC]'>Status</h4>
                    <h6 className='text-[#E02D3C] font-poppins font-medium text-lg'>Locked</h6>
                </div>
                <div className='flex justify-between'>
                    <h4 lassName='font-poppins font-medium text-lg text-[#1D2433CC]'>Payment Progress</h4>
                    <img src="/images/bar.png" alt="bar" className='h-3  hidden md:block' />
                    <p className='font-medium'>78%</p>
                </div>
                <div className='flex justify-between'>
                    <h4 lassName='font-poppins font-medium text-lg text-[#1D2433CC]'>Pending Amount</h4>
                    <h6 className='font-poppins font-medium text-lg text-[#000]'>$1,000</h6>
                </div>
                <div className='flex justify-between'>
                    <h4 lassName='font-poppins font-medium text-lg text-[#1D2433CC]'>Next Due Dates</h4>
                    <div>
                    <h6 className='font-poppins font-medium text-lg text-[#000]'>10/5/2023</h6>
                    <h6 className='font-poppins font-medium text-lg text-[#000]'>10/5/2023</h6>
                    <h6 className='font-poppins font-medium text-lg text-[#000]'>10/5/2023</h6>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 w-full">
              <button className='w-full border border-blue-600 text-blue-700 py-3 rounded-lg' onClick={() => setIsOpen(false)}>Cancel</button>
              <button className='w-full bg-blue-700 text-white py-3 rounded-lg' onClick={() => setIsOpen(false)}>Pay Now</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default InstallmentModal
