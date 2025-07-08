
import { useState } from 'react';
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

const CheckOutModalCrad = ({
  isOpen,
  setIsOpen,
  installmentPlan,
  setInstallmentPlan,
  numberOfInstallments,
  setNumberOfInstallments,
  handleProceed,
  loading,
}) => {

 

  const renderSubOptions = () => {
  console.log("INSTALLMENT PLAN:", installmentPlan);

  if (installmentPlan === 'weekly') {
    return (
      <div className="mt-4">
        <label htmlFor="weeks" className="font-plus-jakarta text-md block mb-1">
          Select Weeks
        </label>
        <select
          id="weeks"
          name="weeks"
          value={numberOfInstallments}
          onChange={(e) => setNumberOfInstallments(e.target.value)}
          className="w-[95%] py-2 pl-3 border-b-2 font-plus-jakarta shadow-md focus:outline-none rounded-md"
        >
          <option value="">Select</option>
          <option value="10">10 Weeks</option>
          <option value="15">15 Weeks</option>
          <option value="18">18 Weeks</option>
          <option value="20">20 Weeks</option>
        </select>
      </div>
    );
  }

  if (installmentPlan === 'monthly') {
    return (
      <div className="mt-4">
        <label htmlFor="months" className="font-plus-jakarta text-md block mb-1">
          Select Months
        </label>
        <select
          id="months"
          name="months"
          value={numberOfInstallments}
          onChange={(e) => setNumberOfInstallments(e.target.value)}
          className="w-[95%] py-2 pl-3 border-b-2 font-plus-jakarta shadow-md focus:outline-none rounded-md"
        >
          <option value="">Select</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
        </select>
      </div>
    );
  }

  return null;
};

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-[80%] max-w-xl space-y-6 bg-white p-6 rounded-md">
          <DialogTitle className="font-bold flex justify-between items-center">
            <h3 className="font-plus-jakarta font-semibold text-xl text-[#1D2433]">
              Select Installment Plan
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="font-semibold font-plus-jakarta"
            >
              X
            </button>
          </DialogTitle>

          <form>
            <Description className="w-full">
              <label htmlFor="plans" className="font-plus-jakarta text-md">
                Installment Plans
              </label>
              <select
                name="plans"
                id="plans"
                value={installmentPlan}
                onChange={(e) => {
                  setInstallmentPlan(e.target.value);
                  setNumberOfInstallments(''); // reset sub-option
                }}
                className="w-[95%] py-2 pl-3 border-b-2 font-plus-jakarta shadow-md focus:outline-none rounded-md"
              >
                <option value="weekly">WEEKLY</option>
                <option value="monthly">MONTHLY</option>
                <option value="">Full Payment</option>
              </select>
            </Description>

            {renderSubOptions()}
          </form>

          <div className="flex gap-4 w-full justify-end">
            <button
  onClick={() => {
    if (
      installmentPlan &&
      installmentPlan !== '' &&
      numberOfInstallments &&
      numberOfInstallments !== ''
    ) {
      handleProceed();
    } else {
      alert('Please select a valid installment plan and duration.');
    }
  }}
  className="bg-blue-700 text-white py-2 rounded-lg w-[8rem]"
>
  {loading ?  <div className="loader"></div> : 'Proceed'}
</button>

          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CheckOutModalCrad;
