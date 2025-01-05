import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from '../../../Routes/router';
import { IoIosArrowForward } from "react-icons/io";
import { RiStarSFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { motion } from 'framer-motion';
import BuyersLayout from '../EasyBuyRegistration/BuyersLayout';
import { useParams } from 'react-router-dom';
import useInvestment from '../../../hooks/useInvetment';
import {toast, Toaster} from 'react-hot-toast'
import { phonesItems } from './product';
import { solarItems } from './product'; 
import { CartContext } from './cartContext';

const ProductDetails = () => {
    const { id } = useParams()
    const {FetchAllProduct, AddToCart, GetCart} = useInvestment();
    const {increaseCartQuantity} = useContext(CartContext)
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState(null); 
    const [selecttedPrd, setSelectedPrd] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [checkProduct, setCheckProduct] = useState('')
    const [productId, setProductId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [totalQuantity, setTotalQuantity] = useState(0)
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

    useEffect(() => {
        const productItems = async () => {
          try {
            const resp = await FetchAllProduct();
            const message = resp?.data?.data?.message; 
            const productsData = resp?.data?.data?.data;
            if (productsData) {
              setSelectedPrd(productsData)
              toast.success(message)
            } else {
              setSelectedPrd([])
              toast.error('Failed to fetch products')
            }
          } catch (error) {
            if (error?.response?.data?.msg) {
              toast.error(error.response.data.msg);  
            } else {
              toast.error('Failed to fetch products'); 
            }
          }
        }
       productItems();
      }, [])

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
      };
    
      const decreaseQuantity = () => {
        setQuantity(prev => (prev > 0 ? prev - 1 : 0 ));
      };
    const changeImage = (chooseImg) => {
        setSelectedImage(chooseImg);
    }

    const handleCart = () => {
        router.push('/user-cart');
    }
   

    const saveId = ()=>{
        localStorage.setItem('product_id', id)
        router.push('/swap-product')
    }
    
  useEffect(() => {
        // Find the product based on the id from the URL
        const foundProduct = selecttedPrd.find((p) => p._id === id); 
        if (foundProduct) {
            console.log(foundProduct);
            setProduct(foundProduct);  
          //  setSelectedImage(foundProduct.img)
            setProductId(foundProduct._id)
            setCheckProduct(foundProduct.name)
        }
    }, [id, selectedImage, selecttedPrd]);  

    if (!product) {
        return <div className='flex justify-center items-center'>
            <p className='text-lg font-plus-jakarta font-medium text-gray-700'>Loading...</p>
        </div>;  
    }

        const fetchCartItems = async () => {
          try {
            const resp = await GetCart();
            const info = resp?.data?.data;
      
            if (info) {
              const total = info.reduce((sum, item) => sum + item.quantity, 0);
              setTotalQuantity(total);
            }
          } catch (error) {
            console.error("Failed to fetch cart items:", error);
          }
        };
      
       




    const values = {
        productId: productId,
        quantity: quantity
    }

    const AddItemsToCart = async ()=> {
        setLoading(true)
        try {
          const resp = await AddToCart(values);
          const info = resp?.data?.data
          if(info){
            setCartItems(info)
            increaseCartQuantity(quantity)
            toast.success('View Cart Items')
            setLoading(false)
          } else {
            setCartItems([])
            toast.error('Failed to add Items to Cart', info)
          }
        } catch (error) {
            if (error?.response?.data?.msg) {
                toast.error(error.response.data.msg);  
              } else {
                toast.error('Failed to add Items to Cart'); 
              }
        }
      }
     
       const handleAddToCart = () => {
        AddItemsToCart();
        fetchCartItems()
    }

    return (
        <BuyersLayout>
            <div>
                <header className='font-poppins font-medium text-[16px] text-blue-800 mb-4'>
                    Home / Search / <span className='text-neutral-950'>{product.name}</span>
                </header>

                <main className='w-full lg:grid lg:grid-cols-2 gap-4 lg:gap-[4rem]'>
                    <section className=''>
                        <motion.div
                            className='bg-white shadow-lg flex justify-center'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img src={product.img || selectedImage} alt="iphone11" className='w-[70%] h-[80%]' />
                        </motion.div>

                        <div className="my-5 flex flex-row lg:grid lg:grid-cols-3 xl:flex items-center">
                        <motion.img
                                src={product.img || '/images/iphon11-small.png'}
                                alt="iphone"
                                onClick={() => {changeImage(product.img)}}
                                whileHover={{ scale: 1.1 }}
                                className='w-24 h-24'
                                transition={{ duration: 0.3 }}
                            />
                            <motion.img
                                src="/images/iphon-yellow.png"
                                alt="yellow"
                                onClick={() => { changeImage('/images/full-view.png') }}
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
                            <span className='hidden lg:flex'>
                            <motion.img
                                src="/images/iphon-green.png"
                                alt="green"
                                onClick={() => { changeImage('/images/iphon-green.png') }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
                            </span>
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
                               {product.name}
                            </motion.h3>

                            <motion.p
                                className='font-poppins font-medium text-lg text-blue-700 flex items-center gap-3 cursor-pointer'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Compare <button onClick={()=> router.push('/comapare-product')} className='hidden lg:flex text-blue-800 font-semibold'><IoIosArrowForward /></button>
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
                            {product.description}
                            </motion.p>
                        </div>

                        <div className='mt-5'>
                            <motion.h5
                                className='font-plus-jakarta font-bold text-xl text-[#101928]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                              {`${product.price.$numberDecimal} or ₦${(parseFloat(product.price.$numberDecimal.replace(/[^\d.-]/g, '')) / 6).toFixed(0)}/month`}

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
                            <div className=" w-full flex justify-end rounded-lg text-white">
                                <button onClick={saveId} className='w-[50%] text-blue-700 border border-blue-600 py-4 lg:-py-5 rounded-lg text-sm lg:text-lg'>Swap Product</button>
                            </div>
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
                                    <button onClick={decreaseQuantity} className='font-bold pl-5'><AiOutlineMinus className='w-8 h-8' /></button>
                                    <p className='font-bold font-plus-jakarta text-xl'>{quantity}</p>
                                    <button onClick={increaseQuantity} className='font-bold pr-8'><GoPlus className='w-8 h-8' /></button>
                                </div>
                                <p className='font-poppins text-[15px] font-medium'>Only <span className='text-blue-700'>12 Items Left!</span> Don’t miss it</p>
                                <img src="/images/view.png" alt="view" />
                            </motion.div>
                        </div>

                        <div className='w-full flex flex-col lg:flex-row gap-3 mt-5 '>
                            <button onClick={handleCart} className='w-full bg-blue-600 text-white py-4 lg:py-0 rounded-lg text-lg'>View Cart</button>
                            <button onClick={handleAddToCart} className='w-full text-blue-700 border border-blue-600 py-4 lg:-py-5 rounded-lg text-lg'>Add to Cart</button>
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
        {/* Check if the product contains the keyword 'Solar' */}
        {checkProduct.toLowerCase().includes('solar') ? (
            // If 'Solar', map over the solarItems array
            solarItems.map((item) => (
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
                    <button  className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'>
                        <span><IoCartOutline className='text-[#475367]' /></span>
                        <p className='text-[14px] text-[#475367] font-poppins font-semibold'>
                        {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
      ) : (
        "Add to Cart"
      )}

                             </p>
                    </button>
                </motion.div>
            ))
        ) : (
            // If not 'Solar', map over the phonesItems array
            phonesItems.map((item) => (
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
                    <button  className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'>
                        <span><IoCartOutline className='text-[#475367]' /></span>
                        <p className='text-[14px] text-[#475367] font-poppins font-semibold'> Add to Cart</p>
                    </button>
                </motion.div>
            ))
        )}
    </div>
                </section>
                <Toaster />
            </div>
        </BuyersLayout>
    )
}

export default ProductDetails;

