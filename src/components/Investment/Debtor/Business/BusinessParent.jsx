import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Business from './Business';
import BusinessStep2 from './BusinessStep2';
import BusinessStep3 from './BusinessStep3';
import BusinessStep4 from './BusinessStep4';
import useInvestment from '../../../../hooks/useInvetment';

const BusinessParent = () => {
    const [step, setStep] = useState('step1');
    const { CreateBusiness } = useInvestment();

    const initialValues = {
        business_name: '',
        business_description: '',
        founding_date: '',
        business_stage: '',
        customer_model: '',
        industry: [],
        online: {
            website: '',
            twitter_url: '',
            linkedIn_url: '',
            facebook_url: '',
            youTube_url: '',
            instagram_url: '',
            tikTok_url: '',
        },
        business_details: {
            financialStatements: [],  // Changed to match your dropzone keys
            growthPlans: [],
            loanRequirements: [],
        },
    };

    const validationSchema = Yup.object({
        business_name: Yup.string().required('Required'),
        business_description: Yup.string().required('Required'),
        founding_date: Yup.date().required('Required').nullable(),
        business_stage: Yup.string().required('Required'),
        customer_model: Yup.string().required('Required'),
        industry: Yup.array().of(Yup.string().required('Industry is required')).min(3, 'At least three industries are required'),
        online: Yup.object({
            website: Yup.string().url('Invalid URL').nullable(),
            twitter_url: Yup.string().url('Invalid URL').nullable(),
            linkedIn_url: Yup.string().url('Invalid URL').nullable(),
            facebook_url: Yup.string().url('Invalid URL').nullable(),
            youTube_url: Yup.string().url('Invalid URL').nullable(),
            instagram_url: Yup.string().url('Invalid URL').nullable(),
            tikTok_url: Yup.string().url('Invalid URL').nullable(),
        }),
        business_details: Yup.object({
            financialStatements: Yup.array().of(Yup.mixed()).required('At least one financial statement is required'),
            growthPlans: Yup.array().of(Yup.mixed()).required('At least one growth plan is required'),
            loanRequirements: Yup.array().of(Yup.mixed()).required('At least one loan requirement is required'),
        }),
    });

    const onSubmit = async (values) => {
        console.log('Form data', values);
       await CreateBusiness(values);  // Use the form values instead of initialValues
    };

    const formik = useFormik({
        initialValues,
        // validationSchema,
        onSubmit,
    });

    const nextStep = () => setStep('step2');
    const stepThree = () => setStep('step3');
    const stepFour = () => setStep('step4');

    return (
        <>
            {step === 'step1' && <Business nextStep={nextStep} />}
            {step === 'step2' && <BusinessStep2 stepThree={stepThree} formik={formik} />}
            {step === 'step3' && <BusinessStep3 stepFour={stepFour} formik={formik} />}
            {step === 'step4' && <BusinessStep4 formik={formik} onSubmit={formik.handleSubmit} />}
        </>
    );
};

export default BusinessParent;
