import React, { useState, useEffect } from 'react';
import PartnersLayout from '../../Partners/PartnersLayout';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import MyInventory from './MyInventory';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Orders from './Orders';

import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import AddProductModal from './AddProductModal';
import ImageUploadModal from './ImageUploadModal';
import useInvestment from '../../../../hooks/useInvetment';
import { useRouter } from '../../../../Routes/router';


const Inventory = () => {
  const { GetEasyBuyCatgories, CreateProduct, GetSolarStock } = useInvestment();
  const [orders, setOrders] = useState('Inventory');
  const router = useRouter()
  let [isOpen, setIsOpen] = useState(true)
  const [category, setCategory] = useState(null)
  const [stock, setStock] = useState([])
  const [solarStock, setSolarStock] = useState([])
  const [phoneStock, setPhoneStock] = useState([])
  const [active, setActive] = useState('zero')
  const [isSubmitting, setIsSubmitting] = useState(false)
  let [isOpened, setIsOpened] = useState(true)

  const initialValues = {
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    color: [],
    image: null,
    additionalimages: [],
  };


  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Product Name is required'),
    category: Yup.string()
      .required('Category is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be a positive number'),
    stock: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be at least 1'),
    description: Yup.string()
      .required('Description is required'),
    color: Yup.array()
      .of(Yup.string().required('Color is required'))
      .min(1, 'At least one color is required')
      .required('Colors are required'),
    image: Yup.mixed()
      .required('Main image is required'),
    additionalimages: Yup.array()
      .of(Yup.mixed().required('Each image is required'))
      .required('Additional images are required'),
  });

  const onSubmit = async (values, {setSubmitting}) => {
    console.log('Form data', values);
    setSubmitting(true)
    try {
      const response = await CreateProduct(values);
      if (response && response.status === 200) {

        if (response.data?.message) {
          toast.success(response.data.message);
          setIsOpened(false)
          router.reload()
        } else {
          toast.success('Product Created Successfully');  // Fallback success message
        }
      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg)
      } else {
        toast.error('Failed to create product check your inputs')
      }
    }finally{
      setSubmitting(false)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  function opens() {
    setIsOpened(true)
  }

  function closes() {
    setIsOpened(false)
    setIsOpen(true)
    setActive('one')
  }
  function closeModal() {
    setIsOpened(false)
  }

  function open() {
    setIsOpen(true)
    setActive('one')
  }

  function close() {
    setIsOpen(false)
    setIsOpened(true)
    setActive('two')
  }

  const handleInventory = () => {
    setOrders('Inventory');
  };
  const handleOrders = () => {
    setOrders('order');
  };


  useEffect(() => {
    const productCategories = async () => {
      try {
        const resp = await GetEasyBuyCatgories();

        const message = resp?.data?.message;
        const productsData = resp?.data?.data;

        if (productsData) {
          setCategory(productsData);
          if (message) {
            toast.success(message);
          } else {
            toast.error('Message is empty');
          }
        } else {
          setCategory([]);
          toast.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        const errorMsg = error?.response?.data?.msg || 'Failed to fetch products';
        toast.error(errorMsg);
      }
    };

    productCategories();
  }, []);

  useEffect(() => {
    const totalStock = async () => {
      try {
        const resp = await GetSolarStock();

        const message = resp?.data?.message;
        const products = resp?.data?.data[0];
        const totalStock = products?.totalStock[0]?.totalStock
        const solarProduct = products?.categories[0]?.totalStock
        const phoneProduct = products?.categories[1]?.totalStock
        if (products) {
          setStock(totalStock);
          setSolarStock(solarProduct)
          setPhoneStock(phoneProduct)
          if (message) {
            console.log('Success Message:', message);
            toast.success(message);
          } else {
            toast.error('Message is empty');
          }
        } else {
          toast.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        const errorMsg = error?.response?.data?.msg || 'Failed to fetch stock categories';
        toast.error(errorMsg);
      }
    };

    totalStock();
  }, []);


  return (
    <PartnersLayout>
      <div className='flex justify-between items-center'>
        <h3 className='font-poppins font-medium md:text-[28px] text-[18px]'>Inventory Management</h3>
        <motion.button
          className='bg-blue-700 py-2 px-4 rounded-md text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={open}
        >
          Add Product
        </motion.button>
      </div>
      <article>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <motion.div
            className="bg-white shadow-md w-full p-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >

            <div className="flex justify-between">
              <h3 className='font-medium text-lg text-[#000]'>Total Stock</h3>
              <span>...</span>
            </div>
            <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>{stock && stock.length === 0 ? '0' : stock}</p>
            <div className="mt-3 flex gap-2">
              {stock && stock.length === 0 ? (
                <>
                <img src="/images/chart-down.png" alt="up" />
              <p className='text-red-600'>0%</p>
                </>
              ):
              <>
               <img src="/images/chart-ups.png" alt="up" />
              <p className='text-green-600'>32.3%</p>
              </>
              }
              
            </div>
          </motion.div>

          <motion.div
            className="bg-white shadow-md w-full p-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex justify-between">
              <h3 className='font-medium text-lg text-[#000]'>Solar Products</h3>
              <span>...</span>
            </div>
            <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>{solarStock && solarStock.length === 0 ? '0' : solarStock}</p>
            <div className="mt-3 flex gap-2">
              {solarStock && solarStock.length === 0 ? (
                <>
                  <img src="/images/chart-down.png" alt="down" />
                  <p className="text-red-600">0%</p>
                </>
              ) : (
                <>
                  <img src="/images/chart-ups.png" alt="up" />
                  <p className="text-green-600">20%</p>
                </>
              )}


            </div>
          </motion.div>

          <motion.div
            className="bg-white shadow-md w-full p-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex justify-between">
              <h3 className='font-medium text-lg text-[#000]'>Phones</h3>
              <span>...</span>
            </div>
            <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>{phoneStock && phoneStock.length === 0 ? '0' : phoneStock}</p>
            <div className="mt-3 flex gap-2">
              <img src="/images/chart-down.png" alt="down" />
              <p className='text-red-600'>18%</p>
            </div>
          </motion.div>
        </motion.div>
      </article>
      <motion.ul
        className='flex gap-3 mt-9 cursor-pointer'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.li
          tabIndex={0}
          onClick={handleInventory}
          className='focus:text-blue-600'
          whileHover={{ scale: 1.1 }}
        >
          My Inventory
        </motion.li>
        <motion.li
          tabIndex={0}
          onClick={handleOrders}
          className='focus:text-blue-600'
          whileHover={{ scale: 1.1 }}
        >
          Orders
        </motion.li>

      </motion.ul>

      <p className='w-[70%] md:w-[20%] border-b border-[#1D2433A6] p-1'></p>

      <motion.div
        className='flex justify-between mt-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className='lg:flex items-center gap-4'>
          <button className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'>
            <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
            <p className='text-lg text-blue-700'> Filters</p>
          </button>
          <div className='hidden lg:flex gap-3'>
            <p className='font-poppins text-lg font-semibold flex items-center gap-2 text-blue-400'>
              Type <IoIosArrowDown className='text-blue-400' />
            </p>
          </div>
        </div>
        <p className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'>
          Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>November<IoIosArrowDown /></span>
        </p>
      </motion.div>

      {orders === 'Inventory' && <MyInventory />}
      {orders === 'order' && <Orders />}
      {active === 'one' && <AddProductModal isOpen={isOpen} close={close} productId={category} formik={formik} />}
      {active === 'two' && <ImageUploadModal isOpened={isOpened} closes={closes} closeModal={closeModal} formik={formik} />}
      <Toaster />
    </PartnersLayout>
  );
};

export default Inventory;
