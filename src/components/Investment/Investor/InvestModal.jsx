import React from 'react';
import clsx from 'clsx';

// Reusable Invest Form Component
const InvestModal = ({ formData, handleInputChange, handleInvest, close, verifying, }) => {
  return (
    <form action="">
     
      <div className="mb-4">
        <Label className="text-md ml-4 font-medium">Investment Amount</Label>
        <Input
          type="number"
          name="investment_amount"
          value={formData.investment_amount}
          onChange={handleInputChange}
          placeholder="Enter amount you want to invest"
          className={clsx(
            'border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3'
          )}
        />
      </div>


      <div className="mb-4">
        <Label className="text-md font-medium ml-4">Expected ROI</Label>
        <Input
          type="number"
          name="expected_roi"
          value={formData.expected_roi}
          onChange={handleInputChange}
          placeholder="Enter expected ROI"
          className={clsx(
            'border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3'
          )}
        />
      </div>

      <div className="mb-4">
        <Label className="text-md font-medium ml-4">Repayment Term</Label>
        <Input
          type="number"
          name="repayment_term"
          value={formData.repayment_term}
          onChange={handleInputChange}
          placeholder="Enter repayment term"
          className={clsx(
            'border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3'
          )}
        />
      </div>

      {/* Action Buttons */}
      <div className="my-7 mx-5 flex lg:flex-row gap-3">
        <Button
          onClick={close}
          className="w-full rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-2 text-md mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
        >
          Cancel
        </Button>
        <Button
          onClick={handleInvest}
          disabled={verifying}
          className="w-full rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
        >
          {verifying ? 'Investing In Business...' : 'Invest Now'}
       
        </Button>
      </div>
    </form>
  );
};


const Label = ({ children, className }) => <label className={className}>{children}</label>;

const Input = ({ type, name, value, onChange, placeholder, className }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={className}
  />
);

const Button = ({ children, onClick, className, type }) => (
  <button type={type || 'button'} onClick={onClick} className={className}>
    {children}
  </button>
);

export default InvestModal;
