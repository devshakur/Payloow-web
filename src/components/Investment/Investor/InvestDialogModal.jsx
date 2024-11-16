import React from 'react';
import clsx from 'clsx';
import { Button } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";

const InvestDialogModal = ({ click, setClicked, formData, handleInputChange, handleInvest, handleModalClose, }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[500px] bg-white p-8 rounded-lg shadow-lg relative">
        <form>
          <div className='flex justify-between my-2 items-center mx-5'>
            <h3 className="text-xl py-4 font-semibold">Invest Now</h3>
            <CloseCircle size="30" color="black" onClick={handleModalClose} />
          </div>

          {/* Investment Amount Field */}
          <div className="mb-4 mt-6">
            <label className="text-md ml-4 font-medium">Investment Amount</label>
            <input
              type="number"
              name="investment_amount"
              value={formData.investment_amount}
              onChange={handleInputChange}
              placeholder="Enter amount you want to invest"
              className={clsx('border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3')}
            />
          </div>

          {/* Expected ROI Field */}
          <div className="mb-4">
            <label className="text-md font-medium ml-4">Expected ROI</label>
            <input
              type="number"
              name="expected_roi"
              value={formData.expected_roi}
              onChange={handleInputChange}
              placeholder="Enter expected ROI"
              className={clsx('border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3')}
            />
          </div>

          {/* Repayment Term Field */}
          <div className="mb-4">
            <label className="text-md font-medium ml-4">Repayment Term</label>
            <input
              type="number"
              name="repayment_term"
              value={formData.repayment_term}
              onChange={handleInputChange}
              placeholder="Enter repayment term"
              className={clsx('border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3')}
            />
          </div>

          {/* Action Buttons */}
          <div className="mx-5 flex lg:flex-row gap-3">
            <Button
              onClick={handleModalClose} // Close modal on Cancel
              className="w-full rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-2 text-md mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
            >
              Cancel
            </Button>
            <Button onClick={handleInvest}
              className="w-full rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6"
            >
              Invest Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestDialogModal;
