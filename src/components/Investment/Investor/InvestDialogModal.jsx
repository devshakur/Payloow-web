import React from "react";
import clsx from "clsx";
import { Button } from "@headlessui/react";
import { CloseCircle } from "iconsax-react";


const InvestDialogModal = ({
  click,
  setClicked,
  formData,
  handleInputChange,
  handleInvest,
  handleModalClose,
  loading
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[500px] bg-white p-8 rounded-lg shadow-lg relative">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-between my-2 items-center mx-5">
            <h3 className="text-xl py-4 font-semibold">Invest Now</h3>
            <CloseCircle size="30" color="black" onClick={handleModalClose} />
          </div>

          {/* Investment Amount Field */}
          <div className="mb-4 mt-6">
            <label className="text-md ml-4 font-medium">
              Investment Amount
            </label>
            <input
              type="number"
              name="investmentAmount"
              value={
                formData.investmentAmount === 0 ? "" : formData.investmentAmount
              }
              onChange={handleInputChange}
              placeholder="Enter amount you want to invest"
              className={clsx(
                "border border-gray-400 block w-[92%] outline-none mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3"
              )}
            />
          </div>

          {/* Expected ROI Field */}
          <div className="mb-4">
            <label className="text-md font-medium ml-4">Expected ROI</label>
            <input
              type="number"
              name="expectedRoi"
              value={formData.expectedRoi === 0 ? "" : formData.expectedRoi}
              onChange={handleInputChange}
              placeholder="Enter expected ROI"
              className={clsx(
                "border border-gray-400 block w-[92%] outline-none mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3"
              )}
            />
          </div>

          {/* Repayment Term Field */}
          <div className="mb-4">
            <label className="text-md font-medium ml-4">Payment Frequency</label>
            <select
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleInputChange}
              className={clsx(
                "border border-gray-400 block outline-none w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3"
              )}
            >
              <option value="">Select repayment term</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

          </div>

           {/* Expected ROI Field */}
          <div className="mb-4">
            <label className="text-md font-medium ml-4">Payment Duration</label>
            <input
              type="number"
              name="paymentTerm"
              value={formData.paymentTerm === 0 ? "" : formData.paymentTerm}
              onChange={handleInputChange}
              placeholder="Enter payment duration"
              className={clsx(
                "border border-gray-400 block w-[92%] outline-none mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3"
              )}
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
            <Button
              onClick={(e) => {
    e.preventDefault();
    handleInvest();
  }}
              className="w-full rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6"
            >
              {loading ? <div className="loader"></div> : "Invest Now"}
             
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestDialogModal;
