// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axiosInstance from '../../../AuthContext/axiosInstance';
// import useBills from '../../../hooks/useBills';
// import { BillsEndpoints } from '../../../api/Endpoint';

// const PurchaseTvSub = ({ handleNext, formik }) => {
//   const [variations, setVariations] = useState({});
//   const [cables, setCables] = useState([])
//   const [plans, setPlans] = useState([])
//   const [selectedProvider, setSelectedProvider] = useState('');
//   const [subscriptionOptions, setSubscriptionOptions] = useState([]);
//   const [info, setInfo] = useState([])
//     const { UserDetails } = useBills();

//     const getUser = async () => {
//         try {
//             const details = await UserDetails();
//             const userDetails = details.data.data.previousReference;
//             setInfo(userDetails);
//         } catch (error) {
//             console.error(error.message)
//         }
//     }
//     useEffect(() => {
//         getUser()
//     }, [])

//   const TvPlan = [
//     { value: 'DStv', label: 'DSTV' },
//   ];

//   const fetchCableVariations = async () => {
//     try {
//       const response = await axiosInstance.get(BillsEndpoints.cableVariation);
//       if (response.data.success) {
//         const variationData = response.data.data;
//         setVariations(variationData);
//       }
//     } catch (error) {
//       console.error('Error fetching variations:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCableVariations();
//   }, []);

//   console.log(variations);
  

//   useEffect(() => {
//     if (selectedProvider && variations[selectedProvider]) {
//       const options = variations[selectedProvider].map((variation) => ({
//         value: variation.plan,
//         label: variation.plan,
//       }));
//       setSubscriptionOptions(options);
//     } else {
//       setSubscriptionOptions([]);
//     }
//   }, [selectedProvider, variations]);

//   const handleProviderChange = (option) => {
//     setSelectedProvider(option.value);
//     formik.setFieldValue('service_id', option.value); 
//   };

//   const validateFields = () => {
//     const { values } = formik;
//     const {  phone, service_id, smartcard_number, variation_id } = values;

    
//     if (phone && service_id && smartcard_number && variation_id ) {
//         handleNext(); 
//     } else {
//         formik.setFieldTouched('phone', true);
//         formik.setFieldTouched('service_id', true);
//         formik.setFieldTouched('smartcard_number', true);
//         formik.setFieldTouched('variation_id', true);
//     }
// };

//   return (
//     <div>
//       <main>
//         <div className="w-[100vw] md:-mt-14 flex justify-center lg:-ml-[-10vw] xl:justify-center">
//           <div className="h-auto w-[95%] md:w-[530px] lg:w-[650px] bg-[#FFFFFF] pb-4 mx-4 shadow-md rounded-xl lg:p-8">
//             <h4 className="flex justify-center text-xl leading-5 font-plus-jakarta font-[600] my-2 text-[#212121]">
//               Pay Tv Subcription
//             </h4>
//               <h4 className="text-lg leading-5 font-plus-jakarta text-[#000000] font-[550] mx-1">
//                 Most recent
//               </h4>
//             <article className="mx-3 my-3">
//               <section className="flex flex-row gap-6 my-4">
//               {Array.isArray(info) && info.length > 0 ? (
//                                     info.filter(user => user.title === 'DStv').length > 0 ? (
//                                         info.filter(user => user.title === 'DStv') 
//                                             .map((user) => (
//                                                 <section key={user.code} className="flex flex-row gap-6 my-4">
//                                                     <div className="flex flex-col gap-2">
//                                                         <img
//                                                             src={
//                                                                 user.body === 'dstv' ? './images/dstv.png' : './images/dstv.png'
                                                                   
