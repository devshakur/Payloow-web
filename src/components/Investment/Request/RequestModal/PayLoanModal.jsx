import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react';
import { CloseCircle, Wallet3, ArrowRight2 } from "iconsax-react";
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import useInvestment from '../../../../hooks/useInvetment';

const PayLoanModal = ({ isOpen, setIsOpen, onClose, setCurrent, data, repay }) => {
    const { getUserDetails } = useInvestment();
    const [user, setUser] = useState({});
    const [wallet, setWallet] = useState({});

    useEffect(() => {
        const userDetails = async () => {
            try {
                const resp = await getUserDetails();
                let info = resp?.data?.data?.user;
                let balance = resp?.data?.data?.wallet; // Ensure wallet data is extracted correctly

                if (info) {
                    setUser(info);
                    setWallet(balance);
                }
            } catch (error) {
                console.error("Failed to fetch information on User:", error);
            }
        };

        userDetails();
    }, []);

    const currentDate = new Date();

    // Function to check if a date is overdue
    const isOverdue = (date) => {
        return new Date(date) < currentDate;
    };

    // Calculate Total Due Amount and Remaining Amount
    const investmentAmount = data.investment_amount;
    const totalProfit = data.total_profit;
    const installmentAmount = data.installment_amount;
    const repaymentTerm = data.repayment_term;
    const isRepaid = data.is_repaid;

    const totalDueAmount = investmentAmount + totalProfit;  // Total amount due

    let remainingAmount = totalDueAmount;

    if (!isRepaid) {
        const paidInstallments = data.installment_due_dates.filter(date => !isOverdue(date)).length;
        remainingAmount = totalDueAmount - (installmentAmount * paidInstallments);
    }
    const roundedRemainingAmount = remainingAmount.toFixed(1);

    // Ensure wallet balance is accessed correctly (assuming wallet has a 'balance' property)
    const walletBalance = wallet?.balance || 0;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 lg:inset-x-[7rem] z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-lg rounded-xl p-6 bg-white duration-300 ease-out"
                    >
                        <div className='flex justify-between'>
                            <DialogTitle as="h3" className="text-[#1D2433] font-poppins font-semibold text-xl">
                                Pay Loan For this Business
                            </DialogTitle>
                            <CloseCircle size="30" color="black" onClick={onClose} />
                        </div>
                        <form className='my-3'>
                            <Field>
                                <Label className='text-sm font-poppins text-[#1D2433] font-semibold'>Repayment Amount</Label>
                                <Input
                                    type='text'  // Change to text if it is a read-only field
                                    value={`₦${totalProfit}`} // Show total profit as value, not as a placeholder
                                    disabled
                                    className={clsx(
                                        'border border-[#D0D5DD] block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                                    )}
                                />
                                <div className='flex justify-between my-7'>
                                    <div className='flex gap-2 items-center'>
                                        <span className='bg-[#F1F3F9] rounded-[50%] p-2'>
                                            <Wallet3 size="24" className='flex justify-center' color="#1D2433CC" />
                                        </span>
                                        <p className='font-poppins text-[#000000] text-sm font-medium'> Wallet (₦{walletBalance})</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-[#1E3DD7] text-sm font-poppins font-normal'>Fund Wallet</p>
                                        <span><ArrowRight2 size="17" color="#1E3DD7" /></span>
                                    </div>
                                </div>
                                <div className='border-2 border-gray-100 px-4 py-3 grid gap-3'>
                                    <div className='flex justify-between'>
                                        <p className='text-[#1D2433CC] font-poppins font-medium text-md'>Loan Amount</p>
                                        <p className='font-poppins font-semibold text-md text-[#000000]'>₦{investmentAmount}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-[#1D2433CC] font-poppins font-medium text-md'>Next Due Dates</p>
                                        <span className='flex flex-col gap-2'>
                                            {data.installment_due_dates.map((dueDate, index) => {
                                                const formattedDate = format(new Date(dueDate), 'dd/MM/yyyy');
                                                return (
                                                    <div key={index} className="flex items-center">
                                                        <p className='font-poppins font-semibold text-md text-[#000000]'>
                                                            {formattedDate}
                                                        </p>
                                                        {isOverdue(dueDate) && (
                                                            <p className='text-red-500 ml-2 font-poppins font-semibold text-md'>
                                                                Overdue
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-[#1D2433CC] font-poppins font-medium text-md'>Amount Due</p>
                                        <p className='font-poppins font-semibold text-md text-[#000000]'>₦{installmentAmount}</p>
                                    </div>
                                </div>
                            </Field>
                            <div className='w-full flex lg:justify-end'>
                                <Button
                                onClick={repay}
                                    className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6"
                                >
                                    Repay Now
                                </Button>
                            </div>
                        </form>
                        <Toaster />
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default PayLoanModal;
