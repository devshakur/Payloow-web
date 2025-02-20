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
    const [loading, setLoading] = useState(false)

    const initialValues = {
        "business_name": "",
        "founding_date": "",
        "instagram_url": "",
        "twitter_url": "",
        "customer_model": "",
        "tikTok_url": "",
        "linkedIn_url": "",
        "youTube_url": "",
        "facebook_url": "",
        "website": "",
        "business_description": "",
        "industry": [],
        "business_stage": "",
        "growth_plans": [],
        "financial_statements": [],
        "loan_requirements": [],
    }

    const validationSchema = Yup.object({
        business_name: Yup.string().required('Required'),
        business_description: Yup.string().required('Required'),
        founding_date: Yup.date().required('Required').nullable(),
        business_stage: Yup.string().required('Required'),
        customer_model: Yup.string().required('Required'),
        // industry: Yup.array().of(Yup.string().required('Industry is required')).min(3, 'At least three industries are required'),
        online: Yup.object({
            website: Yup.string().url('Invalid URL').nullable().required('Website is required'),
            twitter_url: Yup.string().url('Invalid URL').nullable().optional(),
            linkedIn_url: Yup.string().url('Invalid URL').nullable().optional(),
            facebook_url: Yup.string().url('Invalid URL').nullable().optional(),
            youTube_url: Yup.string().url('Invalid URL').nullable().optional(),
            instagram_url: Yup.string().url('Invalid URL').nullable().optional(),
            tikTok_url: Yup.string().url('Invalid URL').nullable().optional(),
        }),
        business_details: Yup.object({
            financial_statements: Yup.array().of(Yup.mixed()).required('At least one financial statement is required'),
            growth_plans: Yup.array().of(Yup.mixed()).required('At least one growth plan is required'),
            loan_requirements: Yup.array().of(Yup.mixed()).required('At least one loan requirement is required'),
        }),
    });

    const onSubmit = async (values) => {
        await CreateBusiness(values);  
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
            {step === 'step2' && <BusinessStep2 stepThree={stepThree} stepFour={stepFour} formik={formik} />}
            {step === 'step3' && <BusinessStep3 stepFour={stepFour} nextStep={nextStep} formik={formik} />}
            {step === 'step4' && <BusinessStep4 formik={formik} nextStep={nextStep} stepThree={stepThree} loading={loading} setLoading={setLoading} onSubmit={formik.handleSubmit} />}
        </>
    );
};

export default BusinessParent;

