import React, { useState, useEffect } from 'react';
import { Copy, Briefcase } from 'iconsax-react';
import InvestorLayoutPage from './InvestorLayoutPage'
import { SliderVertical1 } from 'iconsax-react'
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react'
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';


const Investor = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    let [isOpen, setIsOpen] = useState(false)
    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
   

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
    const investments = [
        {
          id: 1,
          name: "Startup A",
          progress: '/images/Progress-bar.png', 
          status: 'Active',
          line: '/images/verticalline.png'
        },
        {
            id: 2,
            name: "Vehance",
            progress: '/images/Progress-bar.png', 
            status: 'Active',
            line: '/images/verticalline.png'
          },
          {
            id: 3,
            name: "SpaceX",
            progress: '/images/Progress-bar.png', 
            status: 'Active',
            line: '/images/verticalline.png'
          },
    ]
  return (
   <InvestorLayoutPage>
      <h4 className='font-poppins text-2xl font-medium'>Welcome, Mayowa</h4>
            <div className='flex justify-between'>
                <p className='font-poppins text-lg font-normal my-3 text-[#000000]'>Explore and Invest in Growing Businesses!</p>
                <Button    onClick={open} className='px-8 h-12 rounded-lg text-lg text-white bg-[#3369F4]'>
                    {isLargeScreen ? 'Invest Now' : '+'}
                </Button>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className='flex justify-between my-6 items-center mx-5'>
                            <DialogTitle as="h3" className="text-xl  py-4 font-semibold">
                               Invest Now
                            </DialogTitle>
                            <CloseCircle size="30" color="black" onClick={close} />
                        </div>
              <form action="">
              <Field >
                                <Label className='text-md ml-4 font-medium'>Investment Amount</Label>
                                <Input
                                    type='email'
                                    placeholder='Enter your email address'
                                    className={clsx(
                                        'border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                                    )}
                                />
                                 <Label className='text-md font-medium ml-4'>Expected Roi</Label>
                                <Input
                                    type='email'
                                    placeholder='Enter your email address'
                                    className={clsx(
                                        'border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                                    )}
                                />
                                 <Label className='text-md font-medium ml-4'>Repayment Term</Label>
                                <Input
                                    type='email'
                                    placeholder='Enter your email address'
                                    className={clsx(
                                        'border border-gray-400 block w-[92%] mx-4 rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                                    )}
                                />
                                </Field>
                                <div className='my-7 mx-5 flex lg:flex-row gap-3'>
                            <Button onClick={close} className="w-full rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-2 text-md mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
                                Cancel
                            </Button>
                                <Button
                                onClick={close}
                                className="w-full  rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                            >
                                Invest Now
                            </Button>

                                </div>
              </form>
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
            </div>
            <main className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <section className='md:col-span-2'>
                    <div className="w-full md:max-w-6xl p-6 border border-gray-200 rounded-lg shadow bg-[#1E3DD7] dark:border-blue-700">
                        <a href="#">
                            <h5 className="-mt-2 mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Available Balance</h5>
                        </a>
                        <p className="mb-4 font-medium text-2xl text-white">₦2,000,000.00</p>
                        <div className='flex items-center gap-1'>
                            <p className='text-white font-medium text-sm my-3'>Wema bank: 4054673854</p>
                            <Copy size="17" color="white" />
                        </div>
                        <div className='mt-6'>
                            <button href="#" className="w-full flex justify-center items-center md:py-3 py-3 text-sm font-semibold text-[#0099FF] bg-white rounded-lg">
                                Fund Wallet
                            </button>
                        </div>
                    </div>

                    <div className='md:flex gap-5'>
                        <div className='bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Total Investment</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 font-poppins font-[600]'>₦10,000,000</p>
                        </div>
                        <div className='bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Returns</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 font-poppins font-[600]'>₦2,000,000</p>
                        </div>
                    </div>

                 <div className='bg-white'>
                    <header className='flex justify-between'>
                        <h4 className='font-semibold font-poppins text-2xl'>Active Investments</h4>
                        <h4 className='text-blue-600 font-medium text-lg'>view all</h4>
                    </header>
                     <ul className='flex justify-between bg-[#F1F3F9] py-3 my-4'>
                        <li className='text-[#000000] text-lg font-medium font-poppins'>Business</li>
                        <li className='text-[#000000] text-lg font-medium font-poppins'>Progress</li>
                        <li className='text-[#000000] text-lg font-medium font-poppins'>Status</li>  
                        <li><img src="/images/verticalline.png" alt="vertical"  className='relative right-4'/></li>    
                     </ul>
                     {investments.map((item)=>(
                        <div key={item.id} className='flex justify-between gap-7 mx-4 mb-4 border-b border-gray-200'>
                            <p className=''>{item.name}</p>
                            <img src={item.progress} className='w-auto h-3' alt="bar" />
                            <p className='text-md font-normal font-poppins text-[#F37426]'>{item.status}</p>
                            <span><img src={item.line} alt="line"  /></span>
                        </div>
                     ))}

                 </div>
                </section>

                <article className='bg-white shadow-md p-5 rounded-md md:h-auto'>
                   <header className='flex justify-between items-center'>
                    <h4 className='font-poppins lg:font-medium lg:text-xl md:text-sm md:font-semibold'>Investment Requests</h4>
                    <a href="#" className='text-blue-500 lg:text-lg md:text-sm md:font-semibold'>See all</a>
                   </header>
                   <div className='bg-[#F8F9FC] mt-3 rounded-lg'>
                   <div className='flex justify-between py-4 mx-3'>
                    <p className='font-bold font-poppins'>Businesses</p>
                    <p className='text-blue-500 font-medium'>Explore</p>
                   </div>
                   <div className='h-9 w-9 mx-3 flex justify-center items-center bg-gray-300 rounded-[50%]'>
                <SliderVertical1 size="22" color="blue" />
              </div>
              <h3 className='font-poppins font-medium text-xl mx-3 my-3'>Startup A</h3>
              <p className='font-poppins font-medium text-lg mx-4 leading-7'>A tech startup focused on creating AI solutions.</p>
                  <div className='w-full'>
                  <button className='w-[90%] mx-4 my-6 bg-blue-600 py-2 font-poppins font-medium text-white rounded-md'>Invest Now</button>
                  </div>
                   </div>
                   <div className='bg-[#F8F9FC] mt-3 rounded-lg'>
                   <div className='flex justify-between py-4 mx-3'>
                    <p className='font-bold font-poppins'>Businesses</p>
                    <p className='text-blue-500 font-medium'>Explore</p>
                   </div>
                   <div className='h-9 w-9 mx-3 flex justify-center items-center bg-gray-300 rounded-[50%]'>
                <SliderVertical1 size="22" color="blue" />
              </div>
              <h3 className='font-poppins font-semibold text-lg mx-3 my-3'>Solar Innovation</h3>
              <p className='font-poppins font-medium text-lg mx-4 leading-7'>A cutting-edge startup focused on creating sustainable, affordable solar energy solutions.</p>
                  <div className='w-full'>
                  <button className='w-[90%] mx-4 my-6 bg-blue-600 py-2 font-poppins font-medium text-white rounded-md'>Invest Now</button>
                  </div>
                   </div>
                </article>
            </main>
   </InvestorLayoutPage>
  )
}

export default Investor

