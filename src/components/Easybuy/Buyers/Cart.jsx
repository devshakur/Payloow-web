import React, { useEffect, useState } from 'react';
import BuyersLayout from '../EasyBuyRegistration/BuyersLayout';
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { useRouter } from '../../../Routes/router';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import useInvestment from '../../../hooks/useInvetment';
import useAuth from '../../../hooks/useAuth';

const Cart = () => {
  const router = useRouter();
  const { GetCart, DeleteCart } = useInvestment()
  const { isLoggedIn, user } = useAuth();
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [productId, setProductId] = useState(null);
 

  const DeleteCartItem = async (_id) => {
    try {
      const resp = await DeleteCart({ productId: _id });
      const info = resp?.data;
      if (info?.success) {
        toast.success(info?.message || 'Items removed from cart');
      } else {
        toast.error('Failed to remove Items from Cart');
      }
    } catch (error) {
      toast.error('Failed to remove Items from Cart');
    }
  };

  const handleDelete = (_id) => {
    setProductId(_id);
    DeleteCartItem(_id);
  };

 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const resp = await GetCart();
        const info = resp?.data?.data;
        if (info) {
          setCartItems(info);
          const initialQuantities = info.reduce((acc, item) => {
            acc[item._id] = item.quantity;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        }
      } catch (error) {
        toast.error('Failed to fetch Cart Items');
      }
    };

    fetchCartItems();
  }, [isLoggedIn]);

  return (
    <BuyersLayout>
      <div className="container mx-auto py-8">
        <header className="text-2xl font-semibold text-center mb-6">
          My Cart
        </header>

        {cartItems && cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-2 gap-8">
            {/* Cart Items Section */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  className="flex flex-col lg:flex-row items-center bg-white p-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="w-full lg:w-1/2">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={item.product?.imageUrl || '/images/iphon11-small.png'}
                      alt={item.product?.name}
                    />
                  </div>
                  <div className="ml-4 lg:ml-8 flex-1">
                    <h4 className="text-lg font-medium">{item.product?.name}</h4>
                    <p className="font-medium text-lg text-black mt-2">
                      {item.product?.price.$numberDecimal}
                    </p>
                    {/* <p className="text-sm text-gray-600 mt-1">
                      Color: <span>{item.color}</span>
                    </p> */}
                    <div className="flex gap-2"> 
                    <h5 className='font-plus-jakarta text-lg font-semibold text-gray-700'>Qty:</h5>
                    <p className="text-lg font-plus-jakarta font-bold text-gray-600">{quantities[item._id] || 1}</p></div>
                    {/* <div className="flex items-center gap-4 mt-3">
                      <button onClick={() => handleDecrease(item._id)} className="text-blue-700">
                        <AiOutlineMinus className="w-5 h-5" />
                      </button>
                      <p className="text-lg font-bold">{quantities[item._id] || 1}</p>
                      <button onClick={() => handleIncrease(item._id)} className="text-blue-700">
                        <GoPlus className="w-5 h-5" />
                      </button>
                    </div> */}
                    <button
                      onClick={() => handleDelete(item.product?._id)}
                      className="text-red-500 mt-3"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Checkout Summary Section */}
            <div className="bg-white h-[18rem] p-6 rounded-lg shadow-md mt-6 lg:mt-0">
              <h3 className="text-xl font-semibold mb-4">Checkout Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{cartItems.reduce((total, item) => total + item.product?.price.$numberDecimal * quantities[item._id], 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>
                    {cartItems.reduce((total, item) => total + item.product?.price.$numberDecimal * quantities[item._id], 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <motion.div
                className="my-6 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={() => router.push('/product-view')}
                  className="w-[55%] py-3 bg-blue-800 text-sm text-md text-white rounded-lg"
                >
                  Proceed to Checkout
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-lg font-medium text-gray-700">No Items in Cart</p>
          </div>
        )}
        <Toaster />
      </div>
    </BuyersLayout>
  );
};

export default Cart;
