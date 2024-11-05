import React from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';
import '../investment.css';


const FormModal = ({ isOpen, onClose, onRegister }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 lg:inset-x-[7rem] z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-lg rounded-xl p-6 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)]"
                    >
                        <div className='flex justify-between my-6'>
                            <DialogTitle as="h3" className="text-base/7 font-medium">
                                Create Debtor Account
                            </DialogTitle>
                            <CloseCircle size="30" color="black" onClick={onClose} />
                        </div>
                        <form action="">
                            <Field>
                                <Label className='text-sm font-medium'>Email</Label>
                                <Input
                                    type='email'
                                    placeholder='Enter your email address'
                                    className={clsx(
                                        'border border-gray-400 block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                                    )}
                                />
                                <Label className='text-sm font-medium'>Phone Number</Label>
                                <Input
                                    type='tel'
                                    placeholder='+12345678923'
                                    className={clsx(
                                        'block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3 border border-gray-400',
                                    )}
                                />
                                <Label className='text-sm font-medium'>Proof of Credit Score</Label>
                                <Input
                                    type='file'
                                    placeholder='Upload your credit score'
                                    className={clsx(
                                        'block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3 border border-gray-400',
                                    )}
                                />
                            </Field>
                        </form>

                        <div className='w-full flex flex-col lg:flex-row lg:gap-4'>
                            <Button
                                onClick={() => {
                                    onRegister(); // Call the onRegister function to open the success modal
                                    onClose(); // Close the FormModal
                                }}
                                className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                            >
                                Register
                            </Button>
                            <Button onClick={onClose} className="w-full lg:w-[200px] rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-2 text-md mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
                                Cancel
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default FormModal;
