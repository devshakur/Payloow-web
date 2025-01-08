import React, { useState, useEffect } from 'react'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast"
import CheckoutModal from './CheckoutModal';
import CheckoutSuccessModal from './CheckoutSuccessModal';
import useInvestment from '../../../../hooks/useInvetment';
import WalletPurchase from './WalletPurchase';
import CardPurchase from './CardPurchase';
import { useRouter } from '../../../../Routes/router';
import CheckOutModalCrad from './CheckOutModalCrad';


const Checkout = () => {
  const { ValidateCoupon, GetCart, GetDeliveryInfo, checkOut, } = useInvestment();
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState('wallet');
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [coupon, setCoupon] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [checkOuts, setCheckOuts] = useState(false)
 const [price, setPrice] = useState(null)
 const [editMode, setEditMode] = useState(false);
 const [editableProduct, setEditableProduct] = useState({});
 const [installmentPlan, setInstallmentPlan] = useState()
  let [isOpen, setIsOpen] = useState(false)
  let [active, setActive] = useState('one')


  const handleClick = () => {
    setIsClicked(prevState => !prevState);
  };
  const handleClickTwo = () => {
    setIsClickedTwo(prevState => !prevState);
  };
  const handleSelection = (formType) => {
    setSelectedForm(formType);
  };

  const handleActive = () => {
    setActive('two')
    setIsOpen(false)
  }
  const handleModal = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const handlePlanChange = (event) => {
    setInstallmentPlan(event.target.value); // Update state with selected value
};


  const handleEditClick = (product, index) => {
    setEditMode(true);
    setEditableProduct({ ...product, index }); // Attach the index for reference
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct({ ...editableProduct, [name]: value });
  };

  const handleSave = () => {
    const updatedProducts = products.map((product, idx) =>
      idx === editableProduct.index ? { ...editableProduct } : product
    );
  
    setProducts(updatedProducts); // Update the products state
    setEditMode(false); // Exit edit mode
    toast.success("Product updated successfully"); // Provide user feedback
  };
  
  const handleExit = ()=>{
    router.push('/buyers/dashboard')
  }


  //Fetch Cart Items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const resp = await GetCart();
        const info = resp?.data?.data; 
        const price = resp?.data?.data?.product?.price?.$numberDecimal
        if (info) {
          setCartItems(info);
          console.log(price);
          const total = info.reduce((sum, item) => {
            const price = parseFloat(item?.product?.price?.$numberDecimal) || 0;
            return sum + price * (item?.quantity || 1);
          }, 0);
         setPrice(total)
          const initialQuantities = info.reduce((acc, item) => {
            acc[item._id] = item.quantity;
            return acc;
          }, {});
          setQuantities(initialQuantities);

        }
      } catch (error) {
        const errorMsg = error?.response?.data?.msg || 'Failed to fetch Cart Items';
      }
    };

    fetchCartItems();
  }, []);


  //Get User Info
  useEffect(() => {
    const productItems = async () => {
      try {
        const resp = await GetDeliveryInfo();
        const message = resp?.data?.message; // Correctly extract the message
        const productsData = resp?.data?.data; // Extract the data array

        if (resp.status === 200 && productsData?.length > 0) {
          setProducts(productsData);
          toast.success(message || 'Fetched delivery info successfully'); // Use message from response
        } else {
          setProducts([]);
          toast.error('No products found');
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.msg || 'Failed to fetch products';
        toast.error(errorMsg);
      }
    };

    productItems();
  }, []);



  //Validate Coupon
  const CheckCoupon = async () => {
    try {
      const Coupon = {
        code: coupon,
      };

      const resp = await ValidateCoupon(Coupon);
      const info = resp?.data?.data;
      if (info) {
        setCorrect(true);
        toast.success('Correct');
      } else {
        toast.error('Invalid Coupon');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || 'Invalid Coupon';
      toast.error(errorMsg);
    }
  };

  //Submit Checkout
  const SubmitCheckOutWallet = async () => {
    console.log("SubmitCheckOut called"); // Debugging log
    setLoading(true)
    try {
      const method = {
        paymentMethod: selectedForm,
        installmentPlan: installmentPlan
      };
      const resp = await checkOut(method);
      const info = resp?.data?.data;
      if (info) {
        setCheckOuts(true);
        toast.success('Approved Purchase Method');
        setTimeout(() => {
          router.push('/buyers/dashboard')
        }, 3000);
        setLoading(false)
      } else {
        toast.success('Approved Purchase Method');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg;
      toast.error(errorMsg);
    }
  };

  //Submit Checkout
  const SubmitCheckOutFlutter = async () => {
    console.log("SubmitCheckOut called"); // Debugging log
    setLoading(true)
    try {
      const method = {
        paymentMethod: selectedForm,
        installmentPlan: installmentPlan
      };
      const resp = await checkOut(method);
      const info = resp?.data?.data;
      const flutter_url = resp?.data?.data?.result?.checkout_url

      if(flutter_url){
        setCheckOuts(true);
        setLoading(false)
        toast.success('Redirecting to Flutter')
        console.log(flutter_url);
        window.location.href = flutter_url
      }else{
        toast.error('failed to redirect to flutter')
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg;
      toast.error(errorMsg);
    }
  };


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
          <button onClick={handleExit} className='cursor-pointer font-poppins font-medium text-2xl text-blue-600'>Exit</button>
        </div>
      </header>
      <main className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:gap-8 p-5">
        <div className='flex flex-col  gap-3  xl:grid grid-cols-2'>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="bg-white shadow-lg p-4 h-[19rem] lg:h-[17rem] rounded-lg ">
                <div className="flex gap-4">
                  <h3>Order Summary </h3>
                  <div className='w-6 h-7 bg-blue-700 rounded-[50%] flex justify-center items-center text-white'><p>{item?.quantity}</p></div>
                </div>
                <div className='md:flex md:justify-between md:items-center'>
                  <div className="flex items-center">
                    <img src="/images/iphon-yellow.png" alt="iphone" />
                    <div className="">
                      <p className='font-semibold text-lg font-poppins'>{item?.product?.name}</p>
                      <p className='font-normal text-[#475367] text-[12px] font-inter'>Color: <span>Yellow</span></p>
                    </div>
                  </div>
                  <div className="font-poppins text-lg font-medium text-[#000]">₦{item?.product?.price?.$numberDecimal} or ₦{(item?.product?.price?.$numberDecimal / 12)}/Month</div>

                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className='w-[70%] border border-gray-200 pl-2 py-2 rounded-lg'
                    placeholder='Coupon here'
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button onClick={CheckCoupon} className='bg-blue-700 text-white py-2 rounded-lg w-[30%]'>Apply Coupon</button>
                </div>
              </div>

            ))
          ) : (
            <div></div>
          )}
        </div>
        {/* summary          */}
        {cartItems && cartItems.length > 0 ? (
          <div className='bg-white shadow-lg mt-5 md:mt-0'>
          <h3 className='p-3 font-medium text-lg'>Summary</h3>
          <div className='flex justify-between p-3'>
            <p className='font-poppins text-[14px] font-normal text-[#000]'>Original Price</p>
            <p className='font-poppins text-[14px] font-normal text-[#000]'>₦{price}</p>
          </div>
          <div className="border-t px-5 border-dashed border-gray-500 w-full"></div>
          <div className='flex justify-between p-3'>
            <p className='font-poppins text-lg font-medium text-[#000]'>Total:</p>
            <p className='font-poppins text-lg font-medium text-[#000]'>₦{price}</p>
          </div>
          <ul className='p-4'>
            <h3 className='text-lg font-plus-jakarta font-medium text-[#000]'>Pay</h3>
            <div className="flex gap-3 pt-4">
              <li
                className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-lg border border-gray-300 focus:bg-blue-700"
                onClick={handleClick}
              >
                <button
                  className={`w-[70%] h-[70%] rounded-full ${isClicked ? 'bg-blue-700' : 'bg-white'}`}
                ></button>
              </li>
              <p className='font-medium text-[#000] font-poppins text-[14px]'>Full Payment</p>
            </div>
            <div className="flex gap-3 pt-4">
              <li
                className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-lg border border-gray-300 focus:bg-blue-700"
                onClick={handleClickTwo}
              >
                <button
                  className={`w-[70%] h-[70%] rounded-full ${isClickedTwo ? 'bg-blue-700' : 'bg-white'}`}
                ></button>
              </li>
              <p className='font-medium text-[#000] font-poppins text-[14px]'>Pay on Installment</p>
            </div>

          </ul>
          <div className="p-4">
            <h3 className='font-plus-jakarta font-medium text-lg'>Payment Method</h3>
            <div>
              <ul className='p-3 flex gap-3 w-full'>
                <li
                  className={`w-[50%] py-4 rounded-md pl-12 text-[#000] flex justify-between items-center ${selectedForm === 'wallet' ? 'bg-blue-100 text-blue-700' : 'bg-[#F8F9FC]'} cursor-pointer`}
                  onClick={() => handleSelection('wallet')}
                >
                  Wallet <span className='mr-4 w-3 h-3'><img src="/images/checkout.png" alt="checkout" /></span>
                </li>
                <li
                  className={`w-[50%] py-4 rounded-md pl-12 text-[#000] flex justify-between items-center ${selectedForm === 'flutterwave' ? 'bg-blue-100 text-blue-700' : 'bg-[#F8F9FC]'} cursor-pointer`}
                  onClick={() => handleSelection('flutterwave')}
                >
                 FlutterWave<span className='mr-4 w-3 h-3'><img src="/images/checkout.png" alt="checkout" /></span>
                </li>
              </ul>
              {selectedForm === 'wallet' && (
                <WalletPurchase handleModal={handleModal} />
              )}
            </div>
          </div>
          {selectedForm === 'flutterwave' && (
            <CardPurchase handleModal={handleModal} />
          )}
        </div>
        ) : null}
       
      </main>
      {products.map((product, index) => (
  <div
    key={index}
    className="bg-[#DBE7FE] w-full mx-4 pb-8 lg:w-[54%] xl:w-[64%] lg:absolute lg:bottom-3 rounded-lg md:left-1 lg:left-3 shadow-lg p-5 mb-9"
  >
    <header className="flex justify-between p-3">
      <h3 className="font-plus-jakarta font-semibold text-[24px] text-[#1D2433]">
        Delivery Information
      </h3>
      <div
        className="flex items-center gap-1 font-poppins font-semibold text-blue-500 text-[16px] cursor-pointer"
        onClick={() => handleEditClick(product, index)}
      >
        Edit <HiOutlinePencilSquare />
      </div>
    </header>

    {editMode && editableProduct.index === index ? (
      <div className="mt-5 px-3">
        <input
          type="text"
          name="fullName"
          value={editableProduct.fullName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        <div className="mt-3 px-3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ImLocation2 className="text-blue-600" />
            <input
              type="text"
              name="address"
              value={editableProduct.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-blue-600" />
            <input
              type="text"
              name="phoneNumber"
              value={editableProduct.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline className="text-blue-600" />
            <input
              type="text"
              name="email"
              value={editableProduct.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    ) : (
      <div className="mt-5 px-3">
        <h3 className="font-poppins font-semibold text-[#1D2433] text-lg">
          {product.fullName}
        </h3>
        <div className="mt-3 px-3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ImLocation2 className="text-blue-600" />
            <p className="font-poppins text-[16px] font-normal text-[#1D2433]">
              {product.address}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-blue-600" />
            <p className="font-poppins text-[16px] font-normal text-[#1D2433]">
              {product.phoneNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline className="text-blue-600" />
            <p className="font-poppins text-[16px] font-normal text-[#1D2433]">
              {product.email}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
))}     
      {isOpen && <CheckoutModal 
      isOpen={isOpen} 
      setIsOpen={setIsOpen} 
      handleActive={handleActive} 
      installmentPlan={installmentPlan}
      handlePlanChange={handlePlanChange}
      SubmitCheckOutWallet={SubmitCheckOutWallet} 
      loading={loading} />}

{isOpen && <CheckOutModalCrad
      isOpen={isOpen} 
      setIsOpen={setIsOpen} 
      handleActive={handleActive} 
      installmentPlan={installmentPlan}
      handlePlanChange={handlePlanChange}
      SubmitCheckOutFlutter={SubmitCheckOutFlutter} 
      loading={loading} />}
      {active === 'two' && <CheckoutSuccessModal />}
      <Toaster />
    </div>
    
  )
}

export default Checkout

