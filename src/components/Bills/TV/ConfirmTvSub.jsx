import React, {useState} from 'react'
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from '../../../hooks/useBills';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmTvSub = ({ handleThirdPage, formik, setActive }) => {
    const [ispin, setIspin] = useState('')
    const [buttonDisabled, setbuttonDisabled] = useState(true)
    const [loading, setLoading] = useState(false); 
    const { BuyTvSubscription, ConfirmPin } = useBills();

    const { phone, service_id, smartcard_number, variation_id, pin } = formik.values;

    const handleBuySub = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
                const data = { phone, service_id, smartcard_number, variation_id, pin };
                const pinValue = {pin}
                console.log(pinValue);
                const pinResponse = await ConfirmPin(pinValue);   
                if (pinResponse?.data.success) {
                    const response = await BuyTvSubscription(data);
                    console.log(response);
                    if (response?.data.success) {
                        setActive('page3')
        
                    }else {
                        toast.error('Invalid PIN. Please try again.');
                    }
                }else {

                } 
          
            } catch (error) {
                toast.error('error Occurred during Purchase:', error);
                setTimeout(() => {
                    setActive('page4');
                }, 6000);
            } finally{
                setLoading(false)
            }
        }



    const headStyles = 'font-normal text-sm font-poppins leading-5 text-[#1D2433CC]';
    return (
        <div>
            <div className='grid  h-[-80vh] lg:-mt-12 items-center'>
                <div className='flex justify-center lg:-ml-[-20vw] xl:justify-center 2xl:ml-[-10vw]'>
                    <div className='w-full mx-4 h-[550px] md:w-[430px] lg:h-[490px] lg:w-[600px] 2xl:w-[700px] bg-[#FFFFFF] pb-[20px]  shadow-md rounded-lg'>
                        <h4 className='flex justify-center text-lg leading-7 font-poppins font-bold my-4 text-[#000000]'>Confirm TV Subscription</h4>
                        <h6 className='flex justify-center font-medium text-[16px] text-[#1D2433] font-poppins leading-5 -mt-3'>{variation_id}</h6>
                        <section className='h-[97px] w-[95%]  mx-2 mt-9'>
                            <div className='flex'>
                                <h6 className='text-sm w-[83%] font-poppins font-[400] text-[#1D2433CC]'>TV subscription</h6>
                                <div className='w-[70%] flex justify-end gap-3 ml-6'>
                                    <img src="./images/dstv.png" className='w-9 h-6' alt="" />
                                    <p className={`${headStyles} mt-1 mr-2`}>{service_id}</p></div>
                            </div>
                            <div className='flex justify-between my-1'>
                                <p className={`${headStyles}`}>Subscription Plan</p>
                                <p className={`${headStyles}`}>{variation_id}</p>
                            </div>
                            <div className=' flex justify-between'>
                                <p className={`${headStyles}`}>Amount</p>
                                <p className={`${headStyles} ml-2`}>₦600</p>
                            </div>
                            <div className='flex justify-between my-1'>
                                <p className={`${headStyles}`}>Smartcard Number</p>
                                <p className={`${headStyles}`}>{smartcard_number}</p>
                            </div>
                            <div className='flex justify-center'>
                                <p className='w-[90%] border-2 mt-6 border-dashed'></p>
                            </div>
                            <div className='my-5'>
                                <div className='h-[70px] w-[95%] flex justify-between items-center'>
                                    <div className='flex mx-1 gap-1'>
                                        <div className='bg-[#F1F3F9] rounded-[50%] p-4'>
                                            <Wallet size="24" color="#1D2433CC" />
                                        </div>
                                        <p className='mt-5 font-poppins font-normal text-sm leading-5'>Wallet (₦2000)</p>
                                    </div>
                                    <div className='mt-1 flex items-center gap-1'>
                                        <p className='font-poppins font-normal text-[#1E3DD7] text-sm leading-5'>Fund wallet</p>
                                        <ArrowRight2 size="18" color="#1E3DD7" />
                                    </div>
                                </div>
                            </div>
                            <form className='mx-3 flex flex-col' onSubmit={handleBuySub}>
                                <label htmlFor="pin" className='text-[#101928] text-[12px] font-semibold -pb-8'>Pin</label>
                                <input
                                    id="outlined-required-5"
                                    placeholder='Enter pin'
                                    type='text'
                                    name='pin'
                                    autoComplete='off'
                                    {...formik.getFieldProps('pin')}
                                    className='border h-[50px] w-[95%] rounded-lg text-[12px] pl-2'
                                />

                                <div className='flex justify-center w-[100%] my-5'>
                                <button type='submit' className='h-[46px] w-[95%] font-poppins my-3 rounded-lg bg-blue-500 text-white'>
                                   {loading ? 'Loading...' : 'Confirm & pay'}
                                </button>
                                </div>

                            </form>
                            
                        <ToastContainer position='top-center' autoClose={5000} className='w-[100%]' />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmTvSub
