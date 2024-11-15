import React, { useState, useEffect } from 'react';
import useInvestment from '../../../../hooks/useInvetment';
import { toast,  Toaster } from 'react-hot-toast';

const BusinessStep2 = ({ stepThree, formik }) => {
    const { GetIndustries, GetBusinessStages, GetModels } = useInvestment();
    const [industries, setIndustries] = useState([]);
    const [stages, setStages] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        const getIndustries = async () => {
            try {
                const resp = await GetIndustries();
            
                const data = resp.data.data.industries;
                setIndustries(data);
                toast.success('Industries Fetched')
            } catch (error) {
                toast.error("Failed to fetch industries:", error);
            }
        };

        const getStages = async ()=>{
            try {
                const resp = await GetBusinessStages();
                const data = resp.data.data.business_stages
                setStages(data)
                toast.success('Business Stages Fetched')
            } catch (error) {
                toast.error("Failed to fetch Stages:", error);
            }
        }
      

        const getModels = async ()=>{
            try {
                const resp = await GetModels();
                const data = resp.data.data.industries
               setModels(data)
               toast.success('Business Models Fetched')
            } catch (error) {
                toast.error("Failed to fetch Stages:", error);
            }
        }

        getIndustries();
        getStages();
        getModels();
    }, []);

    const handleStageClick = (stage) => {
        formik.setFieldValue('business_stage', stage);
    };

    const isStageSelected = (stage) => {
        return formik.values.business_stage === stage;
    };

    const handleModelClick = (model) => {
        formik.setFieldValue('customer_model', model);
    };

    const isModelSelected = (model) => {
        return formik.values.customer_model === model;
    };

    return (
        <div>
            <header className='flex justify-between items-center mx-8 mt-8 border-b-4'>
                <div className="flex shrink-0 items-center">
                    <img
                        alt="Paylow Logo"
                        src="/images/logo.svg"
                        className="h-14 w-auto"
                    />
                </div>
                <div className='mt-2'>
                    <p className='font-poppins font-medium text-2xl text-blue-600'>Exit</p>
                </div>
            </header>
            <main className='w-[100vw] h-screen'>
                <div className='flex justify-center'>
                    <ul className='flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4'>
                        <li className='font-poppins text-xl font-medium text-blue-600'>Account Information</li>
                        <li className='font-poppins text-xl font-medium'>Online</li>
                        <li className='font-poppins text-xl font-medium'>Business Details</li>
                    </ul>
                </div>
                <section className='flex justify-center'>
                    <div className='bg-white w-full lg:w-1/2 rounded-lg shadow-md'>
                        <form onSubmit={formik.handleSubmit} className='flex flex-col'>
                            <label htmlFor="business_name" className='mt-4 mx-6 font-semibold text-lg'>Business Name</label>
                            <input
                                type="text"
                                name='business_name'
                                id='business_name'
                                className='py-4 mx-6 border-2 border-[#D0D5DD] rounded-md mb-4 px-2'
                                placeholder='Business Name'
                                onChange={formik.handleChange}
                                value={formik.values.business_name}
                            />
                            {formik.touched.business_name && formik.errors.business_name ? (
                                <div className="text-red-500">{formik.errors.business_name}</div>
                            ) : null}

                            <div className='flex flex-col mt-4'>
                                <label htmlFor="founding_date" className=' mx-6 font-semibold text-lg'>Founding Date</label>
                                <input
                                    type="date"
                                    name='founding_date'
                                    id='founding_date'
                                    className='py-4 mx-6 border-2 border-[#D0D5DD] rounded-md mb-4 px-2'
                                    placeholder='Founding Date'
                                    onChange={formik.handleChange}
                                    value={formik.values.founding_date}
                                />
                                {formik.touched.founding_date && formik.errors.founding_date ? (
                                    <div className="text-red-500">{formik.errors.founding_date}</div>
                                ) : null}
                            </div>

                            <label htmlFor="business_description" className='mt-4 mx-6 font-semibold'>Description</label>
                            <textarea
                                className='py-1 mx-6 border-2 border-[#D0D5DD] rounded-md mb-4 px-2'
                                id="business_description"
                                name="business_description"
                                onChange={formik.handleChange}
                                value={formik.values.business_description}
                            />
                            {formik.touched.business_description && formik.errors.business_description ? (
                                <div className="text-red-500">{formik.errors.business_description}</div>
                            ) : null}

                            <div className='my-8 mx-5'>
                                <h4 className='font-semibold text-lg font-poppins'>Stage</h4>
                                <div className='flex flex-col lg:flex-row gap-4 my-3'>
                                    {stages && stages.length > 0 ?
                                    stages.map((stage) => (
                                        <div
                                            key={stage}
                                            className={`flex bg-[#F8F9FC] py-4 ${isStageSelected(stage) ? 'rounded-lg' : ''}`}
                                            onClick={() => handleStageClick(stage)}
                                        >
                                            <div className='h-7 w-7 rounded-[50%] border-2 border-gray-500 flex justify-center items-center'>
                                                <input
                                                    type="radio"
                                                    className='w-4 h-4'
                                                    name="business_stage"
                                                    id={stage}
                                                    checked={isStageSelected(stage)}
                                                    readOnly
                                                />
                                            </div>
                                            <span className='ml-2'>{stage}</span>
                                        </div>
                                    )) : <p className='font-bold text-green-500 font-poppins text-lg'>Loading Stages......</p> }
                                </div>
                                {formik.touched.business_stage && formik.errors.business_stage ? (
                                    <div className="text-red-500">{formik.errors.business_stage}</div>
                                ) : null}
                            </div>

                            <h4 className='font-semibold text-lg mx-4 font-poppins'>Customer Model</h4>
                            <div className='mx-5 flex flex-col lg:flex-row gap-4 flex-wrap'>
                                {models && models.length > 0 ?
                                models.map((model) => (
                                    <div
                                        key={model}
                                        className={`flex bg-[#F8F9FC] py-4 ${isModelSelected(model) ? 'bg-blue-500 rounded-lg' : ''}`}
                                        onClick={() => handleModelClick(model)}
                                    >
                                        <div className='h-7 w-7 rounded-[50%] border-2 border-gray-500 flex justify-center items-center'>
                                            <input
                                                type="checkbox"
                                                className='w-4 h-4'
                                                name="customer_model"
                                                id={model}
                                                checked={isModelSelected(model)}
                                                readOnly
                                            />
                                        </div>
                                        <label htmlFor={model} className='text-[#1D2433] font-poppins font-medium text-lg mx-3'>
                                            {model}
                                        </label>
                                    </div>
                                )) : <p className='text-lg font-poppins text-green-500 font-bold'>Loading Business Models</p>}
                            </div>
                            {formik.touched.customer_model && formik.errors.customer_model ? (
                                <div className="text-red-500">{formik.errors.customer_model}</div>
                            ) : null}

                            <div className="relative inline-block w-full mt-5">
                                <label htmlFor="industry" className='mt-4 mx-6 font-semibold text-lg'>Industries</label>
                                <select
                                    id="industry"
                                    name="industry"
                                    className="block appearance-none w-[95%] mb-8 bg-white rounded-lg py-4 mx-6 px-4 pr-8 border-2 border-[#D0D5DD] text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    onChange={formik.handleChange}
                                    value={formik.values.industry}
                                >
                                    {industries && industries.length > 0 ? (
                                        industries.map((industry, index) => (
                                            <option key={index} value={industry} className='text-xl text-green-500'>
                                                {industry}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Loading industries...</option>
                                    )}
                                </select>
                                {formik.touched.industry && formik.errors.industry ? (
                                    <div className="text-red-500">{formik.errors.industry}</div>
                                ) : null}

                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="w-8 h-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.664l3.71-3.453a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 010-1.08z" />
                                    </svg>
                                </div>
                            </div>

                            <button type="button" onClick={stepThree} className='w-[90%] py-2 mx-8 mb-5 bg-blue-600 text-white rounded-lg'>NEXT</button>
                        </form>
                        <Toaster />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep2;
