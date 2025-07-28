import React from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { capitalizeAndJoin } from '../../../../../Utils/customHooks';
import { startTransition } from 'react';

const Modal = ({ isOpen, setIsOpen, setIsActive, businessData }) => {
 
  const close = () => {
    startTransition(() => {
      setIsOpen(false);
    });
  };

  const stageTwo = () => {
    startTransition(() => {
      setIsActive('two');
    });
  };

  const stageThree = () => {
    startTransition(() => {
      setIsActive('three');
    });
  };


 
  

  return (
    <Dialog open={isOpen} onClose={close} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 bg-black/30">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-6">
          <DialogTitle>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-md">
                Overview
              </Button>
              <Button
                onClick={stageTwo}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md py-2 font-semibold"
              >
                Links
              </Button>
              <Button
                onClick={stageThree}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white rounded-md py-2 font-semibold"
              >
                Loan
              </Button>
            </div>
          </DialogTitle>

          {businessData && (
            <div className="border border-gray-200 rounded-xl p-5 space-y-4">
              <div className="flex justify-between flex-wrap gap-2">
                <p className="text-gray-600 font-medium">Business Name:</p>
                <p className="font-semibold">{businessData.business_name}</p>
              </div>
              <p className="text-gray-700">{businessData.business_description}</p>
              
            <div className="grid grid-cols-2">
    <p className="text-gray-600 font-medium text-left">Category:</p>
    <p className="font-semibold text-right">{capitalizeAndJoin(businessData?.industry || [])}</p>
  </div>
   <div className="flex justify-between flex-wrap gap-2">
    <p className="text-gray-600 font-medium text-left">Status:</p>
    <p className="text-right">
      <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium">
        Active
      </span>
    </p>
  </div>
    <div className="grid grid-cols-2">
    <p className="text-gray-600 font-medium text-left">Stage:</p>
    <p className="font-semibold text-right">{businessData.business_stage}</p>
  </div>
  <div className="grid grid-cols-2">
    <p className="text-gray-600 font-medium text-left">Service:</p>
    <p className="font-semibold text-right">{businessData.customer_model}</p>
  </div>
   <div className="grid grid-cols-2">
    <p className="text-gray-600 font-medium text-left">Year Founded:</p>
    <p className="font-semibold text-right">{businessData?.founding_date || "Not Specified"}</p>
  </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={close}
              className="w-full sm:w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
            >
              Done
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
