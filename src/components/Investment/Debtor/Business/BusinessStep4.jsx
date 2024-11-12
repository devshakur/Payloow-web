import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from '../../../../Routes/router';

const BusinessStep4 = ({ formik }) => {
    const { setFieldValue, values } = formik;
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    // Handler for file drop (for each of the fields)
    const handleFileDrop = (fieldName) => (acceptedFiles) => {
        setFieldValue(fieldName, acceptedFiles);
    };

    const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ onDrop: handleFileDrop('financial_statements') });
    const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: handleFileDrop('growth_plans') });
    const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({ onDrop: handleFileDrop('loan_requirements') });

    const renderFiles = (files) => {
        return files.length > 0 ? files.map((file, index) => (
            <li key={index}>{file.name}</li>
        )) : <li>No files selected</li>;
    };

   
    const handleSubmit = async (event) => {
        event.preventDefault();
   
        try {
            const formData = new FormData();
    
            // Appending each of the fields with files to FormData
            values.financial_statements?.forEach(file => formData.append('financial_statements', file));
            values.growth_plans?.forEach(file => formData.append('growth_plans', file));
            values.loan_requirements?.forEach(file => formData.append('loan_requirements', file));
    
            // Wait for formik.handleSubmit to complete
            await formik.handleSubmit();
    
            // If form submission is successful, trigger open() function
            setTimeout(()=>{
                open();
            }, 4000)
          router.push('/debtor/dashboard')
        } catch (error) {
           
            console.error('Error during form submission:', error);
            toast.error(error.message || 'An error occurred while submitting the form.');
        }
    };
    

    return (
        <div>
            <header className="flex justify-between items-center mx-8 mt-8 border-b-4">
                <div className="flex shrink-0 items-center">
                    <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
                </div>
                <div className="mt-2">
                    <p className="font-poppins font-medium text-2xl text-blue-600">Exit</p>
                </div>
            </header>
            <main className="bg-blue-50 w-full h-screen">
                <div className="flex justify-center">
                    <ul className="flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4">
                        <li className="font-poppins text-xl font-medium">Account Information</li>
                        <li className="font-poppins text-xl font-medium">Online</li>
                        <li className="font-poppins text-xl font-medium text-blue-600">Business Details</li>
                    </ul>
                </div>
                <section className="flex justify-center">
                    <div className="bg-white w-full lg:w-1/2 mx-4 p-4 rounded-lg shadow-lg">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            {/* Financial Statements */}
                            <section>
                                <label htmlFor="financialStatements" className="mt-4 mb-1 font-semibold text-lg">
                                    Financial Statements
                                </label>
                                <div
                                    {...getRootProps1({ className: 'border-2 border-dashed border-gray-400 rounded-lg p-8 bg-[#C0D5FD] text-center cursor-pointer hover:border-blue-500 transition mb-6' })}
                                >
                                    <input {...getInputProps1()} className="hidden" />
                                    <p className="text-black text-md font-poppins font-medium">Drop files here to upload…</p>
                                </div>
                                <aside className="-mt-5">
                                    <ul className="list-disc pl-5">{renderFiles(values.financial_statements || [])}</ul>
                                </aside>

                                {/* Growth Plans */}
                                <label htmlFor="growthPlans" className="mb-1 font-semibold text-lg">
                                    Growth Plans
                                </label>
                                <div
                                    {...getRootProps2({ className: 'border-2 border-dashed border-gray-400 rounded-lg p-8 bg-[#C0D5FD] text-center cursor-pointer hover:border-blue-500 transition mb-6' })}
                                >
                                    <input {...getInputProps2()} className="hidden" />
                                    <p className="text-black text-md font-poppins font-medium">Drop files here to upload…</p>
                                </div>
                                <aside className="-mt-5">
                                    <ul className="list-disc pl-5">{renderFiles(values.growth_plans || [])}</ul>
                                </aside>

                                {/* Loan Requirements */}
                                <label htmlFor="loanRequirements" className="mt-4 mb-1 font-semibold text-lg">
                                    Loan Requirements
                                </label>
                                <div
                                    {...getRootProps3({ className: 'border-2 border-dashed border-gray-400 rounded-lg p-8 bg-[#C0D5FD] text-center cursor-pointer hover:border-blue-500 transition mb-6' })}
                                >
                                    <input {...getInputProps3()} className="hidden" />
                                    <p className="text-black text-md font-poppins font-medium">Drop files here to upload…</p>
                                </div>
                                <aside className="-mt-5">
                                    <ul className="list-disc pl-5">{renderFiles(values.loan_requirements || [])}</ul>
                                </aside>
                            </section>

                            <div className="flex justify-center">
                                <button type="submit" className="w-[50%] py-3 my-5 bg-blue-600 text-white rounded-lg">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div>
                            <Dialog open={isOpen} onClose={close} className="relative z-10 focus:outline-none">
                                <div className="fixed inset-0 z-10 w-screen">
                                    <div className="flex min-h-full items-start mt-[9rem] justify-center p-4">
                                        <DialogPanel
                                            transition
                                            className="w-full max-w-3xl h-auto rounded-xl bg-white p-12 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                        >
                                            <DialogTitle as="h3" className="flex justify-center h-[11rem]">
                                                <img src="/images/success.png" alt="success" />
                                            </DialogTitle>
                                            <p className="mt-2 text-xl text-black font-semibold">
                                                Congratulations! Your business is now set up and ready to go. Start adding loan details to attract investors and take your business to the next level.
                                            </p>
                                            <div className="w-full py-5 mt-4 gap-4 flex justify-center">
                                                <button className="w-full py-2 rounded-md border border-blue-400 text-blue-600">Add Loan</button>
                                                <button onClick={close} className="w-full rounded-md bg-blue-500 text-white">
                                                    Done
                                                </button>
                                            </div>
                                        </DialogPanel>
                                    </div>
                                </div>
                            </Dialog>
                            <Toaster />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep4;
