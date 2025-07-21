

import React, { useState, startTransition } from 'react';
import BillsLayout from '../Airtime/BillsLayout';
import BillsHeader from '../BillsHeader';
import DataBundles from './DataBundles';
import Confirm from './Confirm';
import ApprovedData from './ApprovedData';
import DataPurchaseFailed from './DataPurchaseFailed';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Data = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successResponse, setSuccessResponse] = useState({});
  const [active, setActive] = useState('page1');

  const formik = useFormik({
    initialValues: {
      phone: '',
      network: '',
      planId: '',
      planType: '',
      transactionPin: '', // maps to pin
      pin: '', // used in UI input and also sent as transactionPin
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be digits')
        .required('Phone is required'),
      network: Yup.string().required('Network is required'),
      planId: Yup.string().required('Plan ID is required'),
      planType: Yup.string().required('Plan type is required'),
      pin: Yup.string().required('PIN is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  const handleNextPage = () => {
    startTransition(() => {
      setActive('page2');
    });
  };

  const handleThirdPage = () => {
    startTransition(() => {
      setActive('page3');
    });
  };

  const handleErrorPage = () => {
    startTransition(() => {
      setActive('page4');
    });
  };

  return (
    <div className="w-screen h-[100vh] bg-gray-100 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <BillsLayout active={active} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="lg:flex lg:flex-col flex-1">
        <BillsHeader active={active} />

        {active === 'page1' && (
          <DataBundles
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            formik={formik}
            handleNext={handleNextPage}
          />
        )}

        {active === 'page2' && (
          <Confirm
            selectedPlan={selectedPlan}
            successResponse={successResponse} 
            setSuccessResponse={setSuccessResponse}
            setActive={setActive}
            formik={formik}
          />
        )}

        {active === 'page3' && <ApprovedData active={active} successResponse={successResponse} />}
        {active === 'page4' && <DataPurchaseFailed />}
      </div>
    </div>
  );
};

export default Data;
