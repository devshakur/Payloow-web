// import React from 'react'
// import { useRouter } from '../../../Routes/router'

// const DegreeView = () => {
//     const router = useRouter();
//     const handleCheckout  = ()=>{
//         router.push('/checkout-product')
//     }
  
//   return (
//     <div>
//       <header className='p-5 flex justify-between items-center bg-white mt-6 mx-3'>
//       <div className="hidden md:flex shrink-0 items-center">
//                     <img
//                         alt="Paylow Logo"
//                         src="/images/logo.svg"
//                         className="h-14 w-auto"
//                     />
//                 </div>
//                 <div>
//                     <h4 className='font-plus-jakarta font-normal text-lg text-[#000000]'>360-Degree Views</h4>
//                 </div>
//                 <div>
//                     <p className='text-blue-700'>Cancel</p>
//                 </div>
//       </header>
//                 <main className='flex flex-col lg:grid lg:grid-cols-2 bg-white mt-5 lg:gap-12'>
//                  <div className='flex flex-col lg:flex-row justify-center lg:justify-start'>
//                     <img className='w-[80%]' src="/images/full-view.png" alt="full-view" />
//                     <div className='flex pl-8 lg:pl-12 gap-4 lg:gap-2 lg:flex-col lg:border-2 lg:mt-8 lg:justify-center lg:rounded-[56px]'>
//                  <div className='mt-4'>
//                     <img className='h-[100%] lg:h-[80%]' src="/images/full-preview-small.png" alt="small" />
//                  </div>
//                  <div className='mt-4'>
//                     <img className='h-[100%] lg:h-[80%]' src="/images/camera-view.png" alt="back-camera" />
//                  </div>
//                  <div className='mt-4'>
//                     <img className='h-[100%] lg:h-[90%]' src="/images/full-back.png" alt="back-camera" />
//                  </div>
//                  <div className='mt-4'>
//                     <img className='h-[100%] lg:h-[90%]' src="/images/holding.png" alt="back-camera" />
//                  </div>
//                  </div>
//                  </div>
//                 <article className='lg:mt-12 mx-2'>
//                     <div className='flex justify-between'>
//                     <h4 className='font-plus-jakarta font-semibold text-lg'>Iphone11</h4>
//                     <p className='font-medium text-lg font-poppins'>$80<span className='ml-3 font-medium text-lg font-poppins text-red-500 line-through'>$100</span></p>
//                     </div>
//                     <p className='text-[16px] font-plus-jakarta font-normal mt-5'>Experience the iPhone 11 in classic white—a seamless blend of style and functionality. This model features a stunning 6.1-inch Liquid Retina display, a powerful dual-camera system for capturing ultra-clear photos and 4K videos, and an efficient A13 Bionic chip for smooth performance.</p>
//                 <div className='flex mt-5  gap-3 items-center'>
//                     <h5>Color:</h5>
//                     <p className='w-12 h-12 rounded-[50%] bg-yellow-300'></p>
//                 </div>
//                 <div className="w-full mt-8">
//                     <button onClick={handleCheckout} className='w-full font-plus-jakarta text-white bg-blue-700 py-3 rounded-lg'>
//                        Buy Now
//                     </button>
//                 </div>
//                 </article>
//                 </main>
//     </div>
//   )
// }

// export default DegreeView
import React, { useState } from 'react';
import { useRouter } from '../../../Routes/router';

const DegreeView = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState("/images/full-view.png"); 

    const handleCheckout = () => {
        router.push('/checkout-product');
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    }

    return (
        <div>
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
                    <p className='text-blue-700'>Cancel</p>
                </div>
            </header>
            <main className='flex flex-col lg:grid lg:grid-cols-2 bg-white mt-5 lg:gap-12'>
                <div className='flex flex-col lg:flex-row justify-center lg:justify-start'>
                    <img className='w-[70%] h-[90%]' src={selectedImage} alt="full-view" />
                    <div className='flex pl-8 lg:pl-12 gap-4 lg:gap-2 lg:flex-col lg:border-2 lg:mt-8 lg:justify-center lg:rounded-[56px]'>
                        <div className='mt-4'>
                            <img 
                                className='w-[70%] h-[90%]' 
                                src="/images/full-preview-small.png" 
                                alt="small"
                                onClick={() => handleImageClick("/images/full-view.png")}
                            />
                        </div>
                        <div className='mt-4'>
                            <img 
                                className='h-[100%] lg:h-[80%]' 
                                src="/images/camera-view.png" 
                                alt="back-camera" 
                                onClick={() => handleImageClick("/images/camera-view.png")}
                            />
                        </div>
                        <div className='mt-4'>
                            <img 
                                className='h-[100%] lg:h-[90%]' 
                                src="/images/full-back.png" 
                                alt="back-camera" 
                                onClick={() => handleImageClick("/images/full-back.png")}
                            />
                        </div>
                        <div className='mt-4'>
                            <img 
                                className='h-[100%] lg:h-[90%]' 
                                src="/images/holding.png" 
                                alt="back-camera" 
                                onClick={() => handleImageClick("/images/holding.png")}
                            />
                        </div>
                    </div>
                </div>
                <article className='lg:mt-12 mx-2'>
                    <div className='flex justify-between'>
                        <h4 className='font-plus-jakarta font-semibold text-lg'>Iphone11</h4>
                        <p className='font-medium text-lg font-poppins'>$80
                            <span className='ml-3 font-medium text-lg font-poppins text-red-500 line-through'>$100</span>
                        </p>
                    </div>
                    <p className='text-[16px] font-plus-jakarta font-normal mt-5'>
                        Experience the iPhone 11 in classic white—a seamless blend of style and functionality.
                        This model features a stunning 6.1-inch Liquid Retina display, a powerful dual-camera system for capturing ultra-clear photos and 4K videos, and an efficient A13 Bionic chip for smooth performance.
                    </p>
                    <div className='flex mt-5 gap-3 items-center'>
                        <h5>Color:</h5>
                        <p className='w-12 h-12 rounded-[50%] bg-yellow-300'></p>
                    </div>
                    <div className="w-full mt-8">
                        <button onClick={handleCheckout} className='w-full font-plus-jakarta text-white bg-blue-700 py-3 rounded-lg'>
                            Buy Now
                        </button>
                    </div>
                </article>
            </main>
        </div>
    );
}

export default DegreeView;
