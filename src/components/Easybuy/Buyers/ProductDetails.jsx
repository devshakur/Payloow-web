import React, { useState } from 'react';
import { useRouter } from '../../../Routes/router';
import { IoIosArrowForward } from "react-icons/io";
import { RiStarSFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { motion } from 'framer-motion';
import BuyersLayout from '../EasyBuyRegistration/BuyersLayout';

const ProductDetails = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState('/images/full-view.png');

    const changeImage = (chooseImg) => {
        setSelectedImage(chooseImg);
    }

    const handleCart = () => {
        router.push('/user-cart');
    }

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
            img: '/images/iPhone11.png',
            name: 'iPhone11',
            amount: '₦300,000',
            descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
        },
        {
            id: 3,
            img: '/images/iPhone12.png',
            name: 'iPhone13',
            amount: '₦400,000',
            descrp: '1000W 48V 120VAC Solar Cabin kit',
        },
    ]

    return (
        <BuyersLayout>
            <div>
                <header className='font-poppins font-medium text-[16px] text-blue-800 mb-4'>
                    Home / Search / <span className='text-neutral-950'>Iphone11</span>
                </header>

                <main className='w-full lg:grid lg:grid-cols-2 gap-4 lg:gap-[4rem]'>
                    <section className=''>
                        <motion.div
                            className='bg-white shadow-lg flex justify-center'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img src={selectedImage} alt="iphone11" className='w-[70%] h-[80%]' />
                        </motion.div>

                        <div className="my-5 flex flex-row lg:grid lg:grid-cols-3 xl:flex items-center">
                            <motion.img
                                src="/images/iphon-yellow.png"
                                alt="yellow"
                                onClick={() => { changeImage('/images/full-view.png') }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.img
                                src="/images/iphon11-small.png"
                                alt="iphone"
                                onClick={() => { changeImage('/images/iphone11-full.png') }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.img
                                src="/images/iphon-black.png"
                                alt="black"
                                onClick={() => { changeImage('/images/iphon-black.png') }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.img
                                src="/images/iphon-green.png"
                                alt="green"
                                onClick={() => { changeImage('/images/iphon-green.png') }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </section>

                    <article className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                            <motion.h3
                                className='font-poppins text-2xl font-semibold'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Iphone 11
                            </motion.h3>

                            <motion.p
                                className='font-poppins font-medium text-lg text-blue-700 flex items-center gap-3'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Compare <span className='hidden lg:flex text-blue-800 font-semibold'><IoIosArrowForward /></span>
                            </motion.p>
                        </div>

                        <div className='flex mt-5 items-center'>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span className='text-[14px] font-medium font-inter ml-4 text-[#344054]'>10 Sold</span>
                        </div>

                        <div>
                            <motion.p
                                className='font-inter font-medium text-lg text-[#667185]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Experience the iPhone 11 in classic white—a seamless blend of style and functionality. This model features a stunning 6.1-inch Liquid Retina display, a powerful dual-camera system for capturing ultra-clear photos and 4K videos, and an efficient A13 Bionic chip for smooth performance.
                            </motion.p>
                        </div>

                        <div className='mt-5'>
                            <motion.h5
                                className='font-plus-jakarta font-bold text-xl text-[#101928]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                ₦300,000 or ₦50,000/month
                            </motion.h5>
                            <motion.p
                                className='font-plus-jakarta font-normal text-sm text-[#667185]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Suggested payments with 6 months special financing
                            </motion.p>
                        </div>

                        <div className='mt-6'>
                            <motion.h5
                                className='font-inter font-bold text-[16px] text-[#101928]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Choose a Color
                            </motion.h5>
                        </div>

                        <motion.ul
                            className="flex gap-3 items-center border p-5 bg-gray-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <li className="w-14 h-14 border bg-white shadow-md rounded-[50%]"></li>
                            <li className="w-10 h-10 border bg-[#000] shadow-md rounded-[50%]"></li>
                            <li className="w-10 h-10 border bg-[#F3FF0D] shadow-md rounded-[50%]"></li>
                            <li className="w-10 h-10 border bg-[#08875D] shadow-md rounded-[50%]"></li>
                        </motion.ul>

                        <div className='mt-4 lg:mt-0'>
                            <motion.h4
                                className='font-plus-jakarta font-semibold text-lg'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Quantity
                            </motion.h4>

                            <motion.div
                                className='flex items-center gap-5'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className='justify-between flex w-[12rem] py-3 gap-6 bg-[#DBE7FE] rounded-lg'>
                                    <button className='font-bold pl-5'><AiOutlineMinus className='w-8 h-8' /></button>
                                    <p className='font-bold font-plus-jakarta text-xl'>1</p>
                                    <button className='font-bold pr-8'><GoPlus className='w-8 h-8' /></button>
                                </div>
                                <p className='font-poppins text-[15px] font-medium'>Only <span className='text-blue-700'>12 Items Left!</span> Don’t miss it</p>
                                <img src="/images/view.png" alt="view" />
                            </motion.div>
                        </div>

                        <div className='w-full flex flex-col lg:flex-row gap-3 mt-5 '>
                            <button onClick={handleCart} className='w-full bg-blue-600 text-white py-4 lg:py-0 rounded-lg text-lg'>Buy Now</button>
                            <button className='w-full text-blue-700 border border-blue-600 py-4 lg:-py-5 rounded-lg text-lg'>Add to Cart</button>
                        </div>
                    </article>
                </main>

                <section className='my-6'>
                    <motion.h4
                        className='font-plus-jakarta text-xl font-medium text-[#000000]'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Similar items you might like
                    </motion.h4>
                    <div className='grid lg:grid-cols-3 justify-start sm:grid-cols-2 gap-y-8 mt-5'>
                        {items.map((item) => (
                            <motion.div key={item.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                <div className='w-full h-[300px]'>
                                    <img src={item.img} alt={item.id} className='w-auto h-auto' />
                                </div>
                                <div className='lg:w-[80%] w-[50%] lg:-mt-6 flex justify-between md:w-[70%]'>
                                    <p className='font-poppins font-medium text-[#101928] text-lg'>{item.name}</p>
                                    <p className='font-poppins font-[450] text-[#101928] text-xl'>{item.amount}</p>
                                </div>
                                <div>
                                    <p className='font-poppins w-[80%] truncate font-normal text-[14px] text-[#101928]'>{item.descrp}</p>
                                </div>
                                <button className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'>
                                    <span><IoCartOutline className='text-[#475367]' /></span>
                                    <p className='text-[14px] text-[#475367] font-poppins font-semibold'> Add to Cart</p>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </BuyersLayout>
    )
}

export default ProductDetails;
