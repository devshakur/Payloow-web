import React, { useState } from 'react';
import { Wallet, ArrowRight2 } from 'iconsax-react';
import { useRouter } from '../Routes/router';

// Dummy loan data
const dummyLoans = [
  {
    _id: '1',
    business_name: 'FarmVest Ltd',
    business_description: 'Agricultural investments with high ROI',
    loan_amount: 500000,
    duration: '6 Months',
    isOpen: true,
    repayment: 85000,
  },
  {
    _id: '2',
    business_name: 'TechSpark',
    business_description: 'Tech startup focused on EdTech solutions',
    loan_amount: 1000000,
    duration: '12 Months',
    isOpen: false,
    repayment: 95000,
  },
  {
    _id: '3',
    business_name: 'GreenPower NG',
    business_description: 'Renewable energy investment project',
    loan_amount: 750000,
    duration: '9 Months',
    isOpen: true,
    repayment: 70000,
  },
];

// LoanCard Component
const LoanCard = ({ loan, openAddLoan }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-[300px] mx-4 relative shrink-0">
      <div  className="flex cursor-pointer items-center justify-between mb-4">
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
            <div className="absolute top-6 right-0 z-10 bg-gray-700 text-white text-xs px-3 py-2 rounded-md shadow-lg w-[18rem]">
              {loan?.business_description}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Loan amount</p>
          <p className="font-medium text-gray-800">
            ₦{loan?.loan_amount?.toLocaleString() || '0'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Duration</p>
          <p className="font-medium text-gray-800">
            {loan?.duration || '12 Months'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Status</p>
          <p className={`font-medium ${loan?.isOpen ? 'text-green-600' : 'text-yellow-500'}`}>
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
          onClick={()=>router.push('/investment')}
          className="w-full bg-[#718f9e] py-2 rounded-md text-white font-semibold hover:bg-[#546e7a] transition"
        >
          Add Loan
        </button>
      </div>
    </div>
  );
};

// InvestmentMarquee Wrapper
const InvestmentMarquee = () => {
  const openAddLoan = (id) => {
    console.log(`Add loan clicked for: ${id}`);
  };

  return (
    <div className="w-full p-6 bg-gray-50 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment</h2>
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {dummyLoans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} openAddLoan={openAddLoan} />
          ))}
          {dummyLoans.map((loan) => (
            <LoanCard key={`duplicate-${loan._id}`} loan={loan} openAddLoan={openAddLoan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentMarquee;
