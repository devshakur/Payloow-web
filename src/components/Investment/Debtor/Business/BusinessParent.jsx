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
        "businessName": "",
        "foundingDate": "",
        "instagramUrl": "",
        "twitterUrl": "",
        "customerModel": "",
        "tikTokUrl": "",
        "linkedInUrl": "",
        "youTubeUrl": "",
        "facebookUrl": "",
        "website": "",
        "businessDescription": "",
        "industry": [],
        "businessStage": "",
        "growthPlans": [],
        "financialStatements": [],
        "loanRequirements": [],
    }

    const validationSchema = Yup.object({
        businessName: Yup.string().required('Required'),
        businessDescription: Yup.string().required('Required'),
        foundingDate: Yup.date().required('Required').nullable(),
        businessStage: Yup.string().required('Required'),
        customerModel: Yup.string().required('Required'),
         industry: Yup.array().of(Yup.string().required('Industry is required')).min(3, 'At least three industries are required'),
        online: Yup.object({
            website: Yup.string().url('Invalid URL').nullable().required('Website is required'),
            twitterUrl: Yup.string().url('Invalid URL').nullable().optional(),
            linkedInUrl: Yup.string().url('Invalid URL').nullable().optional(),
            facebookUrl: Yup.string().url('Invalid URL').nullable().optional(),
            youTubeUrl: Yup.string().url('Invalid URL').nullable().optional(),
            instagramUrl: Yup.string().url('Invalid URL').nullable().optional(),
            tikTokUrl: Yup.string().url('Invalid URL').nullable().optional(),
        }),
        business_details: Yup.object({
            financialStatements: Yup.array().of(Yup.mixed()).required('At least one financial statement is required'),
            growthPlans: Yup.array().of(Yup.mixed()).required('At least one growth plan is required'),
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

