import React, { useState, useEffect, startTransition } from 'react';
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from '../../../hooks/useBills';
import { Toaster, toast } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

const ConfirmElectricity = ({ setActive, setResponseData, formik }) => {
    const [loading, setLoading] = useState(false);
    const [balances, setBalances] = useState(0)
    const headStyles = 'font-normal text-sm font-poppins leading-5 text-[#1D2433CC]';
    const { BuyElectricity, UserBalance, ConfirmPin } = useBills();


const {
  meter_number,
  service_id,
  variation_id,
  amount,
  phone,
  TransactionPin,
  customerName,
  customerAddress,
} = formik.values;


const data = {
  meterNumber: meter_number,
  disco: service_id?.toUpperCase(),
  type: variation_id || "PREPAID",
  transactionPin: TransactionPin,
  phone: phone || "",
  MeterType: variation_id || "Prepaid",
  amount: parseFloat(amount),
  customerName: customerName || "",
  customerAddress: customerAddress || "",
};



    useEffect(() => {
        const fetchBalance = async () => {
            const response = await UserBalance();
            const fetchedBalance = response.data.data.balance.$numberDecimal;
            setBalances(fetchedBalance);
        };

        fetchBalance();
    }, []);

  const handleElectricityPurchase = async (e) => {
  e.preventDefault();
  setLoading(true);



  try {
    const response = await BuyElectricity(data);

    if (response?.data?.success) {
        setResponseData(response?.data?.data?.data)
      startTransition(() => {
        setActive("page3");
      });
    } else {
      const msg = response?.data?.data?.message || "Electricity purchase failed.";
      toast.error(msg);
       startTransition(() => {
       setTimeout(() => {
         setActive("page4");
       }, 3000);
      });
    }
  } catch (error) {
    console.error("Purchase error:", error);
    const errorMsg = error?.response?.data?.message || "Something went wrong";
    toast.error(errorMsg);
      startTransition(() => {
       setTimeout(() => {
         setActive("page4");
       }, 3000);
      });
  } finally {
    setLoading(false);
  }
};


    return (
        <div>
            <div className='grid  h-[-80vh] lg:-mt-12 items-center'>
                <div className='w-screen flex justify-center lg:justify-center lg:-ml-[-10vw] 2xl:ml-[8vw]'>
                    <div className='w-full mx-4 h-[520px] md:w-[530px] bg-[#FFFFFF]  shadow-md rounded-lg'>
                        <h4 className='flex justify-center text-lg leading-7 font-plus-jakarta font-bold my-4 text-[#000000]'>Confirm Electricity Subscription</h4>
                        <h6 className='flex justify-center font-bold text-[16px] text-[#1D2433] font-plus-jakarta leading-5 -mt-3'>₦{amount}</h6>
                        <section className='h-[97px] w-[95%]  mx-2 mt-9'>
                            <div className='flex'>
                                <h6 className='text-sm w-[83%] font-poppins font-[400] text-[#1D2433CC]'>Service Provider Name</h6>
                                <div className='w-[70%] flex justify-end gap-3 ml-6'>
                                    <img src={
                                        service_id === 'abuja-electric' ? './images/abuja-electric.jpeg' :
                                            service_id === 'kano-electric' ? './images/kedco.svg' :
                                                service_id === 'eko-electric' ? './images/eko-electric.jpeg' :
                                                    service_id === 'ibadan-electric' ? './images/ibadan-electric.jpeg' :
                                                        service_id === 'ikeja-electric' ? './images/ikeja-electric.png' :
                                                            service_id === 'ibadan-electric' ? './images/ibadan-electric.jpeg' :
                                                                service_id === 'jos-electric' ? './images/jos-electric.jpeg' :
                                                                    service_id === 'kaduna-electric' ? './images/kaduna.jpeg' :
                                                                        service_id === 'portharcourt-electric' ? './images/port.jpeg' :
                                                                            './images/nepa.jpeg'
                                    } className='w-10 h-10' alt="" />
                                    <p className={`${headStyles} mt-1 mr-1`}>{service_id}</p></div>
                            </div>
                            <div className=' flex justify-between'>
                                <p className={`${headStyles}`}>Amount</p>
                                <p className={`${headStyles} ml-2`}>₦{amount}</p>
                            </div>
                            <div className='flex justify-between my-1'>
                                <p className={`${headStyles}`}>Meter Number</p>
                                <p className={`${headStyles}`}>{meter_number}</p>
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
                                        <p className='mt-5 font-poppins font-normal text-sm leading-5'>Wallet (₦{balances || 0})</p>
                                    </div>
                                    <div className='mt-1 flex items-center gap-1'>
                                        <p className='font-poppins font-normal text-[#1E3DD7] text-sm leading-5'>Fund wallet</p>
                                        <ArrowRight2 size="18" color="#1E3DD7" />
                                    </div>
                                </div>
                            </div>
                            <form className='mx-3 flex flex-col' onSubmit={handleElectricityPurchase}>
                                <label htmlFor="pin" className='text-[#101928] text-[14px] font-semibold font-plus-jakarta -pb-8'>   Enter Your Pin<span className='text-red-700'>*</span></label>
                                <input
                                    id="outlined-required-5"
                                    placeholder='Enter pin'
                                    type='password'
                                    name='TransactionPin'
                                    required
                                    autoComplete='off'
                                    {...formik.getFieldProps('TransactionPin')}
                                    className='border-2 h-[50px] w-[95%] shadow-md border-[#D0D5DD] rounded-lg text-[12px] pl-2 focus:outline-none'
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
        </div>
    )
}

export default ConfirmElectricity
