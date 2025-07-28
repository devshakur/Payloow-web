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
import { EasyBuyEndpoints, } from '../../../../api/Endpoint';
import PlansModal from './PlansModal';
import tinycolor from 'tinycolor2';
import useBills from '../../../../hooks/useBills';



const Checkout = () => {
  const { ValidateCoupon, GetCart, GetDeliveryInfo, checkOut, DeleteEasyBuyCart, SubmitInstallmentPlanRequest, } = useInvestment();
  
    
   
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const [cartItems, setCartItems] = useState([])
 
  const [coupon, setCoupon] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [walletLoading, setWalletLoading] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [checkOuts, setCheckOuts] = useState(false)
  const [price, setPrice] = useState(null)
  const [editMode, setEditMode] = useState(false);
  const [editableProduct, setEditableProduct] = useState({});
  const [installmentPlan, setInstallmentPlan] = useState('');
 const [planPreview, setPlanPreview] = useState(null);
const [showPlansModal, setShowPlansModal] = useState(false);
const [numberOfInstallments, setNumberOfInstallments] = useState('');


  const [selectedColors, setSelectedColors] = useState({})
  let [isOpen, setIsOpen] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  let [active, setActive] = useState('one')
  const [fullPayment, setFullPayment] = useState('')

  const handleClick = () => {
    setIsClicked(prevState => !prevState);
    setFullPayment('full')
  };
 
  const handleClickTwo = () => {
    setIsClickedTwo(prevState => !prevState);
    setFullPayment('installment')
  };
  const handleSelection = (formType) => {
    setSelectedForm(formType);

  };

  const handleActive = () => {
    setActive('two')
    setIsOpen(false)
  }
  const handleModal = () => {
    setIsOpen(true)
  }
  const handleModalWallet = () => {
    setIsOpened(true)
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

  const handleExit = () => {
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

  const deleteCartItems = async () => {
    try {
      const resp = await DeleteEasyBuyCart()
      const info = resp?.data
      if (info) {
        toast.success('Cart Items deleted')
      }
    } catch (error) {
      toast.error('Failed to delete CartItems', error)
    }

  }


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
    setWalletLoading(true)
    try {
      const method = {
        paymentMethod: selectedForm,
        installmentPlan: installmentPlan
      };
        const resp = await checkOut(fullPayment === 'full' ? {paymentMethod: method.paymentMethod} : method);
      const info = resp?.data?.data;
      if (resp) {
        setCheckOuts(true);
        toast.success('Approved Purchase Method');
        deleteCartItems()
        router.push('/buyers/dashboard')
        localStorage.removeItem(('selectedColors'))
        setTimeout(() => {
          router.reload()
        }, 3000);
        setWalletLoading(false)
      } else {
        toast.success('Approved Purchase Method');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg;
      toast.error(errorMsg);
    } finally {
      setWalletLoading(false)
    }
  };
 

  // STEP 1: Show preview modal first
const handleProceed = async () => {
  if (!installmentPlan || !numberOfInstallments) {
    alert("Please select a valid plan.");
    return;
  }
  setLoading(true)
  try {
    const result = await SubmitInstallmentPlanRequest({
      totalAmount: price, 
      installmentPlan,
      numberOfInstallments,
    });

    setPlanPreview(result.data.data);  
    setShowPlansModal(true); 
          
  } catch (err) {
    console.error("❌ Failed to fetch installment breakdown:", err.response?.data || err);
    toast.error("Failed to fetch installment breakdown");
  } finally{
  setLoading(false)
  }
};


const SubmitCheckOutFlutter = async () => {
  setShowPlansModal(false); 
  setLoading(true);

  try {
    const payload = fullPayment === 'full'
      ? { paymentMethod: selectedForm }
      : {
          paymentMethod: selectedForm,
          installmentPlan,
          numberOfInstallments: parseInt(numberOfInstallments), // ✅ now works
        };

    const resp = await checkOut(payload);
    const checkoutUrl = resp?.data?.data?.result?.checkout_url;

    if (checkoutUrl) {
      toast.success("Redirecting to Paystack...");
      window.location.href = checkoutUrl;
    } else {
      toast.error("No checkout URL received");
    }
  } catch (error) {
    const errorMsg = error?.response?.data?.msg || "Checkout failed";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  const handleBackToCart = () => {
    router.back()
  }
  useEffect(() => {
    // Retrieve the selected colors from localStorage when the component mounts
    const colors = JSON.parse(localStorage.getItem('selectedColors')) || {};
    setSelectedColors(colors);
   
    
  }, []);

   

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
        <div onClick={handleBackToCart} className='font-medium text-lg text-[#000] cursor-pointer'>
          Cart
        </div>
        <div className='mt-2'>
          <button onClick={handleExit} className='cursor-pointer font-plus-jakarta font-medium text-xl text-blue-600'>Exit</button>
        </div>
      </header>
      <main className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:gap-8 p-5">
        <div className='flex flex-col gap-3'>
        <div className="bg-white shadow-lg p-4 h-max w-auto flex-wrap gap-5 flex items-end rounded-lg ">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id}>
                <div className="flex gap-2 my-1">
                  <h3>Order Summary </h3>
                  <div className='w-6 h-7 bg-blue-700 rounded-[50%] flex justify-center items-center text-white'><p>{item?.quantity}</p></div>
                </div>
                <div className=''>
                  <div className="flex items-center">
                    <img src={item?.product?.imageUrl || "/images/iphon-yellow.png"} alt={item?.name} />
                    <div className="">
                      <p className='font-semibold text-lg font-plus-jakarta'>{item?.product?.name}</p>
                     <div className="flex items-center gap-2">
      <p className="font-normal text-[#475367] text-[12px] font-inter">
        Color: <span className="capitalize">{item.color}</span>
      </p>
      <div
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{
          backgroundColor: tinycolor(item.color).isValid()
            ? tinycolor(item.color).toHexString()
            : "#ccc",
        }}
      ></div>
    </div>
                    </div>
                  </div>
                  <div className="font-plus-jakarta text-xl font-medium text-[#1D2433] my-2">₦{new Intl.NumberFormat().format(item?.product?.price?.$numberDecimal || 0)} or ₦{new Intl.NumberFormat().format(((item?.product?.price?.$numberDecimal || 0) / 6).toFixed(0))}/Month</div>

                </div>
             
                </div>
                

            ))
          ) : (
            <div></div>
          )}
     
             <div className="flex self-end mt-auto gap-2">
                  <input
                    type="text"
                    className='w-[100%] shadow-lg border-b-4 border-gray-200 p-3 focus:outline-none  rounded-lg'
                    placeholder='Coupon here'
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button onClick={CheckCoupon} className='bg-blue-700 text-white shadow-md h-10 mt-2 rounded-lg w-[80%]'>Apply Coupon</button>
                </div>
          </div>
          {products.map((product, index) => (
        <div
          key={index}
          className="hidden lg:block bg-[#DBE7FE] mt-5 p-3 w-[100%] shadow-xl"
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
        </div>
        {cartItems && cartItems.length > 0 ? (
  <div className='bg-white shadow-lg mt-5 md:mt-0'>
    <h3 className='p-3 font-medium text-lg'>Summary</h3>

    <div className='flex justify-between p-3'>
      <p className='font-poppins text-[14px] font-normal text-[#000]'>Original Price</p>
      <p className='font-poppins text-[14px] font-normal text-[#000]'>₦{new Intl.NumberFormat().format(price)}</p>
    </div>

    <div className="border-t px-5 border-dashed border-gray-500 w-full"></div>

    <div className='flex justify-between p-3'>
      <p className='font-plus-jakarta text-lg font-medium text-[#000]'>Total:</p>
      <p className='font-plus-jakarta text-lg font-medium text-[#000]'>₦{new Intl.NumberFormat().format(price)}</p>
    </div>

    <ul className='p-4'>
      <h3 className='text-lg font-plus-jakarta font-medium text-[#000]'>Pay</h3>

      <div className="flex gap-3 pt-4">
        <li
          className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-lg border border-gray-300"
          onClick={handleClick}
        >
          <button
            className={`w-[70%] h-[70%] rounded-full ${fullPayment === 'full' ? 'bg-blue-700' : 'bg-white'}`}
          ></button>
        </li>
        <p className='font-medium text-[#000] font-poppins text-[14px]'>Full Payment</p>
      </div>

      <div className="flex gap-3 pt-4">
        <li
          className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-lg border border-gray-300"
          onClick={handleClickTwo}
        >
          <button
            className={`w-[70%] h-[70%] rounded-full ${fullPayment === 'installment' ? 'bg-blue-700' : 'bg-white'}`}
          ></button>
        </li>
        <p className='font-medium text-[#000] font-poppins text-[14px]'>Pay on Installment</p>
      </div>
    </ul>

    <div className="p-4">
      <h3 className='font-plus-jakarta font-medium text-lg'>Payment Method</h3>

      <ul className='p-3 flex gap-3 w-full'>
        {/* Wallet Option */}
        <li
          className={`w-[50%] py-4 rounded-md pl-12 font-plus-jakarta text-[#000] flex justify-between items-center 
            ${selectedForm === 'wallet' ? 'bg-blue-100 text-blue-700' : 'bg-[#F8F9FC]'} 
            ${fullPayment === 'installment' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          onClick={() => {
            if (fullPayment !== 'installment') {
              handleSelection('wallet');
            }
          }}
        >
          Wallet
          <span className='mr-4 w-3 h-3'>
            <img src="/images/checkout.png" alt="checkout" />
          </span>
        </li>

        {/* Flutterwave Option */}
        <li
          className={`w-[50%] py-4 rounded-md pl-12 text-[#000] flex justify-between items-center 
            ${selectedForm === 'paystack' ? 'bg-blue-100 text-blue-700' : 'bg-[#F8F9FC]'} 
            cursor-pointer`}
          onClick={() => handleSelection('paystack')}
        >
          PayStack
          <span className='mr-4 w-3 h-3'>
            <img src="/images/checkout.png" alt="checkout" />
          </span>
        </li>
      </ul>

      {fullPayment === 'installment' && (
        <p className="text-red-500 text-sm px-4">Installment payment is only available via PayStack.</p>
      )}

      {/* Show wallet checkout only if full payment and wallet selected */}
      {selectedForm === 'wallet' && fullPayment === 'full' && (
        <WalletPurchase
          handleModalWallet={handleModalWallet}
          walletLoading={walletLoading}
          fullPayment={fullPayment}
          SubmitCheckOutWallet={SubmitCheckOutWallet}
        />
      )}
    </div>

    {/* Flutterwave Checkout */}
    {selectedForm === 'paystack' && (
      <CardPurchase
        handleModal={handleModal}
        fullPayment={fullPayment}
        SubmitCheckOutFlutter={SubmitCheckOutFlutter}
        loading={loading}
      />
    )}
  </div>
) : null}


      </main>
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-[#DBE7FE] w-[93%] lg:hidden md:w-[95%] mb-6 mx-4 p-3 shadow-xl"
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
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none"
              />
              <div className="mt-3 px-3 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ImLocation2 className="text-blue-600" />
                  <input
                    type="text"
                    name="address"
                    value={editableProduct.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none"
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
      {isOpened && <CheckoutModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        // handleActive={handleActive}
       installmentPlan={installmentPlan}
        handlePlanChange={handlePlanChange}
        SubmitCheckOutWallet={SubmitCheckOutWallet}
        walletLoading={walletLoading} />}

        {isOpen && (
<CheckOutModalCrad
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  installmentPlan={installmentPlan}
  setInstallmentPlan={setInstallmentPlan}
  numberOfInstallments={numberOfInstallments} // ✅
  setNumberOfInstallments={setNumberOfInstallments} // ✅
  handleProceed={handleProceed}
  loading={loading}
/>


)}
{showPlansModal && (
  <PlansModal
    isOpen={showPlansModal}
    setIsOpen={setShowPlansModal}
    planDetails={planPreview}      // The full data object from API
    onProceed={SubmitCheckOutFlutter}
    loading={loading}   // Final Paystack submission
  />
)}


      {active === 'two' && <CheckoutSuccessModal />}
      <Toaster />
    </div>

  )
}

export default Checkout

