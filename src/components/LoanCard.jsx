import React, { useState } from 'react';
import { Wallet, ArrowRight2 } from 'iconsax-react';

const LoanCard = ({ loan, openAddLoan, handleView }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md mx-auto relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-[#e0f7fa] p-2 rounded-full">
            <Wallet size={24} className="text-[#00acc1]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {loan?.business_name || 'Business Loan'}
            </h2>
            <p className="text-sm text-gray-500">Loan Type</p>
          </div>
        </div>

        <div className="relative">
          <ArrowRight2
            size={20}
            className="text-gray-400 cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
          />
          {showTooltip && (
            <div className="absolute top-6 right-0 z-10 bg-gray-700 text-white text-xs px-3 py-2 rounded-md shadow-lg w-[20rem]">
              {loan?.business_description}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Loan amount</p>
          <p className="font-medium text-gray-800">
            ₦{loan?.loan?.loan_amount?.toLocaleString() || '0'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Collateral</p>
          <p className="font-medium text-gray-800">
            {loan?.loan?.collateral || 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Status</p>
          <p className="font-medium text-green-600">
            {loan?.isOpen ? 'Open' : 'Pending'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Monthly Repayment</p>
          <p className="font-medium text-gray-800">
            ₦{loan?.repayment?.toLocaleString() || '0'}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 border-t pt-4">
        <button
         onClick={() => openAddLoan(loan._id)}
          className="w-full bg-[#718f9e] py-2 rounded-md text-white font-semibold hover:bg-[#546e7a] transition"
        >
          Add Loan
        </button>
      </div>
    </div>
  );
};

export default LoanCard;
