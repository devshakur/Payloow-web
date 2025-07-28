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
import { Link } from 'react-router-dom';
import useInvestment from '../../../hooks/useInvetment';
import { toast, Toaster } from 'react-hot-toast'

import { phonesItems } from './product';
import { solarItems } from './product';
import { CartContext } from './cartContext';
import { Loader } from '../../../AuthContext/Loader';

const ProductDetails = () => {
    const { id } = useParams()
    const { FetchAllProduct, AddToCart, GetCart } = useInvestment();
    const { increaseCartQuantity } = useContext(CartContext)
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [selecttedPrd, setSelectedPrd] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [additionalImage, setAdditionalImage] = useState([])
    const [selectedColor, setSelectedColor] = useState('');
    const [cartItems, setCartItems] = useState([])
    const [checkProduct, setCheckProduct] = useState('')
    const [colors, setColors] = useState([])
    const [productId, setProductId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [totalQuantity, setTotalQuantity] = useState(0)


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
        setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    };


    const handleCart = () => {
        router.push('/user-cart');
    }


    const saveId = () => {
        localStorage.setItem('product_id', id)
        router.push('/swap-product')
    }


    const changeImage = (chooseImg) => {
        setSelectedImage(chooseImg);
    }

    useEffect(() => {
        const foundProduct = selecttedPrd.find((p) => p._id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setProductId(foundProduct._id);
            setColors(foundProduct.color);
            setCheckProduct(foundProduct.name);
            setAdditionalImage(foundProduct.additionalImagesUrls)
            // Set default image only when product is loaded for the first time
            if (!selectedImage) {
                setSelectedImage(foundProduct.imageUrl);
            }
        }
    }, [id, selecttedPrd]); // Removed selectedImage from dependency array


    if (!product) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
                <div className="space-y-6 w-full max-w-lg px-4">
                    {/* Skeleton image */}
                    <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"></div>
                    
                    {/* Skeleton title */}
                    <div className="h-8 bg-gray-300 animate-pulse rounded w-3/4"></div>
                    
                    {/* Skeleton description */}
                    <div className="h-6 bg-gray-300 animate-pulse rounded w-full"></div>
                    <div className="h-6 bg-gray-300 animate-pulse rounded w-5/6"></div>
                    
                    {/* Skeleton buttons or actions */}
                    <div className="flex space-x-4">
                        <div className="h-10 bg-gray-300 animate-pulse rounded w-1/3"></div>
                        <div className="h-10 bg-gray-300 animate-pulse rounded w-1/3"></div>
                    </div>
                </div>
            </div>
        );
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
        quantity: quantity,
        color: selectedColor,
    }

    const AddItemsToCart = async () => {
        setLoading(true)
        try {
            const resp = await AddToCart(values);
            const info = resp?.data?.data
            if (info) {
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
                            <img src={selectedImage} alt="iphone11" className='w-[70%] h-[80%]' />
                        </motion.div>
                        <div className="my-5 flex flex-wrap items-center gap-2">
                            <motion.img
                                src={product.imageUrl ? product.imageUrl : '/images/iphon11-small.png'}
                                alt="iphone"
                                onClick={() => { changeImage(product.imageUrl) }}
                                whileHover={{ scale: 1.1 }}
                                className="w-24 h-24"
                                transition={{ duration: 0.3 }}
                            />
                            {additionalImage.map((image, index) => (
                                <motion.img
                                    key={index}
                                    src={image || "/images/iphon-yellow.png"}
                                    alt="yellow"
                                    onClick={() => { changeImage(image) }}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-24 h-24"
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
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
                                <button onClick={() => router.push('/comapare-product')} className='flex text-blue-500 font-semibold items-center gap-4'>Compare <IoIosArrowForward /> </button>
                            </motion.p>
                        </div>

                        <div className='flex mt-5 items-center'>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span><RiStarSFill className='text-blue-800' /></span>
                            <span className='text-[14px] font-medium font-inter ml-4 text-[#344054]'>{product.__v} Sold</span>
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
                                Available Colors
                            </motion.h5>
                        </div>

                        {/* <motion.ul
                            className="flex gap-3 items-center border p-5 bg-gray-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {colors?.map((color) => (

                                <li style={{ backgroundColor: color }} className='w-14 h-14 border shadow-md rounded-[47%]'></li>
                            ))}

                            <div className=" w-full flex justify-end rounded-lg text-white">
                                <button onClick={saveId} className='w-[50%] text-blue-700 border border-blue-600 py-4 lg:-py-5 rounded-lg text-sm lg:text-lg'>Swap Product</button>
                            </div>
                        </motion.ul> */}
                        <motion.ul
  className="flex gap-3 items-center border p-5 bg-gray-100"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {colors?.map((color, index) => (
    <li
      key={index}
      onClick={() => setSelectedColor(color)}
      style={{
        backgroundColor: color,
        border: selectedColor === color ? '3px solid #1D4ED8' : '1px solid #ccc',
        opacity: selectedColor === color ? 1 : 0.8,
        cursor: 'pointer'
      }}
      className='w-14 h-14 shadow-md rounded-[47%] transition-all duration-300'
    />
  ))}

  <div className="w-full flex justify-end rounded-lg text-white">
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
                                <p className='font-poppins text-[15px] font-medium'>Only <span className='text-blue-700'>{product.stock} Items Left!</span> Don’t miss it</p>
                                <img src="/images/view.png" alt="view" />
                            </motion.div>
                        </div>

                        <div className='w-full flex flex-col lg:flex-row gap-3 mt-5 '>
                            <button onClick={handleCart} className='w-full bg-blue-600 text-white py-4 lg:py-0 rounded-lg text-lg'>View Cart</button>
                            <button onClick={handleAddToCart}  disabled={!selectedColor} className='w-full text-blue-700 border border-blue-600 py-4 lg:-py-5 rounded-lg text-lg'>Add to Cart</button>
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
                    <div className="grid lg:grid-cols-3 justify-start sm:grid-cols-2 gap-y-8 mt-5">
    {selecttedPrd
        .filter((product) =>
            product?.category?.name?.includes('Phones') || 
            product?.category?.name?.toLowerCase().includes('solar')
        )
        .map((product) => (
            <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='mx-2'
            >
                <Link to={`/product-details/${product._id}`}>
                <div className='w-full flex justify-center lg:justify-start'>
                    <img src={product.additionalImages[0] || '/images/default-img.png'} alt={product._id || 'Product'} className='w-[95%] md:h-[300px]' />
                </div>
                <div className='lg:w-[80%] w-[100%] flex justify-between md:w-[70%]'>
                    <p className='font-poppins font-medium text-[#101928] text-lg'>{product.name}</p>
                    <p className='font-poppins font-[450] text-[#101928] text-xl'>₦{product.price?.$numberDecimal}</p>
                </div>
                <div className="truncate-text">
                    <p className="font-poppins w-[100%] lg:w-[80%] font-normal text-[14px] text-[#101928] line-clamp-2">
                        {product.description}
                    </p>
                </div>
                <motion.button
                    className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span><IoCartOutline className='text-[#475367]' /></span>
                    <p className='text-[14px] text-[#475367] font-poppins font-semibold'>
                        Add to Cart
                    </p>
                </motion.button>
                </Link>
            </motion.div>
        ))}
</div>


                </section>
                <Toaster />
            </div>
        </BuyersLayout>
    )
}

export default ProductDetails;


