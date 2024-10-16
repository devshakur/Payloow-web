import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axiosInstance from '../../../AuthContext/axiosInstance';

const DataBundles = ({ handleNext, formik, selectedPlan, setSelectedPlan }) => {
    const Providers = [
        { value: 'Airtel', label: 'Airtel' },
        { value: 'MTN', label: 'MTN' },
        { value: 'Glo', label: 'Glo' },
        { value: 'etisalat', label: 'etisalat' },
    ];

    const [variations, setVariations] = useState({});
    const [selectedNetwork, setSelectedNetwork] = useState('');
   

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        const networkVariations = variations[selectedNetwork];
        const selectedVariation = networkVariations.find(variation => variation.plan === plan);
        if (selectedVariation) {
            // Set Formik fields
            formik.setFieldValue('amount', selectedVariation.price);
            formik.setFieldValue('variation_id', selectedVariation.variationID); 
            formik.setFieldValue('network_id', selectedNetwork);
        }
    };

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
        const { network_id, amount, phone } = values;

        // Check if all required fields are filled
        if (network_id && amount && phone) {
            handleNext(); 
        } else {
            formik.setFieldTouched('network_id', true);
            formik.setFieldTouched('amount', true);
            formik.setFieldTouched('phone', true);
            formik.setFieldTouched('variation_id', true);
        }
    };

    return (
        <div>
                     <main className='pb-[30px]'>
                         <div className='w-screen md:-mt-12 flex justify-center lg:-ml-[-10vw]  xl:justify-center'>
                             <div className='h-auto w-[95%] md:w-[500px] lg:w-[650px] bg-[#FFFFFF] pb-4 shadow-md rounded-xl'>
                                 <h4 className='flex justify-center text-xl leading-5 font-poppins font-[600] my-4 text-[#212121]'>Buy Data Bundles</h4>
                                 <article className='mx-3 py-2'>
                                     <h4 className='text-lg leading-5 font-poppins text-[#000000] font-[550] mx-1'>Most recent</h4>
                                     <section className='flex flex-row gap-6 my-4'>
                                         <div className='flex flex-col gap-2'>
                                             <img src="./images/airtel.jpg" className='w-[40px] h-[40px] ml-4' alt="mtn" />
                                            <span className='text-[14px] text-[#141e31] font-normal font-poppins leading-5'>2.5GB For 2da..</span>
                                             <span className='text-[13px] ml-1 text-[#081123] font-medium font-poppins'>07083175021</span>
                                        </div>
                                    </section>
                                </article>
                        <form className='mx-4 overflow-y-auto flex flex-col gap-3'>
                            <label htmlFor="package" className='text-[#101928] text-[14px] font-[800]'>Package</label>
                            <Select
                                id="package"
                                name="package"
                                options={Providers}
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
                                onChange={(option) => {
                                    setSelectedNetwork(option.value);
                                    setSelectedPlan('');
                                    formik.setFieldValue('network_id', option.value); 
                                }}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height: '56px',
                                        fontWeight: '800',
                                        padding: '5px',
                                    }),
                                }}
                            />
                            <div className='w-[90%] flex-wrap mx-4 flex flex-row gap-4 pt-1'>
                                {variations[selectedNetwork]?.map(variation => (
                                    <div
                                        key={variation._id}
                                        className={`w-[30%] h-auto flex justify-center leading-6 items-center p-2 border font-semibold text-[12px] rounded-2xl cursor-pointer ${selectedPlan === variation.plan ? 'bg-blue-100' : 'bg-[#DBE7FE]'}`}
                                        onClick={() => handlePlanSelect(variation.plan)}
                                    >
                                        {variation.price}
                                        {variation.plan.replace(/.*?(\d+GB\s*–\s*\d+\s*Days).*/, '$1')}
                                    </div>
                                ))}
                            </div>
                            <div className='w-[100%]'>
                                <label htmlFor="amount" className='text-[#101928] text-[12px] font-semibold'>Amount</label>
                                <input
                                    id="amount"
                                    placeholder='Amount'
                                    type='text'
                                    name='amount'
                                    {...formik.getFieldProps('amount')} 
                                    autoComplete='off'
                                    className='border-2 h-[56px] w-[100%] rounded-lg text-[16px] pl-2'
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="text-red-500">{formik.errors.amount}</div>
                                )}
                            </div>
                            <div className=''>
                             <label htmlFor="phone" className='text-[#101928]  text-[12px] font-semibold -pb-8'>Phone Number</label>
                             <input
                                 id="outlined-required-3"
                                 placeholder='Phone Number'
                                 type='tel'
                                 name='phone'
                                 autoComplete='off'
                                 {...formik.getFieldProps('phone')} 
                                 className='border-2 h-[56px] w-[100%] rounded-lg text-[16px] pl-2 mb-5'
                             />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="text-red-500">{formik.errors.amount}</div>
                                )}
                             </div>
                            <div className='flex justify-center w-[95%] mx-3'>
                                <button type='button' onClick={validateFields} className="h-[45px] w-[100%] font-poppins my-4 rounded-lg bg-blue-500 text-white">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DataBundles;


