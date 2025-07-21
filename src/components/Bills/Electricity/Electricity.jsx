import React, { useState } from 'react';
import BillsLayout from '../Airtime/BillsLayout';
import BillsHeader from '../BillsHeader';
import PurchaseElectricity from './PurchaseElectricity';
import ConfirmElectricity from './ConfirmElectricity';
import ApproveElectricity from './ApproveElectricity';
import FailedElectricity from './FailedElectricity';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Electricity = () => {
  const formik = useFormik({
    initialValues: {
      meter_number: '',
      service_id: '',
      variation_id: '',
      amount: '',
      phone: '',
       TransactionPin: '',
      customerName: '',
      customerAddress: '',
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\d+$/, 'Phone number must be digits only')
        .min(11, 'Phone number must be at least 11 digits')
        .max(15, 'Phone number must not exceed 15 digits')
        .required('Phone number is required'),
        
      meter_number: Yup.string()
        .matches(/^\d+$/, 'Meter number must be digits only')
        .min(11, 'Meter number must be at least 11 digits')
        .max(13, 'Meter number must not exceed 13 digits')
        .required('Meter number is required'),
        
      service_id: Yup.string().required('Service provider is required'),
      variation_id: Yup.string().required('Plan type is required'),
      amount: Yup.number()
        .min(500, 'Minimum amount is ₦500')
        .required('Amount is required'),
       TransactionPin: Yup.string()
        .matches(/^\d{4}$/, 'Pin must be 4 digits')
        .required('Pin is required'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });
  const [responseData, setResponseData] = useState({})
  const [active, setActive] = useState('page1');

  const handleNextPage = () => setActive('page2');
  const handleThirdPage = () => setActive('page3');
  const handleErrorPage = () => setActive('page4');

  return (
    <div className="w-screen h-[100vh] bg-gray-100 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row">
      <div className="hidden lg:block">
        <BillsLayout />
      </div>

      <div className='lg:flex lg:flex-col flex-1'>
        <BillsHeader active={active} />

        {active === 'page1' && <PurchaseElectricity active={active} formik={formik} handleNext={handleNextPage} />}
        {active === 'page2' && <ConfirmElectricity setActive={setActive} formik={formik} handleThirdPage={handleThirdPage} setResponseData={setResponseData} />}
        {active === 'page3' && <ApproveElectricity active={active} handleErrorPage={handleErrorPage} responseData={responseData} />}
        {active === 'page4' && <FailedElectricity active={active} handleErrorPage={handleErrorPage} />}
      </div>
    </div>
  );
};

export default Electricity;
