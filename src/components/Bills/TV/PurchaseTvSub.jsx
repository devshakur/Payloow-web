import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from '../../../AuthContext/axiosInstance';
import useBills from '../../../hooks/useBills';

const PurchaseTvSub = ({ handleNext, formik }) => {
  const [variations, setVariations] = useState({});
  const [selectedProvider, setSelectedProvider] = useState('');
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
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

  const TvPlan = [
    { value: 'DStv', label: 'DSTV' },
  ];

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

  useEffect(() => {
    if (selectedProvider && variations[selectedProvider]) {
      const options = variations[selectedProvider].map((variation) => ({
        value: variation.plan,
        label: variation.plan,
      }));
      setSubscriptionOptions(options);
    } else {
      setSubscriptionOptions([]);
    }
  }, [selectedProvider, variations]);

  const handleProviderChange = (option) => {
    setSelectedProvider(option.value);
    formik.setFieldValue('service_id', option.value); 
  };

  const validateFields = () => {
    const { values } = formik;
    const {  phone, service_id, smartcard_number, variation_id } = values;

    
    if (phone && service_id && smartcard_number && variation_id ) {
        handleNext(); 
    } else {
        formik.setFieldTouched('phone', true);
        formik.setFieldTouched('service_id', true);
        formik.setFieldTouched('smartcard_number', true);
        formik.setFieldTouched('variation_id', true);
    }
};

  return (
    <div>
      <main>
        <div className="w-[100vw] md:-mt-14 flex justify-center lg:-ml-[-10vw] xl:justify-center">
          <div className="h-auto w-[95%] md:w-[400px] lg:w-[650px] bg-[#FFFFFF] pb-4 mx-4 shadow-md rounded-xl lg:p-8">
            <h4 className="flex justify-center text-xl leading-5 font-poppins font-[600] my-4 text-[#212121]">
              Pay Tv Subcription
            </h4>
              <h4 className="text-lg leading-5 font-poppins text-[#000000] font-[550] mx-1">
                Most recent
              </h4>
            <article className="mx-3 my-3">
              <section className="flex flex-row gap-6 my-4">
              {Array.isArray(info) && info.length > 0 ? (
                                    info.filter(user => user.title === 'DStv').length > 0 ? (
                                        info.filter(user => user.title === 'DStv') 
                                            .map((user) => (
                                                <section key={user.code} className="flex flex-row gap-6 my-4">
                                                    <div className="flex flex-col gap-2">
                                                        <img
                                                            src={
                                                                user.body === 'dstv' ? './images/dstv.png' : './images/dstv.png'
                                                                   
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
                                        <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase...</div> 
                                    )
                                ) : (
                                    <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase...</div> 
                                )}
              </section>
            </article>
            <form className="mx-2">
              <div className="">
                <label htmlFor="service_id" className="text-[#101928] text-[12px] font-semibold">
                  Service Provider
                </label>
                <Select
                  id="service_id"
                  name="service_id"
                  options={TvPlan}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  onChange={handleProviderChange} // Use the updated handler directly
                  placeholder="Provider"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: '95%',
                      fontWeight: '700',
                      marginBottom: '10px',
                      padding: '12px',
                    }),
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="variation_id" className="text-[#101928] text-[12px] font-semibold">
                  Subscription Plan
                </label>
                <Select
                  id="variation_id"
                  name="variation_id"
                  options={subscriptionOptions}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  placeholder="Subscription Plan"
                  onChange={(option) => formik.setFieldValue('variation_id', option.value)} // Capture subscription
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: '95%',
                      fontWeight: '700',
                      padding: '12px',
                    }),
                  }}
                />
              </div>

              <label htmlFor="smartcard_number" className="text-[#101928] text-[12px] font-semibold">
                Smartcard Number
              </label>
              <input
                id="smartcard_number"
                placeholder="Card Number"
                type="number"
                name="smartcard_number"
                {...formik.getFieldProps('smartcard_number')}
                autoComplete="off"
                className="border-2 p-5 w-[95%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2"
              />
              {formik.touched.smartcard_number && formik.errors.smartcard_number && (
                <div className="text-red-500">{formik.errors.smartcard_number}</div>
              )}
              <label htmlFor="amount" className='text-[#101928] text-[12px] font-semibold'>Phone</label>
              <input
                id="phone"
                placeholder='Enter Phone Number'
                type='text'
                name='phone'
                {...formik.getFieldProps('phone')}
                autoComplete='off'
                className='border-2 p-5 w-[95%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2'
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500">{formik.errors.phone}</div>
              )}
              <div className='flex justify-center w-[100%] -mx-3'>
                <button type='button' onClick={validateFields} className="p-4 w-[96%] font-poppins my-3 rounded-lg bg-blue-500 text-white">
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

export default PurchaseTvSub;
