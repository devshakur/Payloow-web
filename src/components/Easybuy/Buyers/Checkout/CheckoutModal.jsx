import { useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const CheckoutModal = ({isOpened, setIsOpened, SubmitCheckOutWallet, walletLoading, installmentPlan, handlePlanChange,}) => {

 
  return (
    <div>
          
      <Dialog open={isOpened} onClose={() => setIsOpened(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/70" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-[90%] max-w-xl space-y-6 bg-white p-6 rounded-md">
            <DialogTitle className="font-bold flex justify-between items-center">
                <h3 className='font-plus-jakarta font-semibold text-xl text-[#1D2433]'>Select Installment Plan</h3>
                <button onClick={()=>setIsOpened(false)} className='font-semibold font-plus-jakarta'>X</button>
            </DialogTitle>
                <form action="">
            <Description className='w-full'>
                    <label htmlFor="plans" className='font-plus-jakarta text-md'>Installment Plans</label>
                    <select 
                    name="plans" 
                    id="plans"
                    value={installmentPlan} // Bind state to the select element
                      onChange={handlePlanChange} 
                      className='w-[95%] py-2 pl-3 border-b-2 font-plus-jakarta shadow-md focus:outline-none rounded-md'>
                        <option value="weekly">WEEKLY</option>
                        <option value="monthly">MONTHLY</option>
                        <option value="quarterly">QUARTERLY</option>
                        <option value="annually">ANNUALLY</option>
                    </select>
            </Description>
                </form>
           
            <div className="flex gap-4 w-full justify-end">
              <button disabled={walletLoading} onClick={SubmitCheckOutWallet}  className='bg-blue-700 text-white py-2 rounded-lg w-[8rem] shadow-md'>{walletLoading ? 'Processing...' : 'Proceed'}</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default CheckoutModal