//                                                             }
//                                                             className="w-[40px] h-[40px] ml-4"
//                                                             alt={user.title}
//                                                         />
//                                                         <span className="text-[13px] ml-5 font-medium font-poppins leading-5">{user.title}</span>
//                                                         <span className="text-[13px] ml-1 font-medium font-poppins leading-5">{user.code}</span>
//                                                     </div>
//                                                 </section>
//                                             ))
//                                     ) : (
//                                         <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase...</div> 
//                                     )
//                                 ) : (
//                                     <div className='ml-8 my-5 text-lg text-green-500'>No recent Purchase...</div> 
//                                 )}
//               </section>
//             </article>
//             <form className="mx-2">
//               <div className="">
//                 <label htmlFor="service_id" className="text-[#101928] text-[12px] font-semibold">
//                   Service Provider
//                 </label>
//                 <Select
//                   id="service_id"
//                   name="service_id"
//                   options={TvPlan}
//                   getOptionValue={(option) => option.value}
//                   getOptionLabel={(option) => option.label}
//                   onChange={handleProviderChange} // Use the updated handler directly
//                   placeholder="Provider"
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       width: '95%',
//                       fontWeight: '700',
//                       marginBottom: '10px',
//                       padding: '8px',
//                     }),
//                   }}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="variation_id" className="text-[#101928] text-[12px] font-semibold">
//                   Subscription Plan
//                 </label>
//                 <Select
//                   id="variation_id"
//                   name="variation_id"
//                   options={subscriptionOptions}
//                   getOptionValue={(option) => option.value}
//                   getOptionLabel={(option) => option.label}
//                   placeholder="Subscription Plan"
//                   onChange={(option) => formik.setFieldValue('variation_id', option.value)} // Capture subscription
//                   styles={{
//                     control: (provided) => ({
//                       ...provided,
//                       width: '95%',
//                       fontWeight: '700',
//                       padding: '8px',
//                     }),
//                   }}
//                 />
//               </div>

//               <label htmlFor="smartcard_number" className="text-[#101928] text-[12px] font-semibold">
//                 Smartcard Number
//               </label>
//               <input
//                 id="smartcard_number"
//                 placeholder="Card Number"
//                 type="number"
//                 name="smartcard_number"
//                 {...formik.getFieldProps('smartcard_number')}
//                 autoComplete="off"
//                 className="border-2 p-3 shadow w-[95%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2 focus:outline-none"
//               />
//               {formik.touched.smartcard_number && formik.errors.smartcard_number && (
//                 <div className="text-red-500">{formik.errors.smartcard_number}</div>
//               )}
//               <label htmlFor="amount" className='text-[#101928] text-[12px] font-semibold'>Phone</label>
//               <input
//                 id="phone"
//                 placeholder='Enter Phone Number'
//                 type='text'
//                 name='phone'
//                 {...formik.getFieldProps('phone')}
//                 autoComplete='off'
//                 className='border-2 p-3 shadow w-[95%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2 focus:outline-none'
//               />
//               {formik.touched.phone && formik.errors.phone && (
//                 <div className="text-red-500">{formik.errors.phone}</div>
//               )}
//               <div className='flex justify-center w-[100%] -mx-3'>
//                 <button type='button' onClick={validateFields} className="p-4 w-[96%] font-poppins my-3 rounded-lg bg-blue-500 text-white">
//                   Next
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PurchaseTvSub;

import React, { useState, useEffect, startTransition } from 'react';
import Select from 'react-select';
import axiosInstance from '../../../AuthContext/axiosInstance';
import { BillsEndpoints } from '../../../api/Endpoint';
import toast from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

import useBills from '../../../hooks/useBills';


