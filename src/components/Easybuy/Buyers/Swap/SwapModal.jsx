import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

// Destructure props correctly
const SwapModal = ({ isNewModalOpen, setIsNewModalOpen, setActive, successModal, }) => {
  return (
    <Dialog open={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="md:w-[40rem] space-y-2 bg-white p-8 rounded-lg">
          <DialogTitle className="font-bold text-xl flex justify-between">
            <p>Swap Device</p>
            <span onClick={() => setIsNewModalOpen(false)} className="cursor-pointer text-xl text-gray-600">
              X
            </span>
          </DialogTitle>
         <form  onSubmit={successModal} className='flex flex-col gap-4'>
          <div className="w-full">
          <label htmlFor="product-name" className='font-medium font-poppins'>Product Name</label>
          <input type="text" placeholder='Phone Name' className='w-[95%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal' />
          </div>
          <div className="w-full">
          <label htmlFor="brand" className='font-medium font-poppins'>Brand</label>
          <select name="brand" id="brand" className='w-[95%] border border-gray-300 py-3 focus:outline-none pl-3 rounded-md text-[14px] font-normal'>
            <option value="Iphone">Iphone</option>
            <option value="Samsung">Samsung</option>
          </select>
          </div>
          <div className="w-full">
          <label htmlFor="product-link" className='font-medium font-poppins'>Product Link</label>
          <input type="text" placeholder='Phone Link' className='w-[95%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal' />
          </div>
          <div className='w-full'>
                <label htmlFor="note" className='font-medium font-plus-jakarta'>Additional Note</label>
              </div>
              <textarea name="note" id="note" placeholder='Describe the device’s repair history and condition' className='border-2 pl-2 rounded-md focus:outline-none -mt-4 border-gray-300 w-[95%]' cols="30" rows="8"></textarea>
              <div className="w-full flex justify-center">
                <button onClick={()=>{
                  successModal();
                }} type='button' className='bg-blue-700 text-white py-3 w-[93%] rounded-md'>Upload Phone</button>
              </div>
         </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SwapModal;
