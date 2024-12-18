import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axiosInstance from '../../../AuthContext/axiosInstance';
import useBills from '../../../hooks/useBills';


const PurchaseElectricity = ({ active, handleNext, formik }) => {
    const [variations, setVariations] = useState({});
    const [info, setInfo] = useState([])
    const { UserDetails } = useBills();

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

    const Providers = [
        { value: 'abuja-electric', label: 'ABUJA-ELECTRIC' },
        { value: 'ikeja-electric', label: 'IKEJA-ELECTRIC' },
        { value: 'eko-electric', label: 'EK0-ELECTRIC' },
        { value: 'ibadan-electric', label: 'IBADAN-ELECTRIC' },
        { value: 'jos-electric', label: 'JOS-ELECTRIC' },
        { value: 'kaduna-electric', label: 'KADUNA-ELECTRIC' },
        { value: 'kano-electric', label: 'KANO-ELECTRIC' },
        { value: 'portharcourt-electric', label: 'PORTHACOURT-ELECTRIC' }
    ]
    const Plans = [
        { value: 'prepaid', label: 'PREPAID' },
    ]

    const fetchVariations = async () => {
        try {
            const response = await axiosInstance.get('/get-variations-vtu');
            if (response.data.success) {
                const variationData = response.data.data[0];
                setVariations(variationData);
            }
        } catch (error) {
            console.error('Error fetching variations:', error);
        }
    };


    useEffect(() => {
        fetchVariations();
    }, []);

    const validateFields = () => {
        const { values } = formik;
        const { phone, meter_number, service_id, variation_id, amount } = values;

        if (service_id && meter_number && amount && phone && variation_id) {
            handleNext();
        } else {
            formik.setFieldTouched('service_id', true);
            formik.setFieldTouched('amount', true);
            formik.setFieldTouched('phone', true);
            formik.setFieldTouched('meter_number', true);
            formik.setFieldTouched('variation_number', true);
        }
    };

    return (
        <div>
            <main className='pb-[30px]' >
                <div className='w-[100vw] md:-mt-12 flex justify-center lg:-ml-[-10vw] xl:-mt-[14vh]'>
                    <div className=' lg:h-[830px] w-[95%] md:mt-[8vh] md:w-[500px] lg:w-[650px]  bg-[#FFFFFF] pb-4 shadow-md rounded-xl overflow-hidden'>
                        <h4 className='flex justify-center text-xl leading-5 font-poppins font-[700] my-4 text-[#212121]'>Pay Electricity Bills</h4>
                        <h4 className='text-lg leading-5 font-poppins text-[#000000] font-[550] mx-1'>Most recent</h4>
                        <article className='h-[105px] w-[230px] mx-3'>
                            <article className='h-[105px] w-[230px] mx-3'>
                                {Array.isArray(info) && info.length > 0 ? (
                                    info.filter(user => user.title === 'Electricity').length > 0 ? (
                                        info.filter(user => user.title === 'Electricity') 
                                            .map((user) => (
                                                <section key={user.code} className="flex flex-row gap-6 my-4">
                                                    <div className="flex flex-col gap-2">
                                                        <img
                                                            src={
                                                                user.body === 'kano-electric' ? './images/kedco.svg' :
                                                                    user.body === 'abuja-electric' ? './images/abuja-electric.jpeg' :
                                                                        user.body === 'eko-electric' ? './images/eko-electric.jpeg' :
                                                                            user.body === 'ibadan-electric' ? './images/ibadan-electric.jpep' :
                                                                            user.body === 'ikeja-electric' ? './images/ikeja-electric.png' :
                                                                            user.body === 'jos-electric' ? './images/jos-electric.jpeg' :
                                                                            user.body === 'kaduna-electric' ? './images/kaduna.jpeg' :
                                                                            user.body === 'portharcourt-electric' ? './images/port.jpeg' :
                                                                                './images/nepa.jpeg'
                                                            }
                                                            className="w-[60px] h-[60px] ml-4"
                                                            alt={user.title}
                                                        />
                                                        <span className="text-[13px] ml-5 font-medium font-poppins leading-5">{user.title}</span>
                                                        <span className="text-[13px] ml-1 font-medium font-poppins leading-5">{user.code}</span>
                                                    </div>
                                                </section>
                                            ))
                                    ) : (
                                        <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase...</div> 
                                    )
                                ) : (
                                    <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase</div> 
                                )}
                            </article>

                        </article>
                        <form className='w-[100%] mx-2 overflow-y-auto mt-16'>
                            <label htmlFor="service_id" className='text-[#101928] text-[14px] font-[800] -pb-8'>Service Provider</label>
                            <Select
                                id="service_id"
                                name="service_id"
                                options={Providers}
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
                                placeholder="Provider"
                                className='mb-5'
                                onChange={(option) => {
                                    formik.setFieldValue('service_id', option.value);
                                }}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height: '56px',
                                        width: '95%',
                                        fontWeight: '800',
                                        padding: '5px',
                                    }),

                                }}
                            />

                            <label htmlFor="variation_id" className='text-[#101928] text-[14px] font-[800] -pb-8'>Subscription Plans</label>
                            <Select
                                id="variation_id"
                                name="variation_id"
                                options={Plans}
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
                                placeholder="Plans"
                                className='mb-5'
                                onChange={(option) => {
                                    formik.setFieldValue('variation_id', option.value);
                                }}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height: '56px',
                                        width: '95%',
                                        fontWeight: '800',
                                        padding: '5px',
                                    }),
                                }}
                            />

                            <label htmlFor="meter_number" className='text-[#101928] text-[14px] font-extrabold -pb-8'>Meter Number</label>
                            <input
                                id="meter_number"
                                placeholder='Meter Number'
                                type='text'
                                name='meter_number'
                                autoComplete='off'
                                className='h-[55px] w-[95%] border-2 rounded-lg font-semibold text-[16px] pl-2 mb-5'
                                {...formik.getFieldProps('meter_number')}
                            />
                            {formik.touched.meter_number && formik.errors.meter_number && (
                                <div className="text-red-500">{formik.errors.meter_number}</div>
                            )}

                            <label htmlFor="amount" className='text-[#101928] text-[14px] font-bold -pb-8'>Amount</label>
                            <input
                                id="amount"
                                placeholder='Amount'
                                type='tel'
                                name='amount'
                                autoComplete='off'
                                className='border-2 h-[56px] w-[95%] font-bold rounded-lg text-[16px] pl-2 mb-5'
                                {...formik.getFieldProps('amount')}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                                <div className="text-red-500">{formik.errors.amount}</div>
                            )}

                            <label htmlFor="phone" className='text-[#101928] text-[14px] font-extrabold -pb-8'>Phone</label>
                            <input
                                id="outlined-required-3"
                                placeholder='Phone Number'
                                type='tel'
                                name='phone'
                                autoComplete='off'
                                className='border-2 h-[56px] w-[95%] font-bold rounded-lg text-[16px] pl-2 mb-5'
                                {...formik.getFieldProps('phone')}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className="text-red-500">{formik.errors.phone}</div>
                            )}
                            <div className='flex justify-center w-[100%] -mx-3'>
                                <button type='button' onClick={validateFields} className="h-[46px] w-[90%] font-poppins my-4 rounded-lg bg-blue-500 text-white">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PurchaseElectricity
