import React, { useState } from 'react';

const BusinessStep2 = ({ stepThree }) => {
    const [selectedStages, setSelectedStages] = useState([]);

    const handleStageClick = (stage) => {
        setSelectedStages((prev) => 
            prev.includes(stage) ? prev.filter(item => item !== stage) : [...prev, stage]
        );
    };

    const isStageSelected = (stage) => selectedStages.includes(stage);

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
                        <form action="" className='flex flex-col'>
                            <label htmlFor="Business" className='mt-4 mx-6 font-semibold text-lg'>Business Name</label>
                            <input type="text" className='py-4 mx-6 border-2 border-[#D0D5DD] rounded-md mb-4 px-2' placeholder='Business Name' />
                            <label htmlFor="Business" className='mt-4 mx-6 font-semibold'>Description</label>
                            <textarea className='py-1 mx-6 border-2 border-[#D0D5DD] rounded-md mb-4 px-2' />
                            <div className='my-8 mx-5'>
                                <h4 className='font-semibold text-lg font-poppins'>Stage</h4>
                                <div className='flex flex-col lg:flex-row gap-4 my-3'>
                                    {["idea/concept stage", "Startup stage", "Growth stage"].map((stage) => (
                                        <div key={stage} className={`flex bg-[#F8F9FC] py-4 ${isStageSelected(stage) ? 'bg-green-500 rounded-lg' : ''}`} onClick={() => handleStageClick(stage)}>
                                            <div className='h-7 w-7 rounded-[50%] border-2 border-gray-500 flex justify-center'>
                                                <input type="checkbox" className='w-2 h-2 mt-2' name={stage} id={stage} />
                                            </div>
                                            <label htmlFor={stage} className='text-[#1D2433] font-poppins font-medium text-lg mx-3'>
                                                {stage}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h4 className='font-semibold text-lg font-poppins mb-4'>Stage</h4>
                            <div className='mx-5 flex flex-col lg:flex-row gap-4 flex-wrap'>
                                {["B2B", "B2B2B", "B2B2C", "B2B2G", "B2C", "C2C", "Governmental (G2G)", "Non Profit"].map((stage) => (
                                    <div key={stage} className={`flex bg-[#F8F9FC] py-4 ${isStageSelected(stage) ? 'bg-green-500 rounded-lg' : ''}`} onClick={() => handleStageClick(stage)}>
                                        <div className='h-7 w-7 rounded-[50%] border-2 border-gray-500 flex justify-center'>
                                            <input type="checkbox" className='w-2 h-2 mt-2' name={stage} id={stage} />
                                        </div>
                                        <label htmlFor={stage} className='text-[#1D2433] font-poppins font-medium text-lg mx-3'>
                                            {stage}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="relative inline-block w-full mt-5">
                                <label htmlFor="industries" className='mt-4 mx-6 font-semibold text-lg'>Industries</label>
                                <select className="block appearance-none w-[95%] mb-8 bg-white rounded-lg py-4 mx-6 px-4 pr-8 border-2 border-[#D0D5DD] text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
                                    <option>Select an option</option>
                                    <option value="finance">Finance</option>
                                    <option value="oil">Oil</option>
                                    <option value="agriculture">Agriculture</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="w-8 h-8" // Adjust size here
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.664l3.71-3.453a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 010-1.08z" />
                                    </svg>
                                </div>
                            </div>
                            <button onClick={stepThree} className='w-[90%] py-2 mx-8 mb-5 bg-blue-600 text-white rounded-lg'>NEXT</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep2;


