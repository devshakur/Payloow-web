import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axiosInstance from '../../../AuthContext/axiosInstance';
import useBills from '../../../hooks/useBills';

const DataBundles = ({ handleNext, formik, selectedPlan, setSelectedPlan }) => {

    const [showAll, setShowAll] = useState(false);
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

    const handleShowMore = () => {
        setShowAll(true); // Show all variations when clicked
    };
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
                        <h4 className='text-lg leading-5 font-poppins text-[#000000] font-[550] mx-1'>Most recent</h4>
                        <article className='flex gap-3 mx-2'>
                            {Array.isArray(info) && info.length > 0 ? (
                                info.filter(user => user.title === 'Data') // Filter without slice
                                    .map((user) => (
                                        <section key={user.code} className="flex flex-row gap-6 my-4">
                                            <div className="flex flex-col gap-2">
                                                <img
                                                    src={
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

                        <form className='mx-4 overflow-y-auto my-6 flex flex-col gap-3'>
                            <label htmlFor="package" className='text-[#484c52] text-[14px] font-[800]'>Package</label>
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
                                {(showAll ? variations[selectedNetwork] : variations[selectedNetwork]?.slice(0, 3))?.map(variation => (
                                    <div
                                        key={variation._id}
                                        className={`w-[30%] h-auto flex justify-center leading-6 items-center p-2 border font-semibold text-[12px] rounded-2xl cursor-pointer ${selectedPlan === variation.plan ? 'bg-blue-100' : 'bg-[#DBE7FE]'}`}
                                        onClick={() => handlePlanSelect(variation.plan)}
                                    >
                                        <div className='relative -top-6 left-12 text-[15px] text-gray-800'>{variation.price}</div> <br />
                                        {variation.plan}
                                    </div>
                                ))}
                                {!showAll && variations[selectedNetwork]?.length > 3 && (
                                    <div
                                        className='w-[30%] h-auto flex justify-center leading-6 items-center p-2 border font-semibold text-[12px] rounded-2xl bg-[#DBE7FE] cursor-pointer'
                                        onClick={handleShowMore} // Handle click to show more variations
                                    >
                                        <span>...show more</span>
                                    </div>
                                )}
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
                                    className='border-2 h-[56px] font-semibold w-[100%] rounded-lg text-[18px] pl-2'
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
                                    className='border-2 h-[56px] font-semibold w-[100%] rounded-lg text-[16px] pl-2 mb-5'
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


