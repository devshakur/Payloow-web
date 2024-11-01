import React, { useState, useEffect } from 'react';
import DebtorLayoutPage from './DebtorLayoutPage';
import { Copy, Briefcase } from 'iconsax-react';

const DebtorDashboard = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <DebtorLayoutPage>
            <h4 className='font-poppins text-2xl font-medium'>Welcome, Mayowa</h4>
            <div className='flex justify-between'>
                <p className='font-poppins text-lg font-normal my-3'>This is your Investment dashboard</p>
                <button className='px-8 h-12 rounded-lg text-xl text-white bg-blue-800'>
                    {isLargeScreen ? '+ Get Started' : '+'}
                </button>
            </div>
            <main className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <section className='md:col-span-2'>
                    <div className="w-full md:max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-blue-700">
                        <a href="#">
                            <h5 className="-mt-2 mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Loan Wallet Balance</h5>
                        </a>
                        <p className="mb-4 font-medium text-2xl text-white">₦2,000,000.00</p>
                        <div className='flex items-center gap-1'>
                            <p className='text-white font-medium text-sm my-3'>Wema bank: 4054673854</p>
                            <Copy size="17" color="white" />
                        </div>
                        <div className='flex flex-col gap-4 md:flex-row w-full'>
                            <button href="#" className="flex justify-center items-center md:w-[60%] md:py-3 py-2 text-sm font-semibold text-[#0099FF] bg-white rounded-lg">
                                Loan Payment
                            </button>
                            <button href="#" className="flex justify-center items-center md:w-[60%] py-2 text-sm font-semibold text-[#0099FF] bg-white rounded-lg">
                                Withdrawal
                            </button>
                        </div>
                    </div>

                    <div className='md:flex gap-5'>
                        <div className='bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Total Loan Amount</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 font-poppins font-[600]'>₦5,000,000.00</p>
                        </div>
                        <div className='bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Loan Balance</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 font-poppins font-[600]'>₦2,000,000.00</p>
                        </div>
                    </div>

                    <div className='md:flex gap-5'>
                        <div className='bg-[#F1F3F9] md:w-1/2 my-5 py-5 rounded-md'>
                            <h4 className='mx-3'>Credit Score</h4>
                            <div className='h-[10rem] flex justify-center'>
                                <img src="/images/score.png" className='h-[12rem] mx-6 my-5' alt="score" />
                            </div>
                            <p className='font-poppins font-normal text-center text-[#1D2433]'>Last Updated on 16 Oct, 2023</p>
                        </div>
                        <div className='bg-[#F1F3F9] md:w-1/2 h-[6rem] my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal px-6 text-lg font-poppins text-[#1D2433]'>Investment Requests</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 text-center font-poppins font-[600]'>4</p>
                        </div>
                    </div>
                </section>

                <article className='bg-white shadow-md p-5 rounded-md md:h-auto'>
                   <header className='flex justify-between items-center'>
                    <h4 className='font-poppins lg:font-medium lg:text-xl md:text-sm md:font-semibold'>Investment Requests</h4>
                    <a href="#" className='text-blue-500 lg:text-lg md:text-sm md:font-semibold'>See all</a>
                   </header>
                   <div className='bg-[#F8F9FC] mt-3 rounded-lg'>
                   <div className='flex justify-between py-4 mx-3'>
                    <img src="/images/thumbsup.png" alt="thumbsup" />
                    <p className='font-poppins font-bold text-lg text-black'>
                        John Doe
                    </p>
                    <img src="/images/pending.png" alt="pending" />
                   </div>
                   <p className='text-center relative -top-[3rem] font-semibold text-lg -ml-6 md:-top-[1.6rem] md:ml-3 xl:-top-[3rem]'>Investor</p>
                   <div className='flex gap-5 flex-col'>
                  <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                    <p>Business Name</p>
                    <span>Vehance Tech Limited</span>
                  </div>
                  <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                    <p>Loan Amount</p>
                    <span className='mx-14 md:mx-0 xl:mx-14'>₦2,000,000.00</span>
                  </div>
                  <div className='flex md:flex-col xl:flex-row justify-between  mx-6 font-semibold text-md'>
                    <p className='xl:text-[15px]'>Interest Rate</p>
                    <span className='mx-[8rem] md:mx-0 xl:mx-[7rem]'>30%</span>
                  </div>
                  <div className='flex md:flex-col xl:flex-row justify-between   mx-6 font-semibold text-md'>
                    <p>Repayment Period</p>
                    <span className='mx-[5rem] md:mx-0 xl:mx-16'>12 Months</span>
                  </div>
                  <div className='mt-12 flex flex-col xl:flex-row mx-5 mb-5 gap-4 justify-between'>
                  <button className='border border-blue-400 py-2 px-12 font-poppins font-medium text-blue-400 rounded-md'>Decline</button>
                  <button className='bg-blue-600 py-2 px-12 font-poppins font-medium text-white rounded-md'>Accept</button>
                  </div>
                   </div>
                   </div>

                   <div className='bg-[#F8F9FC] mt-3 rounded-lg'>
                   <div className='flex justify-between py-4 mx-3'>
                    <img src="/images/thumbsup.png" alt="thumbsup" />
                    <p className='font-poppins font-bold text-lg text-black'>
                        Mark Zukerberg
                    </p>
                    <img src="/images/pending.png" alt="pending" />
                   </div>
                   <p className='text-center relative -top-[3rem] xl:-top-[3rem] md:-top-[1.6rem] md:ml-3 font-semibold text-lg -ml-6'>Investor</p>
                   <div className='flex gap-5 flex-col'>
                  <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                    <p>Business Name</p>
                    <span className='mx-[6rem] md:mx-0 xl:mx-[6rem]'>Payloow</span>
                  </div>
                  <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                    <p>Loan Amount</p>
                    <span className='mx-14 md:mx-0 xl:mx-14'>₦2,000,000.00</span>
                  </div>
                  <div className='flex md:flex-col xl:flex-row justify-between  mx-6 font-semibold text-md'>
                    <p className='xl:text-[15px]'>Interest Rate</p>
                    <span className='mx-[8rem] md:mx-0 xl:mx-[7rem]'>30%</span>
                  </div>
                  <div className='flex md:flex-col xl:flex-row justify-between   mx-6 font-semibold text-md'>
                    <p>Repayment Period</p>
                    <span className='mx-[5rem] md:mx-0 xl:mx-16'>12 Months</span>
                  </div>
                  <div className='mt-12 flex flex-col xl:flex-row mx-5 mb-5 gap-4 justify-between'>
                  <button className='border border-blue-400 py-2 px-12 font-poppins font-medium text-blue-400 rounded-md'>Decline</button>
                  <button className='bg-blue-600 py-2 px-12 font-poppins font-medium text-white rounded-md'>Accept</button>
                  </div>
                   </div>
                   </div>
                </article>
            </main>
        </DebtorLayoutPage>
    );
};

export default DebtorDashboard;
