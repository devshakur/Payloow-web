import React, { useState,useEffect } from 'react';
import { useRouter } from '../../../Routes/router';
import { motion } from 'framer-motion'; // Import Framer Motion
import useInvestment from '../../../hooks/useInvetment';
import {toast, Toaster} from 'react-hot-toast'
const DegreeView = () => {
    const router = useRouter();
    const {GetCart} = useInvestment();
    const [selectedImage, setSelectedImage] = useState("/images/full-view.png");
    const [cartItems, setCartItems] = useState()

    const handleCheckout = () => {
        router.push('/checkout-product');
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };
    const handleCancel = ()=>{
        router.push('buyers/dashboard')
    }

    useEffect(() => {
        const fetchCartItems = async () => {
          try {
            const resp = await GetCart();
            const info = resp?.data?.data;
            const message = resp?.data?.message
            if (info) {
              setCartItems(info);
              toast.success(message);
              const initialQuantities = info.reduce((acc, item) => {
                acc[item._id] = item.quantity; // Set the initial quantity for each item
                return acc;
              }, {});
              setQuantities(initialQuantities); // Initialize quantities with the fetched data 
            } else {
                toast.error('No cart items found');
            }
          } catch (error) {
            const errorMsg = error?.response?.data?.msg
            toast.error(errorMsg);
          }
        };
    
        fetchCartItems();
      }, []);

      
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <header className='p-5 flex justify-between items-center bg-white mt-6 mx-3'>
                <div className="hidden md:flex shrink-0 items-center">
                    <img
                        alt="Paylow Logo"
                        src="/images/logo.svg"
                        className="h-14 w-auto"
                    />
                </div>
                <div>
                    <h4 className='font-plus-jakarta font-normal text-lg text-[#000000]'>360-Degree Views</h4>
                </div>
                <div>
                    <button onClick={handleCancel} className='text-blue-700 cursor-pointer'>Cancel</button>
                </div>
            </header>

             {cartItems && cartItems.length > 0 ? (
                cartItems.map((item)=>(
                    <main className='flex flex-col lg:grid lg:grid-cols-2 bg-white mt-5 lg:gap-12'>
                    <div 
                    className='flex flex-col lg:flex-row justify-center lg:justify-start' 
                    key={item._id}>
                    {/* Add motion.div to animate the image container */}
                    <motion.img
                        className='w-[70%] h-[90%]'
                        src={item.product?.imageKey || selectedImage}
                        alt="full-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className='flex pl-8 lg:pl-12 gap-4 lg:gap-2 lg:flex-col lg:border-2 lg:mt-8 lg:justify-center lg:rounded-[56px]'>
                        <div className='mt-4'>
                            <motion.img
                                className='w-[70%] h-[90%]'
                                src="/images/full-preview-small.png"
                                alt="small"
                                onClick={() => handleImageClick("/images/full-view.png")}
                                whileHover={{ scale: 1.05 }} // Scale on hover
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                        <div className='mt-4'>
                            <motion.img
                                className='h-[100%] lg:h-[80%]'
                                src="/images/camera-view.png"
                                alt="back-camera"
                                onClick={() => handleImageClick("/images/camera-view.png")}
                                whileHover={{ scale: 1.05 }} // Scale on hover
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                        <div className='mt-4'>
                            <motion.img
                                className='h-[100%] lg:h-[90%]'
                                src="/images/full-back.png"
                                alt="back-camera"
                                onClick={() => handleImageClick("/images/full-back.png")}
                                whileHover={{ scale: 1.05 }} // Scale on hover
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                        <div className='mt-4'>
                            <motion.img
                                className='h-[100%] lg:h-[90%]'
                                src="/images/holding.png"
                                alt="back-camera"
                                onClick={() => handleImageClick("/images/holding.png")}
                                whileHover={{ scale: 1.05 }} // Scale on hover
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                    </div>
                </div>
                    
                <article className='lg:mt-12 mx-2'>
                    <div className='flex justify-between'>
                        <h4 className='font-plus-jakarta font-semibold text-lg'>{item.product?.name}</h4>
                        <p className='font-medium text-lg font-poppins'>{item.product?.price.$numberDecimal}
                            <span className='ml-3 font-medium text-lg font-poppins text-red-500 line-through'>{item.product?.price.$numberDecimal}</span>
                        </p>
                    </div>
                    <p className='text-[16px] font-plus-jakarta font-normal mt-5'>
                        {item.product?.description}
                    </p>
                    <div className='flex mt-5 gap-3 items-center'>
                        <h5>Color:</h5>
                        <p className='w-12 h-12 rounded-[50%] bg-yellow-300'></p>
                    </div>
                   
                
                  
                </article>
            </main>
                ))
             ) : (
                <div>No product....</div>
             )}
             {cartItems && cartItems.length > 0 ? (
             <div className="w-full  my-4 flex justify-center">
             <motion.button
                 onClick={handleCheckout}
                 className='w-[80%] lg:w-[30%] font-plus-jakarta text-white bg-blue-700 py-3 rounded-lg'
                 whileHover={{ scale: 1.05 }} 
                 transition={{ type: 'spring', stiffness: 300 }}
             >
                 Buy Now
             </motion.button>
         </div> 
             ): (
                <div></div>
             )}
                
           <Toaster />
        </motion.div>
    );
};

export default DegreeView;

