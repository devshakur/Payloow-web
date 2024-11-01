import React, {useState} from 'react'
import { SliderVertical1 } from 'iconsax-react'
import clsx from 'clsx';
import DebtorLayoutPage from '../Debtor/DebtorLayoutPage';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import Success from './Success';
const Loans = () => {
    let messages = 'hello'
    const [isOpen, setIsOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const openSuccessModal = () => {
        closeDialog(); // Close FormModal
        setIsSuccessModalOpen(true); // Open SuccessModal
    };
    const closeSuccessModal = () => setIsSuccessModalOpen(false);
    const startups = [
        {
          id: 1,
          name: "Startup A",
          description: "A tech startup focused on creating AI solutions.",
          loans: "$15,000",
          approvedImage: "/images/Approved.png",
        },
        {
          id: 2,
          name: "Startup B",
          description: "An eco-friendly company developing sustainable products.",
          loans: "$25,000",
          approvedImage: "/images/Approved.png",
        },
        {
          id: 3,
          name: "Startup C",
          description: "A fintech startup revolutionizing personal finance.",
          loans: "$30,000",
          approvedImage: "/images/Approved.png",
        },
      ];
     
  return (
    <DebtorLayoutPage>
    <main>
        <header className='bg-[#DBE7FE] px-12 shadow-lg rounded-md'>
            <h1 className='font-poppins text-[28px] py-4 font-semibold'>Add a Loan to Fuel Your Business Growth</h1>
            <p className='lg:w-[70%]  my-5 lg:-my-0 text-[22px] font-medium text-black font-poppins'>Secure the funding your business needs to thrive. Provide the loan details, and take a step closer to bringing your vision to life.</p>
            <div className='flex justify-center lg:justify-end lg:relative lg:-top-[9rem]'>
            <img src="/images/loan.png" className='h-[15rem]' alt="person" />
            </div>
            <div className='my-9 lg:-my-[12rem]'>
            <Button onClick={openDialog} className="w-full lg:w-1/6 font-poppins rounded-lg bg-[#3369F4] py-3 lg:mb-4 my-5 px-4 mb-4 text-white mt-6 text-xl data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
            Add Loan
                    </Button>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeDialog}>
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div className="fixed inset-1 lg:inset-x-[5rem] xl:-inset-[-6rem] z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center">
                                <DialogPanel
                                    transition
                                    className="w-full h-auto mx-4 p-5 max-w-xl rounded-xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                >
                                    <div className='flex justify-between'>
                                        <DialogTitle as="h3" className="font-semibold text-xl">
                                            Add Loan
                                        </DialogTitle>
                                        <div className="mb-3">
                                            <CloseCircle size="30" color="black" onClick={closeDialog} />
                                        </div>
                                    </div>
                                    <form>
                                        <Field>
                                            <label htmlFor="amount" className='font-poppins text-lg font-semibold'>Loan Amount</label>
                                            <Input
                                                type='number'
                                                placeholder='amount'
                                                className={clsx(
                                                    'block w-full border border-black rounded-md bg-[#F1F3F9] py-2 mb-8 px-2 text-xl font-medium cursor-pointer',
                                                )}
                                            />
                                           <label htmlFor="rate" className='font-poppins text-lg font-semibold'>Interest Rate</label>
                                            <Input
                                                type='number'
                                                placeholder='Interest rate'
                                                className={clsx(
                                                    'block w-full border border-black rounded-md bg-[#F1F3F9] py-2 mb-8 px-2 text-xl font-medium cursor-pointer',
                                                )}
                                            />
                                             <label htmlFor="collateral" className='font-poppins text-lg font-semibold'>Collateral</label>
                                            <Input
                                                type='text'
                                                placeholder='collateral'
                                                className={clsx(
                                                    'block w-full border border-black rounded-md bg-[#F1F3F9] py-2 mb-8 px-2 text-xl font-medium cursor-pointer',
                                                )}
                                            />
                                           
                                        </Field>
                                        <div className='w-full flex lg:flex-row gap-5'>
                                            <Button autoFocus className="w-full rounded-lg border border-blue-500 py-3 px-4 text-md text-blue-500 mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
                                                Cancel
                                            </Button>
                                            <Button onClick={openSuccessModal} autoFocus className="w-full  rounded-lg bg-[#3369F4] py-3 px-4 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
                                                Add Now
                                            </Button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                    <Success
                     isOpen={isSuccessModalOpen} 
                     onClose={closeSuccessModal} 
                    />
            </div>
        </header>
        <section className='lg:my-[15rem]'>
            <div className='flex justify-between mx-6'>
            <h3 className='font-poppins font-medium text-xl'>My Businesses</h3>
            <p className='font-poppins text-blue-500 font-medium text-xl'>See all</p>
            </div>
            <div className='flex flex-wrap justify-center lg:justify-start'>
  {startups.map((startup) => (
    <article key={startup.id} className='flex lg:flex-row justify-center my-4 lg:mx-4 w-full lg:w-[30%]'>
      <div className='bg-white w-full lg:py-[5rem] py-3 rounded-lg shadow-lg'>
        <div className='flex justify-between mx-3 lg:-mt-12'>
          <div className='h-10 w-10 flex justify-center items-center bg-gray-300 rounded-[50%]'>
            <SliderVertical1 size="17" color="blue" />
          </div>
          <div className='bg-green-200 rounded-md flex justify-center items-center py-3 px-3'>
            <img src={startup.approvedImage} alt={startup.name} />
          </div>
        </div>
        <h3 className='font-poppins font-semibold mt-7 text-2xl text-[#1D2433] mx-3'>{startup.name}</h3>
        <p className='font-medium font-poppins mt-2 text-xl tracking-wide mx-3 text-[#1D2433CC]'>{startup.description}</p>
        <div className='flex my-4 mx-3 gap-3 lg:mt-9'>
          <h4 className='font-medium font-poppins text-lg'>Loans:</h4>
          <p className='font-semibold font-poppins text-xl'>{startup.loans}</p>
        </div>
        <div className='mx-4 mt-9 flex gap-4 flex-col lg:-mb-[3rem]'>
          <button  className='w-full bg-[#3369F4] py-3 rounded-md text-white font-semibold font-poppins'>Add Loan</button>
          <button className='w-full border border-blue-300 py-3 rounded-md text-blue-500 font-semibold'>View Business</button>
        </div>
      </div>
    </article>
  ))}
</div>
        </section>
    </main>
    </DebtorLayoutPage>
  )
}

export default Loans
