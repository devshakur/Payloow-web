import React from 'react';

const RepaySuccess = ({ setCurrent, data }) => {
    const {investment_amount, installment_amount} = data
    const remainingBalance = investment_amount - installment_amount
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 overflow-x-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[-13px]" aria-hidden="true"></div>

      <div className="relative z-10 w-screen lg:w-auto mx-6 bg-white text-[#1D2433] p-6 rounded-lg">
        <div className='flex flex-col items-center justify-center'>
          <img src="/images/success.png" alt="success" />
          <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
          <p>Thank you for your timely payment. Your remaining balance is now ₦{remainingBalance}!</p>
          <div className='w-full flex-col lg:flex-row my-3 flex gap-3'>
            <button onClick={() => setCurrent(0)}  className='w-full border border-blue-400 p-2 px-6 rounded-lg'>Cancel</button>
            <button onClick={() => setCurrent(0)} className='w-full bg-blue-800 text-white rounded-lg p-2'>Done</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaySuccess;