const PurchaseTvSub = ({ formik, handleNext, setCustomerName, customerName }) => {
  const [cables, setCables] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [loading, setLoading] = useState(false);

  const { UserDetails, } = useBills();

 

  const handleProviderChange = (selectedOption) => {
    formik.setFieldValue("service_id", selectedOption.value);
    setSelectedProvider(selectedOption.value);
    formik.setFieldValue("variation_id", '');
  };

  const handleSmartCardBlur = async () => {
    const { smart_card_number, service_id } = formik.values;
    if (!smart_card_number || !service_id) return;

    setIsValidating(true);
    try {
      const res = await axiosInstance.get(BillsEndpoints.validateCableNumber, {
        params: {
          smart_card_number: smart_card_number,
          cablename: service_id,
        },
      });

      const data = res.data?.data;
      if (data?.name) {
        setCustomerName(data.name);
        toast.success("Smartcard validated");
      } else {
        setCustomerName('');
        toast.error(res.data?.message || "Invalid smartcard number");
      }
    } catch (error) {
      setCustomerName('');
      toast.error("Smartcard validation failed");
    } finally {
      setIsValidating(false);
    }
  };

  const validateFields = () => {
    const { values } = formik;
    const {  phone, service_id, smart_card_number, variation_id } = values;

    
    if (phone && service_id && smart_card_number && variation_id ) {
        handleNext(); 
    } else {
        formik.setFieldTouched('phone', true);
        formik.setFieldTouched('service_id', true);
        formik.setFieldTouched('smart_card_number', true);
        formik.setFieldTouched('variation_id', true);
    }
};


  
  
  const fetchCableVariations = async () => {
    try {
      const response = await axiosInstance.get(BillsEndpoints.cableVariation);
      if (response.data.success) {
        const variationData = response.data.data;
        setCables(Object.keys(variationData.cables));
        setPlans(variationData.plans);
      }
    } catch (error) {
      console.error("Error fetching cable variations:", error);
    }
  };

  const getUser = async () => {
    try {
      const details = await UserDetails();
      const userDetails = details.data.data.previousReference;
      setInfo(userDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
    fetchCableVariations();
  }, []);

  useEffect(() => {
    if (selectedProvider && plans[selectedProvider]) {
      const providerPlans = plans[selectedProvider].map((item) => ({
        value: item.name,
        label: `${item.name} - ₦${item.amount.toLocaleString()}`,
      }));
      setSubscriptionOptions(providerPlans);
    } else {
      setSubscriptionOptions([]);
    }
  }, [selectedProvider, plans]);

  const cableProviderOptions = cables.map(cable => ({
    value: cable,
    label: cable,
  }));

 
  

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] md:w-[530px] lg:w-[650px] bg-white p-6 rounded-xl shadow-md">
        <h4 className="text-center text-xl font-semibold mb-4">Pay TV Subscription</h4>

        {/* Recent Purchases */}
        <h5 className="text-lg font-semibold mb-2">Most recent</h5>
        <div className="flex flex-wrap gap-4 mb-4">
          {Array.isArray(info) && info.length > 0 && info.some(i => i.title === 'DStv') ? (
            info.filter(user => user.title === 'DStv').map(user => (
              <div key={user.code} className="flex flex-col items-center">
                <img src="/images/dstv.png" alt="dstv" className="w-10 h-10" />
                <span className="text-sm">{user.title}</span>
                <span className="text-xs">{user.code}</span>
              </div>
            ))
          ) : (
            <div className='text-green-500'>No recent Purchase...</div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Provider */}
          <label className="text-sm font-semibold">Service Provider</label>
          <Select
            id="service_id"
            name="service_id"
            options={cableProviderOptions}
            onChange={handleProviderChange}
            value={cableProviderOptions.find(opt => opt.value === formik.values.service_id)}
            placeholder="Provider"
              styles={{
                    control: (base) => ({
                      ...base,
                      width: '95%',
                      fontWeight: '700',
                      marginBottom: '10px',
                      padding: '8px',
                    }),
                  }}
        
          />
          {/* Plan */}
          <label className="text-sm font-semibold">Subscription Plan</label>
          <Select
            id="variation_id"
            name="variation_id"
            options={subscriptionOptions}
            onChange={opt => formik.setFieldValue("variation_id", opt)}
            value={subscriptionOptions.find(opt => opt.value === formik.values.variation_id)}
            placeholder="Select Plan"
              styles={{
                    control: (base) => ({
                      ...base,
                      width: '95%',
                      fontWeight: '700',
                      marginBottom: '10px',
                      padding: '8px',
                    }),
                  }}
          />
          {formik.touched.variation_id && formik.errors.variation_id && (
  <div className="text-red-500 text-sm">{formik.errors.variation_id}</div>  
)}

          {/* Smartcard */}
          <label className="text-sm font-semibold mt-3">Smartcard Number</label>
       <input
  type="text"
  name="smart_card_number"
  value={formik.values.smart_card_number}
  onChange={formik.handleChange}
  onBlur={(e) => {
    formik.handleBlur(e);
    handleSmartCardBlur();
  }}
        className="border-2 p-3 shadow w-[95%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2 focus:outline-none"
  placeholder="Enter Smartcard Number"
/>
{formik.touched.smart_card_number && formik.errors.smart_card_number && (
  <div className="text-red-500 text-sm">{formik.errors.smart_card_number}</div>
)}

          {isValidating && <ClipLoader size={20} color="#2563EB" />}
          {customerName && (
             <div className="bg-[#F1F5F9] text-[15px] mt-2 font-semibold text-green-400 rounded-md px-3 py-2 w-[95%]">
                   Customer: {customerName}
                </div>
          )}

          {/* Phone */}
          <label className="text-sm font-semibold mt-3">Phone Number</label>
          <input
            type="text"
            name="phone"
            {...formik.getFieldProps("phone")}
                   className="border-2 p-3 shadow w-[95%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2 focus:outline-none"
            placeholder="Enter Phone Number"
          />
          {formik.touched.phone && formik.errors.phone && (
  <div className="text-red-500 text-sm">{formik.errors.phone}</div>
)}


          {/* Submit */}
          <div>
      <button type='button' onClick={validateFields} className="p-4 w-[96%] font-poppins my-3 rounded-lg bg-blue-500 text-white">
                   Next
                 </button>

              </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseTvSub;
