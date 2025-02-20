import React, { useState, useEffect } from 'react'
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from '../../../hooks/useBills';
import { Toaster, toast } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';


const Confirm = ({ active, setActive, formik, selectedPlan }) => {
    const [ispin, setIspin] = useState('')
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [buttonDisabled, setbuttonDisabled] = useState(true)
    const [balance, setBalance] = useState(0)
    const [userBalance, setUserBalance] = useState(0)
    const { BuyData, UserBalance, ConfirmPin } = useBills();


    const { phone, network_id, amount, variation_id, pin } = formik.values;

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await UserBalance();
            const fetchedBalance = response.data.data.data.balance;
            setUserBalance(fetchedBalance);  
        };

        fetchBalance();
    }, []);  

    const handleBuy = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { phone, network_id: network_id.toLowerCase(), amount: amount.replace('₦', '').replace(',', ''), variation_id, pin };
        try {
            const response = await UserBalance()
            const balance = response.data.data.data.balance
            setBalance(balance)
            const amountValue = parseFloat(data.amount)
            if (balance >= amountValue) {
                const pinValue = { pin }
                const pinResponse = await ConfirmPin(pinValue);
                if (pinResponse?.data.success) {
                    const response = await BuyData(data);
                    if (response?.data.success) {
                        setActive('page3')

                    } else {
                        toast.error('Data purchase failed. Please try again.');
                        setLoading(false);
                        setTimeout(() => {
                            setActive('page4');
                        }, 2000);
                    }
                }

            } else if (balance <= amountValue) {
                toast.error('Insufficient amount kindly fund your wallet')
                setLoading(false);
                
            }
        } catch (error) {
            toast.error('Invalid PIN. Please try again.')
            setLoading(false);
        }
    };
    const switchImage = () => {
        if (network_id === "MTN") {
            setImage("./images/mtn.jpg");
        } else if (network_id === "Airtel") {
            setImage("./images/airtel.jpg");
        } else if (network_id === "Glo") {
            setImage("./images/usedglo.png");
        } else if (network_id === "etisalat") {
            setImage("./images/9mobile.png");
        } else {
            setImage(null);
        }
    };

    useEffect(() => {
        switchImage();
    }, [network_id]);


    return (
        
            <div className='grid lg:-mt-12 items-center '>
                <div className=' w-screen flex justify-center lg:justify-center lg:-ml-[-10vw] 2xl:ml-[8vw]'>
                    <div className='w-full mx-4 h-[550px] md:w-[530px] lg:h-[500px] lg:w-[600px] 2xl:w-[700px] bg-[#FFFFFF] pb-[20px]  shadow-md rounded-md'>
                        <h4 className='flex justify-center text-lg leading-7 font-poppins font-bold my-4 text-[#000000]'>Confirm Data Purchase</h4>
                        <h6 className='flex justify-center font-[500] text-[16px] text-[#1D2433] font-poppins leading-5 -mt-3'>{selectedPlan}</h6>
                        <section className='h-[97px] w-[95%]  mx-2 mt-9'>
                            <div className='flex'>
                                <h6 className='text-sm w-[83%] font-poppins font-[600] text-[#1D2433CC]'>Product Name</h6>
                                <div className='w-[70%] flex justify-end gap-3'>
                                    <img src={image} className='w-6 h-6' alt="" />
                                    <p className='text-sm font-semibold font-poppins leading-5 mt-1 text-[#1D2433CC]'>{network_id}_Bundles</p></div>
                            </div>
                            <div className='flex justify-between my-1'>
                                <p className='text-[#1D2433CC] font-[600]'>Package</p>
                                <p className='font-semibold text-sm font-poppins leading-5 mr-[60px] text-[#1D2433CC]'>{amount}</p>
                            </div>
                            <div className=' flex justify-between'>
                                <p className='text-sm font-poppins leading-5 text-[#1D2433CC] font-[600]'>Beneficiary</p>
                                <p className='font-semibold text-sm font-poppins leading-5 text-[#1D2433CC]'>{phone}</p>
                            </div>
                            <div className='flex justify-center'>
                                <p className='w-[99%] border-2 mt-6 border-dashed'></p>
                            </div>
                            <div className='my-5'>
                                <div className='h-[70px] w-[99%] flex justify-between items-center'>
                                    <div className='flex mx-1 gap-1'>
                                        <div className='bg-[#F1F3F9] shadow-md rounded-[50%] p-4'>
                                            <Wallet size="24" color="#1D2433CC" />
                                        </div>
                                        <p className='mt-5 font-poppins font-normal text-sm leading-5'>Wallet (₦{userBalance || 0})</p>
                                    </div>
                                    <div className='mt-1 flex items-center gap-1'>
                                        <p className='font-poppins font-normal text-[#1E3DD7] text-sm leading-5'>Fund wallet</p>
                                        <ArrowRight2 size="18" color="#1E3DD7" />
                                    </div>
                                </div>
                            </div>
                            <form className='mx-3 flex flex-col' onSubmit={handleBuy}>
                                <label htmlFor="pin" className='text-[#101928] font-plus-jakarta text-[16px] font-semibold -pb-8'>Enter Your Pin<span className='text-red-700'>*</span></label>
                                <input
                                    id="outlined-required-5"
                                    placeholder='Enter pin'
                                    type='password'
                                    name='pin'
                                    required
                                    autoComplete='off'
                                    {...formik.getFieldProps('pin')}
                                    className='border h-[56px] w-[95%] rounded-lg shadow-md text-[16px] pl-2 focus:outline-none'
                                />

                                <div className='flex justify-center w-[100%] my-5'>
                                    <button type='submit' className='h-[46px] w-[55%] font-poppins my-3 rounded-lg bg-blue-500 text-white'>
                                        {loading ? 'Processing...' : 'Confirm & pay'}
                                    </button>
                                </div>

                            </form>
                            <Toaster />
                        </section>
                    </div>
                </div>
            </div>
        
    )
}

export default Confirm
