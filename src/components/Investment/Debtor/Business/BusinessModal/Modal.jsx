import React from 'react'
import { Button,Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
const Modal = ({isOpen, setIsOpen, active,  setIsActive, data}) => {
    function open() {
        setIsOpen(true)
      }
    
      function close() {
        setIsOpen(false)
      }
      function stageTwo() {
        setIsActive('two')
      }
      function stageOne() {
        setIsActive('one')
      }
      function stageThree() {
        setIsActive('three')
      }
  return (
    <div>
         <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-[650px] shadow-md space-y-4 border bg-[#FFFFFF] p-12 ">
            <DialogTitle className="w-full font-bold flex flex-row">
              <Button className='border border-gray-400 flex-1 py-2 rounded-l-lg text-white font-poppins font-medium text-lg bg-blue-600'>Overview</Button>
              <Button onClick={stageTwo} className='border border-gray-400 flex-1 text-[#475367] font-poppins font-medium text-l  hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Links</Button>
              <Button onClick={stageThree} className='border border-gray-400 flex-1 rounded-r-lg text-[#475367] font-poppins font-medium text-lg hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Loan</Button>
            </DialogTitle>
            <div className='border border-[#E1E6EF] rounded-lg py-5 px-2'>
            <Description className='flex justify-between '>
              <p className='font-poppins text-lg font-medium'>Business Name</p>
              <p className='font-poppins text-lg font-semibold text-[#000000]'>{data.business_name}</p>
            </Description>
            <p className='font-poppins text-lg text-[#1D2433CC] font-medium'>{data.business_description}</p>
            <div className='my-4 flex flex-col gap-4 mr-4'>
              <div className='flex justify-between'>
                <p>Business Category</p>
                <p className='font-poppins font-medium text-lg'>Tech, E-commerce, Ed-tech.</p>
              </div>
              <div className='flex justify-between'>
                <p>Status</p>
                <div className='h-8 bg-green-200 flex items-center rounded-lg px-5'>
                <p className='font-poppins text-[#08875D] font-medium text-lg'>Active</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p>Stage</p>
                <p  className='font-poppins font-medium text-lg'>{data.business_stage}</p>
              </div>
              <div className='flex justify-between'>
                <p>Service</p>
                <p  className='font-poppins font-medium text-lg'>Type of Service</p>
              </div>
              <div className='flex justify-between'>
                <p>Owner</p>
                <p  className='font-poppins font-medium text-lg'>Mayowa Sanusi</p>
              </div>
            </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsOpen(false)} className='w-full lg:w-1/2 rounded-lg bg-[#3369F4] py-3 px-4 text-md text-white text-xl data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500}'>Done</Button>
            </div>
          </DialogPanel>
        </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Modal
