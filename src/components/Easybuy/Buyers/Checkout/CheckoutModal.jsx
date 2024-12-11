import { useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const CheckoutModal = ({isOpen, setIsOpen, handleActive}) => {
   
  return (
    <div>
          
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/50" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-[80%] max-w-2xl space-y-6 bg-white p-6">
            <DialogTitle className="font-bold flex justify-between items-center">
                <h3 className='font-poppins font-semibold text-xl text-[#1D2433]'>Select Installment Plan</h3>
                <button onClick={()=>setIsOpen(false)} className='font-semibold'>X</button>
            </DialogTitle>
                <form action="">
            <Description className='w-full'>
                    <label htmlFor="plans">Installment Plans</label>
                    <select name="plans" id="plans" className='w-[95%] py-2 pl-3 border border-gray-300 focus:outline-none rounded-md'>
                        <option value="full">Full</option>
                        <option value="half">Half</option>
                        <option value="quarter">Quarter</option>
                    </select>
            </Description>
                </form>
           
            <div className="flex gap-4 w-full justify-end">
              <button onClick={handleActive} className='bg-blue-700 text-white py-2 rounded-lg w-[6rem]'>Next</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default CheckoutModal
