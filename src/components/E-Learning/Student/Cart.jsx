import React, { useEffect, useState } from 'react';
import { CiPlay1 } from "react-icons/ci";
import { BsPatchQuestion } from "react-icons/bs";
import { RiBookLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../../api/Endpoint';
import { Loader } from '../../../AuthContext/Loader';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CloseCircle } from 'iconsax-react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { MdDeleteOutline } from "react-icons/md";




const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  let [isOpen, setIsOpen] = useState(false);

  function open(courseId) {
    setSelectedCourseId(courseId);
    setIsOpen(true);
  }

  function close() {
    setSelectedCourseId(null);
    setIsOpen(false);
  }


  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/student/course/${courseId}`);
  };

  const cartVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const getCartCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.get(endpoints.getCartCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart(response.data.data)
    } catch (error) {
      toast.error('An error occured while fetching cart')
    }
  }

  const removeCourseFromCart = async (e, courseId) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.delete(endpoints.removeCourseFromCart(courseId), {
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success('Course successfully removed from cart')
      getCartCourses()
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false);
      close()
    }
  }

  // Calculate cart summary
  const calculateSummary = () => {
    const summary = cart.reduce((acc, item) => {
      const originalPrice = parseFloat(item.course_id.price) || 0;
      const discountPrice = parseFloat(item.course_id.discount_price) || originalPrice;

      return {
        originalTotal: acc.originalTotal + originalPrice,
        discountTotal: acc.discountTotal + discountPrice
      };
    }, { originalTotal: 0, discountTotal: 0 });

    return {
      originalPrice: summary.originalTotal.toFixed(2),
      discountTotal: summary.discountTotal.toFixed(2),
      savings: (summary.originalTotal - summary.discountTotal).toFixed(2)
    };
  };

  const summary = calculateSummary();


  useEffect(() => {
    getCartCourses()
  }, []);



  if (!cart) return <div><Loader /></div>;
  return (
    <>
      <Toaster />
      <section className="relative">
        <div className="bg-white w-full flex items-center justify-between py-5 md:px-10 px-5">
          <div className="w-full flex items-center justify-start">
            <img src="/images/logo.svg" alt="logo" className="h-14" />
          </div>
          <p className="w-full text-center">Cart</p>
          <button
            type="button"
            onClick={() => {
              navigate("/e-learning/student/dashboard");
            }}
            className="w-full text-right flex items-center justify-end"
          >
            <span className="md:hidden">
              <CloseCircle />
            </span>
            <span className="md:block hidden">Exit</span>
          </button>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 lg:px-20 px-5">
          <div className="lg:col-span-3">
            <div className="bg-white my-20 md:py-10 py-3 md:px-12 px-3 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Cart</h3>
                <p className="text-sm">Total Items: {cart.length}</p>
              </div>
              <div className="mt-5">
                {cart.map((course, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={cartVariant}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-md rounded-lg my-3 p-3 flex flex-col group cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <img src={course.course_id.thumbnailUrl ? course.course_id.thumbnailUrl : '/images/course-img.png'} alt="course" className="md:h-32 h-20 md:w-32 w-20 rounded-lg" />
                        <div className="ml-5">
                          <p className="font-bold md:text-lg text-base lg:w-[24rem] md:w-[20rem]">{course.course_id.title}</p>
                          <div className="flex space-x-2 mt-5 text-xs">
                            <div className="flex items-center space-x-1">
                              <span className='md:block hidden'><CiPlay1 /></span>
                              <span>{course.course_id.duration} hours</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className='md:block hidden'><RiBookLine /></span>
                              <span>{course.course_id.sections.length} sections</span>
                            </div>
                            <div className="flex md:flex-auto flex-1 items-center space-x-1">
                              <span className='md:block hidden'><BsPatchQuestion /></span>
                              <span>{course.course_id.sections.length} quizzess</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="md:text-lg text-base font-bold mb-4">
                          {course.course_id.discount_price ? (
                            <>
                              <span>${course.course_id.discount_price}</span>
                              <span className="line-through text-red-500 ml-2">${course.course_id.price}</span>
                            </>
                          ) : (
                            <span>${course.course_id.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <button
                        type='button'
                        onClick={() => open(course._id)}
                        className='text-red-500 flex items-center space-x-2 uppercase md:text-sm text-xs'
                      >
                        <MdDeleteOutline size={24} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className='bg-white shadow-lg rounded-lg p-6 my-20'>
              <h4 className="font-bold text-2xl">Summary</h4>
              <div className='space-y-3'>
                <div className="flex items-center justify-between mt-4">
                  <span>Original Price</span>
                  <span>${summary.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pb-3">
                  <span>Discount Price</span>
                  <span>-${summary.savings}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between mt-4 font-bold pb-4">
                  <span>Total</span>
                  <span>${summary.discountTotal}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-black/50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                Remove from cart
              </DialogTitle>
              <p className="mt-2 text-sm/6">
                Do you really want to remove this item from cart?
              </p>
              <div className="mt-4 flex items-center justify-between gap-5">
                <Button
                  disabled={isLoading}
                  className={`w-full text-primary py-2 rounded-lg border border-primary ${isLoading ? "bg-primary/50 cursor-not-allowed" : ""}`}
                  onClick={(e) => {
                    removeCourseFromCart(e, selectedCourseId);
                  }}
                >
                  {isLoading ? <div className="loader"></div> : "Remove"}

                </Button>
                <Button
                  className="w-full bg-primary text-white py-2 rounded-lg border border-primary"
                  onClick={close}
                >
                  Keep in cart
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Cart;