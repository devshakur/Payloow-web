import React from 'react'
import { Button,  Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { format } from 'date-fns';

const Loan = ({ isOpen, setIsOpen, setIsActive, user, businessData }) => {
  const { customer_model, } = businessData
  function open() {
    setIsOpen(false)
  }

  function close() {
    setIsOpen(false)
  }
  function stageOne() {
    setIsActive('one')
  }
  function stageTwo() {
    setIsActive('two')
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-[600px] shadow-md space-y-4 border bg-[#FFFFFF] p-12 ">
              <DialogTitle className="w-full font-bold flex flex-row">
                <Button onClick={stageOne} className='border border-gray-400 flex-1 py-2 rounded-l-lg text-[#475367] font-poppins font-medium text-lg  hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Overview</Button>
                <Button onClick={stageTwo} className='border border-gray-400 flex-1 text-[#475367] font-poppins font-medium text-l  hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Links</Button>
                <Button className='border border-gray-400 flex-1 rounded-r-lg  font-poppins font-medium text-lg bg-blue-600 text-white'>Loan</Button>
              </DialogTitle>
              <div className='border border-[#E1E6EF] rounded-lg py-5 px-2'>
                <div className='my-4 flex flex-col gap-4 mr-4'>
                  <div className='flex justify-between'>
                    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>Loan Amount</p>
                    <p className='font-poppins font-semibold text-lg text-[#1D2433CC]'>{businessData.loan === null ? 'No Available Loan' : businessData.loan.loan_amount}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>Created Date</p>
                    <p className='font-poppins font-semibold text-lg text-[#1D2433CC]'>{
                      businessData.loan === null
                        ? 'No Available Loan'
                        : format(new Date(businessData.loan.created_at), 'dd/MM/yyyy')}                       
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>Collateral</p>
                    <p className='font-poppins font-semibold text-lg text-[#1D2433CC]'>{businessData.loan === null ? 'No Available Loan' : businessData.loan.collateral}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>Amount Debursed</p>
                    <p className='font-poppins font-semibold text-lg text-[#1D2433CC]'>{businessData.loan === null ? '0' : businessData.loan.amount_disbursed}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>Owner</p>
                    <p className='font-poppins font-semibold text-lg text-[#1D2433CC]'>{user.first_name + ' ' + user.last_name}</p>
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

export default Loan
