import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useBills from '../../../hooks/useBills';



const Airtime = ({ handleNext, formik }) => {
    const [info, setInfo] = useState([])
    const { UserDetails, } = useBills();

    const getUser = async () => {
        try {
            const details = await UserDetails();
            const userDetails = details.data.data.previousReference;
            setInfo(userDetails);
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    const Networks = [
        { value: 'MTN', label: 'MTN' },
        { value: 'AIRTEL', label: 'Airtel' },
        { value: 'GLO', label: 'Glo' },
        { value: '9MOBILE', label: '9Mobile' }
    ];
    const amounts = ['₦100', '₦200', '₦500', '₦1000'];

    const handlePick = (value) => {
        formik.setFieldValue('amount', value);
    };

    const validateFields = () => {
        const { values } = formik;
        const { network, amount, phone } = values;


        if (network && amount && phone) {
            handleNext();
        } else {
            formik.setFieldTouched('network', true);
            formik.setFieldTouched('amount', true);
            formik.setFieldTouched('phone', true);
        }
    };

    return (
        <div>
            <main className='pb-[40px]'>
                <div className='w-[100vw] xl:-mt-24 flex justify-center lg:-ml-[-10vw] xl:justify-center'>
                    <div className='mx-4 bg-[#FFFFFF] pb-4 shadow-md rounded-sm overflow-hidden'>
                        <h4 className='flex justify-center text-xl leading-5 font-plus-jakarta font-bold my-4'>Buy Airtime</h4>
                        <h4 className='text-lg  leading-5 font-plus-jakarta text-[#000000] font-[550] mx-3 md:mx-8'>Most recent</h4>
                        <article className='flex gap-3 mx-3 md:mx-8'>
                            {Array.isArray(info) && info.length > 0 ? (         
                                info.slice(-2).map((user) => (
                                    <section key={user.code} className="flex flex-row gap-6 my-4">
                                        <div className="flex flex-col gap-2">
                                            <img src={
                                                user.body === 'airtel' ? './images/airtel.jpg' :
                                                    user.body === 'mtn' ? './images/mtn.jpg' :
                                                        user.body === 'glo' ? './images/glos.png' :
                                                            user.body === 'etisalat' ? './images/img4.jpg' :
                                                                './images/default.jpg' 
                                            }
                                                className="w-[40px] h-[40px] ml-4"
                                                alt={user.title}

                                                 />
                                                   <span className="text-[13px] ml-5 font-medium font-poppins leading-5">{user.title}</span>
                                            <span className="text-[13px] ml-1 font-medium font-poppins leading-5">{user.code}</span>
                                        </div>
                                    </section>

                                ))
                            ) : (
                                <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase</div>
                            )}
                        </article>
                        <form className='w-[95%] mt-5 mx-2 md:mx-8 overflow-y-auto'>
                            <label htmlFor="network_id" className='text-[#101928] text-[14px] font-plus-jakarta font-medium mb-2'>Choose Network<span className='text-red-700'>*</span></label>
                            <Select
                                id="network"
                                name="network"
                                options={Networks}
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
                                onChange={(option) => {
                                    formik.setFieldValue('network', option.value);
                                }}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height: '56px',
                                        width: '95%',
                                        fontWeight: '800',
                                        padding: '5px',
                                        marginBottom: '3vh'
                                    }),
                                }}
                            />
                            <div className='flex flex-row gap-2 py-3'>
                                {amounts.map((item, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handlePick(item)}
                                        className='p-4 rounded-lg leading-5 text-[#000000] flex justify-center items-center text-[16px] font-bold bg-blue-100'
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <label htmlFor="amount" className='text-[#101928] text-[14px] font-medium font-plus-jakarta mb-2 mx-2'>Amount<span className='text-red-700'>*</span></label>
                            <input
                                id="outlined-required-2"
                                placeholder='Amount'
                                type='text'
                                name='amount'
                                autoComplete='off'
                                {...formik.getFieldProps('amount')}
                                className='border-2 border-gray-400 focus:outline-none h-[60px] w-[95%] rounded-lg text-[16px] pl-2 mx-2 mb-5'
                            />
                            {formik.touched.amount && formik.errors.amount ? (
                                <div style={{ color: 'red', marginTop: "-10px" }}>{formik.errors.amount}</div>
                            ) : null}

                            <label htmlFor="phone" className='text-[#101928] text-[14px] font-medium font-plus-jakarta mb-2 mx-2'>Phone Number <span className='text-red-700'>*</span></label>
                            <input
                                id="outlined-required-3"
                                placeholder='PhoneNumber'
                                type='tel'
                                name='phone'
                                autoComplete='off'
                                {...formik.getFieldProps('phone')}
                                className='border-2 border-gray-400 focus:outline-none h-[60px] w-[95%] rounded-lg text-[14px] pl-2 mb-5 mx-2'
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div style={{ color: 'red', marginTop: "-12px" }}>{formik.errors.phone}</div>
                            ) : null}
                             <div className="flex justify-center">
                            <button
                                type="button"
                                className='w-[35%] p-2 bg-blue-600 text-white font-bold rounded-lg mt-4'
                                onClick={validateFields}
                            >
                                Buy Airtime
                            </button>

                             </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Airtime;












