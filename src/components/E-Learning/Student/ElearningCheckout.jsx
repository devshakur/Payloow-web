import React, { useEffect, useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from 'axios';
import { endpoints } from '../../../api/Endpoint';
import WalletPayment from './WalletPayment';
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from '../../../Routes/router';
import useBills from '../../../hooks/useBills';
import { useLocation, useNavigate } from "react-router-dom";
import useInvestment from '../../../hooks/useInvetment';


const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const ElearningCheckout = () => {
  const [cart, setCart] = useState([])
  const [isDirectPurchase, setIsDirectPurchase] = useState(false);
  const [coupon, setCoupon] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [walletBalance, setWalletBalance] = useState();
 const {GetUserBalance} = useBills();
 const {ValidateCoupon} = useInvestment();
 const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const courseId = queryParams.get("courseId");

  const navigate = useNavigate()




  
   
  

  

const fetchCartOrSingleCourse = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("auth"))?.auth;

    // 1. Try getting cart items
    const response = await axios.get(endpoints.getCartCourses, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data?.cart?.length > 0) {
      setCart(response.data.cart);
      setIsDirectPurchase(false); // it's a cart purchase
    } else if (courseId) {
      // 2. No cart items, check for single course
      const allCoursesResp = await axios.get(endpoints.getAllStdCourses, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const courseList = allCoursesResp.data?.courses || [];
      const matchedCourse = courseList.find((course) => course._id === courseId);

      if (matchedCourse) {
        setCart([{ course_id: matchedCourse }]); // mimic cart structure
        setIsDirectPurchase(true); // this is a direct course purchase
      } else {
        toast.error("Course not found.");
      }
    } else {
      toast.error("No course selected.");
    }
  } catch (error) {
    console.error("Error fetching cart or course:", error);
    toast.error("Failed to load checkout data.");
  }
};



  const deleteCartItems = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.auth;
      await axios.delete(endpoints.clearCartCourses, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Failed to clear cart after purchase");
    }
  };

const WalletPurchase = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = JSON.parse(localStorage.getItem("auth"))?.auth;
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    let response;

    if (isDirectPurchase && courseId) {
      // Purchase single course directly
      response = await axios.post(
        endpoints.purchaseCourse(courseId),
        { paymentType: "wallet" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else if (cart?.length > 0) {
      // Purchase cart
      response = await axios.post(
        endpoints.purchaseCourseInCart,
        { paymentType: "wallet" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      toast.error("No course selected to purchase.");
      return;
    }

   const data = response?.data;

if (
  data?.success || 
  data?.message === "Purchase successful" || 
  data?.message === "Enrolled in courses"
) {
  toast.success("Purchase successful");
  setTimeout(() => {
    navigate("/e-learning/student/all-courses");
  }, 1000);

  if (!isDirectPurchase && cart?.length > 0) {
    // {later logic}
  }
} else {
  toast.error(data?.message || "Unexpected server response");
}
  } catch (error) {
    const errorMsg = error?.response?.data?.error || error?.message;
    toast.error(errorMsg || "Something went wrong");
     setTimeout(() => {
        navigate("/e-learning/student/all-courses");
      }, 1000);
  } finally {
    setLoading(false);
  }
};






 

   // Calculate cart summary
   const calculateSummary = () => {
    const summary = cart?.reduce((acc, item) => {
      const originalPrice = parseFloat(item.course_id.price) || 0;
      const discountPrice = parseFloat(item.course_id.discount_price) || originalPrice;
     
      return {
        originalTotal: acc.originalTotal + originalPrice,
        discountTotal: acc.discountTotal + discountPrice,
      
      };
    }, { originalTotal: 0, discountTotal: 0,  });

    return {
      originalPrice: summary?.originalTotal?.toFixed(2),
      discountTotal: summary?.discountTotal?.toFixed(2),
      savings: (summary?.originalTotal - summary?.discountTotal).toFixed(2)
    };
  };

   const applyCoupon = async () => {
    try {
      const Coupon = {
        code: coupon,
      };

      const resp = await ValidateCoupon(Coupon);
      const info = resp?.data?.data;
      if (info) {
        toast.success('Correct');
      } else {
        toast.error('Invalid Coupon');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || 'Invalid Coupon';
      toast.error(errorMsg);
    }
  };

  const summary = calculateSummary();

  useEffect(() => {
  fetchCartOrSingleCourse();

  const fetchWalletBalance = async () => {
    try {
      const resp = await GetUserBalance();
      const balanceString = resp?.data?.data?.balance?.["$numberDecimal"];
      if (balanceString !== undefined) {
        const balanceNumber = Number(balanceString);
        setWalletBalance(balanceNumber);
      } else {
        toast.error("Unable to retrieve wallet balance.");
      }
    } catch (error) {
      toast.error("Failed to fetch wallet balance");
    }
  };

  fetchWalletBalance();
}, [courseId]);

const formattedBalance =
    typeof walletBalance === "number"
      ? new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(walletBalance)
      : "₦0.00";


  return (
    <div>
      <header className='flex justify-between items-center mx-8 mt-8 border-b-4'>
        <div className="flex shrink-0 items-center">
          <img
            alt="Paylow Logo"
            src="/images/logo.svg"
            className="h-14 w-auto"
          />
        </div>
        <div className='font-medium text-lg text-[#000]'>
          Cart
        </div>
        <div className='mt-2'>
          <button 
  className='cursor-pointer font-poppins font-medium text-2xl text-blue-600'
  onClick={() => router.push('/e-learning/student/all-courses')}
>
  Exit
</button>

        </div>
      </header>
      {cart?.length === 0 ?
    <div className="flex items-center justify-center h-96">
    <p className="text-lg">No item in cart</p>
  </div>  
   :
   cart?.map((course, index)=>(
    <main key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:gap-8 p-5">
    <div className='flex flex-col gap-3 xl:grid grid-cols-2'>
      <div className="bg-white shadow-lg p-4 h-[19rem] lg:h-[17rem] rounded-lg ">
        <div className="flex gap-4">
          <h3>Order Summary </h3>
          <div className='w-6 h-7 bg-blue-700 rounded-[50%] flex justify-center items-center text-white'><p>0</p></div>
        </div>
        <div className='md:flex md:justify-between md:items-center'>
          <div className="flex items-center mt-3">
            <img  src={course.course_id.thumbnailUrl ? course.course_id.thumbnailUrl : '/images/course-img.png'} alt="course"  className="md:h-32 h-20 md:w-32 w-1/2 lg:w-full rounded-lg"/>
            <div className="">
              <p className='font-medium text-lg font-plus-jakarta mx-5'>{course.course_id.title}</p>
            </div>
          </div>
          <div className="font-plus-jakarta text-lg font-medium text-[#000]">${course.course_id.price}</div>
        </div>
        <div className="flex gap-2 my-4">
          <input
            type="text"
            className='w-[70%] border border-gray-200 pl-2 py-2 rounded-lg'
            placeholder='Coupon here'
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button onClick={applyCoupon} className='bg-blue-700 text-white py-2 rounded-lg w-[30%]'>Apply Coupon</button>
        </div>
      </div>
    </div>

    <div className='bg-white shadow-lg mt-5 md:mt-0'>
      <h3 className='p-3 font-medium text-lg'>Summary</h3>
      <div className='flex justify-between p-3'>
        <p className='font-poppins text-[14px] font-normal text-[#000]'>Original Price</p>
        <p className='font-poppins text-[14px] font-normal text-[#000]'>${summary.originalPrice}</p>
      </div>
      <div className="border-t px-5 border-dashed border-gray-500 w-full"></div>
      <div className='flex justify-between p-3'>
        <p className='font-poppins text-lg font-medium text-[#000]'>Total:</p>
        <p className='font-poppins text-lg font-medium text-[#000]'>${summary.discountTotal}</p>
      </div>
      <ul className='p-4'>
        <h3 className='text-lg font-plus-jakarta font-medium text-[#000]'>Pay</h3>
        <div className="flex gap-3 pt-4">
          <li
            className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-lg border border-gray-300 focus:bg-blue-700"
          >
            <button
              className='w-[70%] h-[70%] rounded-full  bg-primary'
            ></button>
          </li>
          <p className='font-medium text-[#000] font-poppins text-[14px]'>Full Payment</p>
        </div>
        {/* <div className="flex gap-3 pt-4">
          <li
            className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-lg border border-gray-300 focus:bg-blue-700"
          >
            <button
              className='w-[70%] h-[70%] rounded-full  bg-white'
            ></button>
          </li>
          <p className='font-medium text-[#000] font-poppins text-[14px]'>Pay on Installment</p>
        </div> */}
      </ul>
      <div className="p-4">
        <h3 className='font-plus-jakarta font-medium text-lg'>Payment Method</h3>
        <div>
          <ul className='p-3  gap-3 w-full '>
            <li className={`w-full flex justify-center py-4 rounded-md pl-12 text-[#000] items-center bg-[#F8F9FC] cursor-pointer`}>
              Wallet Option
            </li>
          </ul>
       
            <WalletPayment Submit={WalletPurchase} loading={loading} balance={formattedBalance} />
        </div>
      </div>
    </div>
  </main>
   ))
    }
    <Toaster />
  </div>
  );
};

export default ElearningCheckout

