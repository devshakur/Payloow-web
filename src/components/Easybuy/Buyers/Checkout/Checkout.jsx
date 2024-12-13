import React, { useState } from 'react'
import { Wallet, ArrowRight2 } from "iconsax-react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { ImLocation2 } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import CheckoutModal from './CheckoutModal';
import CheckoutSuccessModal from './CheckoutSuccessModal';


const Checkout = () => {
    const [selectedForm, setSelectedForm] = useState('wallet');
    const [isClicked, setIsClicked] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
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
    
      const handleActive = ()=>{
        setActive('two')
        setIsOpen(false)
      }
      const handleModal = (e)=>{
       e.preventDefault()
       setIsOpen(true)
      }
     
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
                    <p className='font-poppins font-medium text-2xl text-blue-600'>Exit</p>
                </div>
            </header>
            <main className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:gap-8 p-5">
                <div className="bg-white shadow-lg h-[17rem]  p-4">
                    <div className="flex gap-3">
                        <h3>Order Summary </h3>
                        <div className='w-6 h-7 bg-blue-700 rounded-[50%] flex justify-center items-center text-white'><p>1</p></div>
                    </div>
                    <div className='md:flex md:justify-between md:items-center'>
                        <div className="flex items-center">
                            <img src="/images/iphon-yellow.png" alt="iphone" />
                            <div className="">
                                <p className='font-semibold text-lg font-poppins'>Iphone 11</p>
                                <p className='font-normal text-[#475367] text-[12px] font-inter'>Color: <span>Yellow</span></p>
                            </div>
                        </div>
                        <div className="font-poppins text-lg font-semibold text-[#000]">₦300,000 or ₦50,000/Month</div>

                    </div>
                    <div className="flex gap-2">
                        <input type="text" className='w-[70%] border border-gray-200 pl-2 py-2 rounded-lg' placeholder='Coupon here' />
                        <button className='bg-blue-700 text-white py-2 rounded-lg w-[30%]'>Apply Coupon</button>
                    </div>
                </div>
               
                <div className='bg-white shadow-lg mt-5 md:mt-0'>
                    <h3 className='p-3 font-medium text-lg'>Summary</h3>
                    <div className='flex justify-between p-3'>
                        <p className='font-poppins text-[14px] font-normal text-[#000]'>Original Price</p>
                        <p className='font-poppins text-[14px] font-normal text-[#000]'>₦89,900</p>
                    </div>
                    <div className="border-t px-5 border-dashed border-gray-500 w-full"></div>
                    <div className='flex justify-between p-3'>
                        <p className='font-poppins text-lg font-medium text-[#000]'>Total:</p>
                        <p className='font-poppins text-lg font-medium text-[#000]'>₦89,900</p>
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
              className={`w-[50%] py-4 rounded-md pl-12 text-[#000] flex justify-between items-center ${selectedForm === 'Debit/Credit Card' ? 'bg-blue-100 text-blue-700' : 'bg-[#F8F9FC]'} cursor-pointer`}
              onClick={() => handleSelection('Debit/Credit Card')}
            >
             Debit/Credit Card <span className='mr-4 w-3 h-3'><img src="/images/checkout.png" alt="checkout" /></span>
            </li>
          </ul>
           {selectedForm === 'wallet' && (
          <div className="">
             <div className="my-3">
              <div className="h-[70px] w-[95%] flex justify-between items-center">
                <div className="flex mx-1 gap-1">
                  <div className="bg-[#F1F3F9] rounded-[50%] p-4">
                    <Wallet size="24" color="#1D2433CC" />
                  </div>
                  <p className="mt-5 font-poppins font-normal text-sm leading-5">
                    Wallet (₦44,5000)
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <p className="font-poppins font-normal text-[#1E3DD7] text-sm leading-5">
                    Fund wallet
                  </p>
                  <ArrowRight2 size="18" color="#1E3DD7" />
                </div>
              </div>
            </div>
            <div>
                <p className='font-poppins font-medium text-lg text-[#1D2433]'>Your payment is secure. We use industry-standard SSL encryption to protect your personal information.</p>
            </div>
            <div className="flex gap-2 mt-4">
                <input type="checkbox" name="check" id="check" />
                <p className='font-poppins font-medium text-lg text-[#000]'>I have read and agree to the website terms and conditions *</p>
            </div>
            <div className='w-full flex justify-center my-5'>
                <button  onClick={handleModal} className='w-[90%] bg-blue-700 py-2 rounded-md text-white'>Complete Checkout</button>
            </div>
          </div>

           )}
                        </div>
                    </div>
                    {selectedForm === 'Debit/Credit Card' && (
                        <form action="" className="w-full p-3 flex flex-col gap-3">
                            <div className="w-[97%] flex flex-col">
                                <label htmlFor="name" className='font-medium pb-2 font-plus-jakarta text-lg'>Cardholder Name</label>
                                <input type="text" placeholder='card name' className='pl-2 border border-gray-300 py-2 rounded-md focus:outline-none' />
                            </div>
                            <div className="w-[97%] flex flex-col">
                                <label htmlFor="number" className='font-medium  font-plus-jakarta text-lg'>Card Number</label>
                                <input type="text" placeholder='card number' className='pl-2 border focus:outline-none border-gray-300 py-2 rounded-md'/>
                                <img src="/images/MasterCard.png" alt="master-card" className='w-7 h-7 text-red-300 relative -top-8 left-[90%]' /> 
                            </div>
                            <div className='md:flex md:justify-between w-full md:gap-5'>
                                <div className="flex flex-col w-full">
                            <label htmlFor="expiry" className='font-medium pb-2 font-plus-jakarta text-lg'>Expiry Date</label>
                            <input type="text" placeholder='expiry-date' className='pl-2 border focus:outline-none border-gray-300 py-2 rounded-md' />
                            </div>
                            <div className="flex flex-col w-full">
                            <label htmlFor="name" className='font-medium pb-2 font-plus-jakarta text-lg'>CVC</label>
                            <input type="password" placeholder='***' className='pl-2 border focus:outline-none border-gray-300 py-2 rounded-md' />
                            </div>
                            </div>
                            <div>
                <p className='font-poppins font-medium text-lg text-[#1D2433]'>Your payment is secure. We use industry-standard SSL encryption to protect your personal information.</p>
            </div>
            <div className="flex gap-2 mt-4">
                <input type="checkbox" name="check" id="check" />
                <p className='font-poppins font-medium text-lg text-[#000]'>I have read and agree to the website terms and conditions *</p>
            </div>
            <div className='w-full flex justify-center my-5'>
                <button  onClick={handleModal} className='w-[90%] bg-blue-700 py-2 rounded-md text-white'>Complete Checkout</button>
            </div>
                        </form>
                    )}
                </div>
            </main>
            <div className="bg-[#DBE7FE] w-full mx-2 pb-8 md:w-[44%] lg:w-[54%] xl:w-[64%] rounded-lg md:absolute md:-top-[-26rem] lg:-top-[-27rem] md:left-1 lg:left-3 shadow-lg">
                <header className='flex justify-between p-3'>
                    <h3 className='font-plus-jakarta font-semibold text-[24px] text-[#1D2433]'>Delivery Information</h3>
                    <div className='flex items-center gap-1 font-poppins font-semibold text-blue-500 text-[16px]'>Edit <HiOutlinePencilSquare /></div>
                </header>
                <div className='mt-5 px-3'>
                    <h3 className='font-poppins font-semibold text-[#1D2433] text-lg'>Mayowa Sunusi</h3>
                </div>
                <div className="mt-3 px-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                    <ImLocation2 className='text-blue-600' />
                    <p className='font-poppins text-[16px] font-normal text-[#1D2433]'>No. 36 Ahmadu Bello Way, Kano State Libarary</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <FaPhone className='text-blue-600' />
                    <p className='font-poppins text-[16px] font-normal text-[#1D2433]'>07083175021</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <MdOutlineMailOutline className='text-blue-600' />
                    <p className='font-poppins text-[16px] font-normal text-[#1D2433]'>mayowasunusi@gmail.com</p>
                    </div>
                </div>
            </div>
            {isOpen && <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} handleActive={handleActive}/>}
                {active === 'two' && <CheckoutSuccessModal />}
        </div>
    )
}

export default Checkout
