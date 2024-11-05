import React, { useState } from 'react';
import InvestmentLayout from './InvestmentLayout';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';
import './investment.css';
import FormModal from './Modal/FormModal';
import SuccessModal from './Modal/SuccessModal';
import InvestorSuccessModal from './Modal/InvestorSuccessModal';
import InvestorFormModal from './Modal/InvestorFormModal';

const Investment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isInvestorSuccessModalOpen, setIsInvestorSuccessModalOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);
    const openFormModal = () => {
        closeDialog(); // Close the main dialog
        setIsFormModalOpen(true); // Open the FormModal
    };
    const openInvestorModal = ()=>{
        closeDialog();
        setIsInvestorModalOpen(true)
    }
    const closeFormModal = () => setIsFormModalOpen(false);
    const closeInvestorFormModal = () => setIsInvestorModalOpen(false)
    
    const openSuccessModal = () => {
        closeFormModal(); // Close FormModal
        setIsSuccessModalOpen(true); // Open SuccessModal
    };
    const openInvestorSuccessModal = () => {
      closeInvestorFormModal() // Close InvestorFormModal
       setIsInvestorSuccessModalOpen(true) // Open InvestorSuccessModal
    };
    const closeSuccessModal = () => setIsSuccessModalOpen(false);
    const closeInvestorSuccessModal = () => setIsInvestorSuccessModalOpen(false);

    return (
        <InvestmentLayout className={clsx('h-[100vh] w-[100vw] bg-blue-50 font-poppins p-4', { 'blur-md': isOpen || isFormModalOpen || isSuccessModalOpen })}>
            <section className="w-full rounded-xl bg-white px-3 py-8 shadow-lg grid lg:grid-cols-[2fr, 1fr] lg:grid-flow-col">
                <div>
                    <h4 className='text-2xl font-[550]'>Welcome to Investment, Mayowa</h4>
                    <p className='text-base font-medium py-4'>Are you here to seek investment for your business or to invest in promising businesses?</p>
                    <Button onClick={openDialog} className="w-full lg:w-[180px] rounded-lg bg-[#3369F4] py-5 px-4 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
                        Register Now
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
                                            Who do you want to Register as?
                                        </DialogTitle>
                                        <div className="mb-3">
                                            <CloseCircle size="30" color="black" onClick={closeDialog} />
                                        </div>
                                    </div>
                                    <form>
                                        <Field>
                                            <Input
                                                defaultValue={'a Debtor'}
                                                readOnly
                                                onClick={openFormModal} // Open FormModal on click
                                                className={clsx(
                                                    'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-6 mb-8 px-5 text-xl font-bold cursor-pointer',
                                                )}
                                            />
                                            <Input
                                                defaultValue={'an Investor'}
                                                readOnly
                                                onClick={openInvestorModal} // Open FormModal on click
                                                className={clsx(
                                                    'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-6 px-5 text-xl font-bold cursor-pointer',
                                                )}
                                            />
                                        </Field>
                                        <div className='w-full flex lg:justify-end'>
                                            <Button autoFocus className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-4 px-4 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
                                                Next
                                            </Button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>

                    {/* Form Modal */}
                    <FormModal 
                        isOpen={isFormModalOpen} 
                        onClose={closeFormModal} 
                        onRegister={openSuccessModal} // Pass the openSuccessModal function
                    />
                    <InvestorFormModal 
                      isOpen={isInvestorModalOpen}
                      onClose={closeInvestorFormModal}
                     onRegister={openInvestorSuccessModal}
                    />

                    {/* Success Modal */}
                    <SuccessModal 
                        isOpen={isSuccessModalOpen} 
                        onClose={closeSuccessModal} 
                    />
                    <InvestorSuccessModal 
                    isOpen={isInvestorSuccessModalOpen} 
                    onClose={closeInvestorSuccessModal} 
                    />
                </div>
                <div className='hidden lg:flex justify-end h-[17vh]'>
                    <img src="images/Group.png" className='h-[310px] relative -top-20' alt="group" />
                </div>
            </section>
            <article className='flex items-center flex-col lg:flex-row gap-5 mt-10 lg:mt-[12vh]'>
                <div className='lg:w-1/2 bg-[#3369F4] rounded-lg shadow-lg'>
                    <div className='m-6'>
                        <div className='w-[50px] h-[50px] bg-white flex justify-center items-center rounded-[50%]'>
                            <img src="images/briefcase.png" className='w-[30px] h-[30px]' alt="briefcase" />
                        </div>
                        <h5 className='text-2xl text-white my-3 font-medium'>Need a Loan for Your Business?</h5>
                        <p className='text-lg font-normal text-white'>As a debtor, you can create your business profile, apply for loans, and manage your repayments. Let investors help you grow your business.</p>
                        <div className='w-[300px] my-5'>
                            <Button onClick={openDialog} className='p-4 bg-white rounded-lg data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500'>Start as a Debtor</Button>
                        </div>
                    </div>
                </div>
                <div className='lg:w-1/2 bg-[#0099FF] rounded-lg shadow-lg'>
                    <div className='m-6'>
                        <div className='w-[50px] h-[50px] bg-white flex justify-center items-center rounded-[50%]'>
                            <img src="images/chart.png" className='w-[30px] h-[30px]' alt="chart" />
                        </div>
                        <h5 className='text-2xl text-white my-3 font-medium'>Looking to Invest?</h5>
                        <p className='text-lg font-normal text-white'>Browse through promising businesses, choose the ones you're interested in, and watch your investment grow with returns.</p>
                        <div className='w-[300px] my-5'>
                            <Button onClick={openDialog}  className='p-4 bg-white rounded-lg data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500'>Start as an Investor</Button>
                        </div>
                    </div>
                </div>
            </article>
        </InvestmentLayout>
    );
}

export default Investment;
