import React, { useState } from 'react';
import BuyersLayout from './BuyersLayout';
import { IoCartOutline } from "react-icons/io5";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Field, Input, Button } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';
import { useRouter } from '../../../Routes/router';
import { motion } from 'framer-motion';

const items = [
    {
        id: 1,
        img: '/images/iphone.png',
        name: 'Apple IPhone XS',
        amount: '₦3,499',
        descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
        id: 2,
        img: '/images/solar.png',
        name: 'Solar Panel 100W',
        amount: '₦80,499',
        descrp: '7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
        id: 3,
        img: '/images/inverter.png',
        name: 'Rich Solar',
        amount: '₦400,000',
        descrp: '1000W 48V 120VAC Solar Cabin kit',
    },
    {
        id: 4,
        img: '/images/inverter-two.png',
        name: 'UltraSolar Inverter 5kW',
        amount: '₦100,000',
        descrp: 'Solar Hybrid Inverter AC220V Pure Sine ...',
    },
    {
        id: 5,
        img: '/images/galaxy.png',
        name: 'Galaxy S21',
        amount: '₦800,499',
        descrp: '7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
        id: 6,
        img: '/images/camera.png',
        name: 'Solar Led Landscape',
        amount: '₦60,000',
        descrp: '1000W 48V 120VAC Solar Cabin kit',
    },
];

const Registration = ({ openStepTwo }) => {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   

    const closeDialog = () => {
        setIsOpen(false);
    };
    const handleBuyer = ()=>{
        if(!currentUser){
            router.push('/login') 
         }else if(currentUser.easyBuyRole === null){
            openStepTwo()   
        }else{
            router.push('/buyers/dashboard')
        }
    }

    const handlePartner = () => {
       if(!currentUser){
        router.push('/login')
       }else if(currentUser.easyBuyRole === null){
            openStepTwo()   
        }else{
            router.push('/partners/dashboard');

        }
    };

    return (
        <BuyersLayout>
            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <DialogBackdrop className="fixed inset-0  bg-black/30" />
                        <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel className="max-w-xl lg:w-[30vw] space-y-6 border bg-white p-12 rounded-lg">
                                <div className='flex justify-between items-start gap-x-[10rem]'>
                                    <DialogTitle className="-mt-7 -ml-7 font-bold font-plus-jakarta text-[16px] md:text-md lg:text-lg text-[#1D2433]"> Register as?</DialogTitle>
                                    <div className="-mt-7">
                                        <CloseCircle size="30" color="black" onClick={closeDialog} />
                                    </div>
                                </div>
                                <form>
                                    <Field>
                                        <Input
                                            defaultValue={'Buyer'}
                                            readOnly
                                            onClick={handleBuyer}
                                            className={clsx(
                                                'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-6 mb-8 px-5 text-xl font-bold cursor-pointer focus:outline-none',
                                            )}
                                        />
                                        <Input
                                            defaultValue={'Partner'}
                                            readOnly
                                            onClick={handlePartner}
                                            className={clsx(
                                                'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-6 px-5 text-xl font-bold cursor-pointer focus:outline-none',
                                            )}
                                        />
                                    </Field>
                                    <div className='w-full flex lg:justify-end'>
                                        <Button
                                            autoFocus
                                            type='submit'
                                            className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-4 px-4 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </motion.div>

                <section className='bg-[#1E3DD7] w-full h-[248px] rounded-xl'></section>

                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className='font-poppins text-[22px] font-medium my-6 text-[#000000]'>Phones & Solar items Deals</h3>
                    <div className='w-full justify-center grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8'>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className='w-full h-[300px]'>
                                    <img src={item.img} alt={item.id} className='w-auto h-auto' />
                                </div>
                                <div className='lg:w-[100%] lg:-mt-6 flex justify-between'>
                                    <p className='font-poppins font-medium text-[#101928] text-lg'>{item.name}</p>
                                    <p className='font-poppins font-[450] text-[#101928] text-xl'>{item.amount}</p>
                                </div>
                                <div>
                                    <p className='font-poppins font-normal text-[14px] text-[#101928]'>{item.descrp}</p>
                                </div>
                                <button className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'>
                                    <span><IoCartOutline className='text-[#475367]' /></span>
                                    <p className='text-[14px] text-[#475367] font-poppins font-semibold'> Add to Cart</p>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className='bg-[#2751E9] py-2 px-6 rounded-lg text-white font-poppins font-semibold text-[12px]'
                        >
                            View More
                        </motion.button>
                    </div>
                </motion.main>
            </div>
        </BuyersLayout>
    );
};

export default Registration;
