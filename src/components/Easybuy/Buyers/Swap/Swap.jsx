import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BuyersLayoutGen from '../BuyersLayoutGen';
import { VscArrowSwap } from "react-icons/vsc";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploadModal from './ImageUploadModal';
import {toast, Toaster} from 'react-hot-toast'
import SwapModal from './SwapModal';
import TradeSuccessModal from './TradeSuccessModal';
import useInvestment from '../../../../hooks/useInvetment';
import { useEffect } from 'react';
import { useRouter } from '../../../../Routes/router';

const Swap = () => {
  const { swapProduct } = useInvestment()
  const router = useRouter()
  const [selectedForm, setSelectedForm] = useState('phone');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('one');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [submiting, setSubmiting] = useState(false)

const productToSwapId = localStorage.getItem('product_id') || ''

  const initialValues = {
    productToSwapId: productToSwapId,
    productName: '',
    productBrand: '',
    productModel: '',
    productDescription: '',
    front: null,
    back: null,
    receipt: null,
    box: null,
  };


  const validationSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    productBrand: Yup.string().required('Brand is required'),
    productModel: Yup.number().required('Model is required').min(0, 'Model must be a positive number'),
    productToSwapId: Yup.string().required('Swap ID is required').min(1, 'Swap ID must be at least 1'),
    productDescription: Yup.string().required('Description is required'),
    front: Yup.mixed().required('Front image is required'),
    back: Yup.mixed().required('Back image is required'),
    receipt: Yup.mixed().required('Receipt image is required'),
    box: Yup.mixed().required('Box image is required'),
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
    setSubmiting(true)
    try {
      const response = await swapProduct(values);
      if (response && response.status === 200) {
        setSubmiting(false);
        setIsOpen(false);
        setActive('three')
        if (response.data?.message) {
          toast.success(response.data.message);

        } else {
          toast.success('Product Sent Successfully');  // Fallback success message
        }
      }
    }catch (error) {
     setSubmiting(false); // Ensure you're managing your loading state correctly
    
      // Check if the error response has the `msg` key
      if (error?.response?.data?.msg) {
        const errorMsg = error.response.data.msg; // Extract the error message
        
        toast.error(errorMsg); // Display it in the toast
      } else {
        // Fallback for unknown errors
        toast.error('Failed to create product. Please check your inputs.');
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });








  // Handle switching forms
  const handleSelection = (formType) => {
    setSelectedForm(formType);
  };

  // Prevent form submission and open the modal
  const handleNextClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsOpen(true); // Open the image upload modal
  };

  // Handle active state transition and trigger the second modal
  const handleUploadSuccess = () => {
    setActive('two'); // Transition to step 'two' after uploading images
    setIsNewModalOpen(true); // Open the SwapModal
  };

  const successModal = () => {
    setActive('three');
  };

  return (
    <BuyersLayoutGen>
      <div className='flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5'>
        {/* First Section (Swap Introduction) */}
        <motion.div
          className='bg-white rounded-md shadow-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <header className='flex p-3 gap-4'>
            <span className='w-9 h-9 bg-blue-100 shadow-lg flex items-center justify-center rounded-[50%]'>
              <VscArrowSwap className='w-4 h-4 text-blue-900 font-semibold' />
            </span>
            <div className='font-poppins text-[22px] text-[#000000] font-medium'>
              Swap Your Device
            </div>
          </header>
          <p className='font-plus-jakarta font-medium text-[16px] text-[#1D2433CC] mx-5'>
            With Easybuy swap, you can get a great value for your current device and apply it toward a new one. And you can do it all online. If your device isn’t eligible, we’ll recycle it for free. It’s a great deal for you and the planet.
          </p>
          <div className='m-5 mt-8'>
            <h4 className='font-poppins font-medium text-xl text-[#1D2433]'>Step 1: Get your swap!</h4>
            <p className="font-plus-jakarta font-medium text-[16px] text-[#1D2433CC] mt-2">
              You can input details about your device (model, condition, etc.) and receive an instant valuation.
            </p>
          </div>
          <div className='m-5'>
            <h4 className='font-poppins font-medium text-xl text-[#1D2433]'>Step 2: Receive a Confirmation Email</h4>
            <p className="font-plus-jakarta font-medium text-[16px] text-[#1D2433CC] mt-2">
              After Input, you'll receive a trade-in confirmation email. This email will redirect you to checkout if your product is eligible.
            </p>
          </div>
          <div className='m-5'>
            <h4 className='font-poppins font-medium text-xl text-[#1D2433]'>Step 3: Return Your Device</h4>
            <p className="font-plus-jakarta font-medium text-[16px] text-[#1D2433CC] mt-2">
              Choose your preferred return method. The confirmation email will provide you with step-by-step instructions.
            </p>
          </div>
          <div className='flex items-end w-auto h-[15rem] p-4'>
            <p className='font-poppins font-medium text-lg cursor-pointer'>
              Get help by contacting our <span onClick={()=>router.push('/support')} className='text-blue-500'>support</span> team
            </p>
          </div>
        </motion.div>

        {/* Selection Form */}
        <motion.div
          className={`bg-white rounded-md shadow-lg ${active === 'one' ? 'fade-in' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className='p-3 flex gap-3 w-full'>
            <li
              className={`w-[50%] py-4 rounded-md pl-12 text-blue-700 flex justify-between items-center ${selectedForm === 'phone' ? 'bg-blue-100' : 'bg-[#F8F9FC]'} cursor-pointer`}
              onClick={() => handleSelection('phone')}
            >
              Phone <span className='mr-4 w-3 h-3'><img src="/images/checkout.png" alt="checkout" /></span>
            </li>
            <li
              className={`w-[50%] py-4 rounded-md pl-12 text-blue-700 flex justify-between items-center ${selectedForm === 'solar' ? 'bg-blue-100' : 'bg-[#F8F9FC]'} cursor-pointer`}
              // onClick={() => handleSelection('solar')}
            >
              Solar <span className='mr-4 w-3 h-3'><img src="/images/checkout.png" alt="checkout" /></span>
            </li>
          </ul>

          {/* Conditional Rendering of Forms */}
          {selectedForm === 'phone' && (
            <form onSubmit={handleNextClick}>
              <motion.div
                className="w-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="product Name" className='font-medium font-plus-jakarta'>Product Name</label>
                <input
                  placeholder='Product Name'
                  className='w-[100%] border border-gray-300 focus:outline-none py-2 rounded-md px-3'
                  type="text"
                  name='productName'
                  onChange={formik.handleChange}
                  value={formik.values.productName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productName && formik.errors.productName ? (
                  <div className="text-red-500">{formik.errors.productName}</div>
                ) : null}
              </motion.div>
              <motion.div
                className="w-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="Brand" className='font-medium font-plus-jakarta'>Brand</label>
                <select
                  name="productBrand"
                  id="brand"
                  className='w-[100%] border border-gray-300 focus:outline-none py-2 rounded-md px-3'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productBrand}
                >
                   <option value="choose">Choose a brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Hauwei">Hauwei</option>
                  <option value="Others">Others</option>
                </select>
                {formik.touched.productBrand && formik.errors.productBrand ? (
                  <div className="text-red-500">{formik.errors.productBrand}</div>
                ) : null}
              </motion.div>
              <motion.div
                className="w-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="product Modal" className='font-medium font-plus-jakarta'>Model</label>
                <input 
                placeholder='productModel' 
                name='productModel'
                className='w-[100%] border border-gray-300 focus:outline-none py-2 rounded-md px-3' 
                type="number" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productModel}
                />
                 {formik.touched.productModel && formik.errors.productModel ? (
                  <div className="text-red-500">{formik.errors.productModel}</div>
                ) : null}
              </motion.div>
              <motion.div
                className='w-full p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="product-desc" className='font-medium font-plus-jakarta'>Product Description</label>
              </motion.div>
              <motion.textarea
                name="productDescription" id="desc"
                className='border-2 rounded-md focus:outline-none border-gray-300 w-[95%] ml-4'
                cols="30" rows="8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productDescription}
              />
               {formik.touched.productDescription && formik.errors.productDescription ? (
                  <div className="text-red-500">{formik.errors.productDescription}</div>
                ) : null}
              <div className='w-full flex justify-center mt-6 pb-5'>
                <motion.button
                  type="button"
                  onClick={handleNextClick}
                  className="py-2 w-[95%] bg-blue-700 text-white rounded-lg font-poppins font-medium text-md"
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Next
                </motion.button>
              </div>
            </form>
          )}

          {/* Modal Components */}
          {isOpen && (
            <ImageUploadModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setActive={setActive}
              formik={formik}
              onSubmit={formik.handleSubmit}
              handleUploadSuccess={handleUploadSuccess}
              submiting={submiting}
              setSubmiting={setSubmiting}
              className="modal-slide-in"
            />
          )}
           {/* {active === 'two' && <SwapModal
            isNewModalOpen={isNewModalOpen}
            setIsNewModalOpen={setIsNewModalOpen}
            setActive={setActive}
            successModal={successModal} />} */}
          {active === 'three' && <TradeSuccessModal />} 

          {selectedForm === 'solar' && (
            <div className='font-plus-jakarta p-5 flex justify-center text-lg font-medium'>
             This Feature is not Available yet
            </div>
            // <form action="">
            //   <motion.div
            //     className="w-full p-4"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ duration: 0.5 }}
            //   >
            //     <label htmlFor="solarProductName" className='font-medium font-plus-jakarta'>Solar Product Name</label>
            //     <input placeholder='Solar Product Name' className='w-[100%] border border-gray-300 focus:outline-none py-2 rounded-md px-3' type="text" />
            //   </motion.div>
            //   <motion.div
            //     className="w-full p-4"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ duration: 0.5 }}
            //   >
            //     <label htmlFor="solarBrand" className='font-medium font-plus-jakarta'>Brand</label>
            //     <select name="solarBrand" id="solarBrand" className='w-[100%] border border-gray-300 focus:outline-none py-2 rounded-md px-3'>
            //       <option value="SolarBrand1">SolarBrand1</option>
            //       <option value="SolarBrand2">SolarBrand2</option>
            //     </select>
            //   </motion.div>
            //   <motion.div
            //     className="w-full p-4"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ duration: 0.5 }}
            //   >
            //     <label htmlFor="solarModel" className='font-medium font-plus-jakarta'>Model</label>
            //     <input placeholder='Model' className='w-[100%] border border-gray-300 focus:outline-none py-2 rounded-md px-3' type="text" />
            //   </motion.div>
            //   <motion.div
            //     className='w-full p-4'
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ duration: 0.5 }}
            //   >
            //     <label htmlFor="solar-desc" className='font-medium font-plus-jakarta'>Product Description</label>
            //   </motion.div>
            //   <motion.textarea
            //     name="solar-desc" id="solar-desc"
            //     className='border-2 rounded-md focus:outline-none border-gray-300 w-[95%] ml-4'
            //     cols="30" rows="8"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ duration: 0.5 }}
            //   />
            //   <div className='w-full flex justify-center mt-6 pb-5'>
            //     <motion.button className="py-2 w-[95%] bg-blue-700 text-white rounded-lg font-poppins font-medium text-md">
            //       Next
            //     </motion.button>
            //   </div>
            // </form>
          )}
        </motion.div>
        <Toaster />
      </div>
    </BuyersLayoutGen>
  );
};

export default Swap;
