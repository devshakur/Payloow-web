

import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { format } from 'date-fns';

const Loan = ({ isOpen, setIsOpen, setIsActive, user, businessData }) => {
  const { customer_model } = businessData;

  const loan = businessData?.loan;

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-[390px] lg:w-[650px] shadow-md space-y-6 border bg-white p-8 rounded-lg">
              
              {/* Tabs */}
              <DialogTitle className="w-full font-bold flex flex-row">
                <Button onClick={() => setIsActive('one')} className='border border-gray-400 flex-1 py-2 rounded-l-lg text-[#475367] font-poppins font-medium text-lg hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Overview</Button>
                <Button onClick={() => setIsActive('two')} className='border border-gray-400 flex-1 text-[#475367] font-poppins font-medium text-lg hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Links</Button>
                <Button className='border border-gray-400 flex-1 rounded-r-lg font-poppins font-medium text-lg bg-blue-600 text-white'>Loan</Button>
              </DialogTitle>

              {/* First Section */}
              <div className='border border-[#E1E6EF] rounded-lg py-5 px-4'>
                <div className='space-y-4'>
                  <InfoRow label="Loan Amount" value={loan ? loan.loan_amount : 'No Available Loan'} />
                  <InfoRow
                    label="Created Date"
                    value={loan ? format(new Date(loan.created_at), 'dd/MM/yyyy') : 'No Available Loan'}
                  />
                  <InfoRow label="Collateral" value={loan ? loan.collateral : 'No Available Loan'} />
                  <InfoRow label="Amount Debursed" value={loan ? loan.amount_disbursed : '0'} />
                  <InfoRow label="Owner" value={`${user?.first_name || 'Not Specified'}`} />
                </div>
              </div>

              {/* Second Section - Matching UX */}
              <div className='border border-[#E1E6EF] rounded-lg py-5 px-4 mt-6'>
                <div className='space-y-4'>
                  <InfoRow label="Customer Model" value={customer_model || 'Not specified'} />
                  <InfoRow label="Loan Status" value={loan ? loan.status : 'No Available Loan'} />
                  <InfoRow label="Repayment Date" value={loan ? format(new Date(loan.repayment_date), 'dd/MM/yyyy') : 'No Available Loan'} />
                  <InfoRow label="Tenure" value={loan ? `${loan.tenure} months` : 'No Available Loan'} />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <Button onClick={() => setIsOpen(false)} className='w-full lg:w-1/2 rounded-lg bg-[#3369F4] py-3 px-4 text-white text-xl font-medium hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-500'>
                  Done
                </Button>
              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

// Extracted reusable row component
const InfoRow = ({ label, value }) => (
  <div className='flex justify-between items-center'>
    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>{label}</p>
    <p className='font-poppins font-semibold text-lg text-[#1D2433CC]'>{value}</p>
  </div>
);

export default Loan;
