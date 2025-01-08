import React, { useState } from 'react';
import Registration from './Registration';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from '../../../Routes/router';
import useInvestment from '../../../hooks/useInvetment';
import { toast, Toaster } from 'react-hot-toast';

const StepParent = () => {
  const [step, setStep] = useState('zero');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { CreateBuyerProfile } = useInvestment();

  const openStepTwo = () => {
    setTimeout(() => {
      setActiveIndex(0);
      setStep('one');
    }, 200);
  };

  const openStepThree = () => {
    setActiveIndex(1);
    setStep('two');
  };

  const handleExit = () => {
    router.reload();
  };

  const initialValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    state: '',
    country: '',
    nin: '',
    bvn: '',
    easyBuyRole: '',
    employmentStatus: '',
    referralCode: '',
    income: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
      // .matches(/^[0-9]+$/, 'Phone Number must be numeric')
      .required('Phone Number is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    email: Yup.string().required('email is required'),
    address: Yup.string().required('Address is required'),
    nin: Yup.string().required('National ID is required'),
    bvn: Yup.string().required('BVN is required'),
    employmentStatus: Yup.string().required('employment status is required'),
    income: Yup.string().optional(),
    easyBuyRole: Yup.string().optional(),
    referralCode: Yup.string().optional(),
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
    try {
      const response = await CreateBuyerProfile(values);

      if (response && response.status === 200) {

          if (response.data?.message) {
              toast.success(response.data.message);  
          } else {
              toast.success('Buyer profile created successfully');  // Fallback success message
          }
      } else {
          // If status is not 200 or response is missing data
          toast.error('Error: Could not create buyer profile', response);
      }
  } catch (error) {
    if (error?.response?.data?.msg) {
      toast.error(error.response.data.msg); 
      if(error.response.data.msg === 'User already has an easybuy profile'){
        setTimeout(() => {
          router.push('/buyers/dashboard')  
        }, 3000);
      } 
    } else {
      toast.error('Could not create buyer profile'); 
    }
  }
};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      {step === 'zero' && <Registration openStepTwo={openStepTwo} />}

      <header className="flex justify-between items-center mx-8 mt-8 border-b-4">
        <div className="flex shrink-0 items-center">
          <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
        </div>
        <div className="mt-2">
          <p onClick={handleExit} className="font-poppins font-medium text-2xl text-blue-600 cursor-pointer">
            Exit
          </p>
        </div>
      </header>

      <div className="flex justify-center">
        <ul className="flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4 cursor-pointer">
          <li
            onClick={openStepTwo}
            className={`font-poppins text-lg font-medium ${activeIndex === 0 ? 'text-blue-700' : ''} focus:text-blue-700 active:text-blue-700`}
          >
            Personal Info
          </li>
          <li
            onClick={openStepThree}
            className={`font-poppins text-lg font-medium ${activeIndex === 1 ? 'text-blue-700' : ''}`}
          >
            Financial Info
          </li>
        </ul>
      </div>

      {step === 'one' && <StepTwo openStepThree={openStepThree} formik={formik} />}
      {step === 'two' && <StepThree formik={formik} onSubmit={formik.handleSubmit} />}

      <Toaster />
    </div>
  );
};

export default StepParent;
