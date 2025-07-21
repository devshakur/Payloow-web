// import React, {useState, useEffect} from 'react'
// import BillsLayout from '../Airtime/BillsLayout'
// import BillsHeader from '../BillsHeader'
// import PurchaseTvSub from './PurchaseTvSub'
// import ConfirmTvSub from './ConfirmTvSub'
// import ApprovedTvSub from './ApprovedTvSub'
// import FailedTvSub from './FailedTvSub'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'



// const TvSub = () => {
//     const formik = useFormik({
//         initialValues: {
//             phone: '',
//             service_id: '',
//             smartcard_number: '',
//             variation_id: '',
//             pin: '',
           
//         },
//         validationSchema: Yup.object({
//             smartcard_number: Yup.number().min(14,'Phone number must be 14 digits').required('Required'),
//             service_id: Yup.string().required('Required'),
//             variation_id: Yup.string().required('Required'),
//             phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').required('Required'),
//             pin: Yup.string().required('Required'),
//         }),
//         onSubmit: async (values, { setSubmitting }) => {
//                 setSubmitting(false);
//         },
//     })

//     const [active, SetActive] = useState('page1')
//     const handleNextPage = () => {
//         SetActive('page2')
//     }
//     const handleThirdPage = () => {
//         SetActive('page3')
//     }
//     const handleErrorPage = () => {
//         SetActive('page4')
//     } 

//   return (
//     <div>
//        <div className="w-screen   overflow-x-hidden overflow-y-scroll flex flex-col lg:flex-row">  
//     <div className="hidden lg:block">  
//         <BillsLayout />   
//     </div>  

//     {/* Main content */}  
//     <div className='lg:flex lg:flex-col flex-1'>  
//     <BillsHeader active={active} />
//     {active === 'page1' && <PurchaseTvSub active={active} formik={formik} handleNext={handleNextPage} />}  
//     {active === 'page2' && <ConfirmTvSub setActive={SetActive} formik={formik} handleThirdPage={handleThirdPage} />}  
//     {active === 'page3' && <ApprovedTvSub active={active}  />} 
//     {active === 'page4' && <FailedTvSub active={active} handleErrorPage={handleErrorPage} />} 
//     </div>
//     </div>
//    </div>
//   )
// }

// export default TvSub

import React, { useState } from 'react';
import BillsLayout from '../Airtime/BillsLayout';
import BillsHeader from '../BillsHeader';
import PurchaseTvSub from './PurchaseTvSub';
import ConfirmTvSub from './ConfirmTvSub';
import ApprovedTvSub from './ApprovedTvSub';
import FailedTvSub from './FailedTvSub';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TvSub = () => {
  const [active, setActive] = useState('page1');
  const [customerName, setCustomerName] = useState('');
  const formik = useFormik({
    initialValues: {
      phone: '',
      service_id: '',
      smart_card_number: '',
      variation_id: null,
      pin: '',
      planId: '',
    },
    validationSchema: Yup.object({
      smart_card_number: Yup.string()
        .min(10, 'Smartcard number must be at least 10 digits')
        .required('Smartcard number is required'),
      service_id: Yup.string().required('Service is required'),
      variation_id: Yup.string().required('Plan selection is required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required'),
        planId: Yup.string().required('Plan ID is required'),
      pin: Yup.string().required('PIN is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  const handleNextPage = () => setActive('page2');
  const handleThirdPage = () => setActive('page3');
  const handleErrorPage = () => setActive('page4');

  return (
    <div className="w-screen overflow-x-hidden overflow-y-scroll flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <BillsLayout />
      </div>

      {/* Main content */}
      <div className="lg:flex lg:flex-col flex-1">
        <BillsHeader active={active} />

        {active === 'page1' && (
          <PurchaseTvSub active={active} formik={formik} handleNext={handleNextPage} setCustomerName={setCustomerName} customerName={customerName} />
        )}
        {active === 'page2' && (
          <ConfirmTvSub setActive={setActive} formik={formik} handleThirdPage={handleThirdPage} customerName={customerName} />
        )}
        {active === 'page3' && <ApprovedTvSub active={active} />}
        {active === 'page4' && <FailedTvSub active={active} handleErrorPage={handleErrorPage} />}
      </div>
    </div>
  );
};

export default TvSub;
