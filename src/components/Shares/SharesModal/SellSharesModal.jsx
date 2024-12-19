import React, {useEffect, useRef} from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Wallet, ArrowRight2 } from "iconsax-react";

function SellSharesModal({isOpen, setIsOpen, handleSellsSuccess}) {
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    }, []); 
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-full md:max-w-[35rem] space-y-6 bg-white p-12">
            <DialogTitle className="font-bold flex justify-between">
                <h3 className="font-medium text-lg font-plus-jakarta">Sell Preview</h3>
                <button onClick={() => setIsOpen(false)}>X</button>
            </DialogTitle>
            <Description className='text-blue-700 font-medium text-2xl flex justify-center'>
                <input ref={inputRef} type="number" name="amount" id="amount" className='appearance-none focus:outline-none text-blue-700 font-medium text-2xl flex pl-[10rem]' />
            </Description>
            <div className='flex justify-center'>
                <p className='font-poppins font-normal bg-[#DBE7FE] rounded-md px-6 py-1 text-[16px] text-[#1D2433]'>Estimated Cost:  $4,500</p>
            </div>
            <div className="my-5">
              <div className=" flex justify-between ">
                <div className="flex gap-1">
                  <div className="bg-[#F1F3F9] rounded-[50%] p-3">
                    <Wallet size="24" color="#1D2433CC" />
                  </div>
                  <p className="mt-5 font-poppins font-normal text-sm leading-5">
                    Wallet (₦2000)
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <p className="font-poppins font-normal text-[#1E3DD7] text-sm leading-5">
                    Other methods
                  </p>
                  <ArrowRight2 size="18" color="#1E3DD7" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col  gap-5">
            <div className="flex justify-between">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Quantity</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-[#1D2433]'>9 shares</p>
     </div>
     <div className="flex justify-between ">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Current price</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-[#1D2433]'>₦9,900</p>
     </div>
     <div className="flex justify-between">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Total Cost</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-[#1D2433]'>₦20,900</p>
     </div>
   
            </div>
            <div className="w-full">
              <button className='w-full bg-blue-700 text-white py-2 rounded-md text-[16px]' onClick={handleSellsSuccess}>Sell Now</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default SellSharesModal;

