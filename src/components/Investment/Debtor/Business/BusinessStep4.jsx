import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from '../../../../Routes/router';
import axiosInstance from '../../../../AuthContext/axiosInstance';
import axios from "axios";

const BusinessStep4 = ({ formik,nextStep, stepThree, loading, setLoading }) => {
    const { setFieldValue, values } = formik;
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    
    const handleFileDrop = (fieldName) => (acceptedFiles) => {
        setFieldValue(fieldName, acceptedFiles);
    };

    const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ onDrop: handleFileDrop('financialStatements') });
    const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: handleFileDrop('growthPlans') });
    const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({ onDrop: handleFileDrop('loanRequirements') });

    const renderFiles = (files) => {
        return files.length > 0 ? files.map((file, index) => (
            <li key={index}>{file.name}</li>
        )) : <li>No files selected</li>;
    };


   

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();

    // Append files to FormData
    values.financialStatements?.forEach((file) =>
      formData.append("financialStatements", file)
    );
    values.growthPlans?.forEach((file) =>
      formData.append("growthPlans", file)
    );
    values.loanRequirements?.forEach((file) =>
      formData.append("loanRequirements", file)
    );

    // Validate form using Formik
    await formik.validateForm();

    if (!formik.isValid) {
      toast.error("Please fix validation errors.");
      setLoading(false);
      return;
    }

    // Submit to backend
    const response = await axiosInstance.post("/debtors-users/business", {
      ...formik.values,
      // Optionally attach file-related formData if needed
    });

    if (response?.data?.business?._id) {
      toast.success("Business Created Successfully");
      open(); // redirect or show modal
    } else {
      toast.error("Something went wrong. Please check your inputs.");
    }
  } catch (error) {
    console.error("Error:", error);

    const errorMessage =
       error?.response.error ||
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";

    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};


  
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   setLoading(true);

//   try {
//     // Validate the form first
//     await formik.validateForm();

//     if (!formik.isValid) {
//       toast.error("Please fix validation errors.");
//       setLoading(false);
//       return;
//     }

//     const values = formik.values;

//     const formData = new FormData();
//     formData.append("businessName", values.businessName);
//     formData.append("businessDescription", values.businessDescription);
//     formData.append("businessStage", values.businessStage);
//     formData.append("customerModel", values.customerModel);
//     formData.append("website", values.website);

//     // Append social media URLs
//     formData.append("twitterUrl", values.twitterUrl);
//     formData.append("linkedInUrl", values.linkedInUrl);
//     formData.append("facebookUrl", values.facebookUrl);
//     formData.append("youTubeUrl", values.youTubeUrl);
//     formData.append("instagramUrl", values.instagramUrl);
//     formData.append("tikTokUrl", values.tikTokUrl);

//     // Append industries individually
//     values.industry?.forEach((ind) => formData.append("industry", ind));

//     // Append files
//     values.financialStatements?.forEach((file) =>
//       formData.append("financialStatements", file)
//     );
//     values.growthPlans?.forEach((file) =>
//       formData.append("growthPlans", file)
//     );
//     values.loanRequirements?.forEach((file) =>
//       formData.append("loanRequirements", file)
//     );

//     // Make API request
//     const response = await axiosInstance.post("/debtors-users/business", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (response.data?.business?._id) {
//       toast.success("Business Created Successfully 🎉");
//       open(); // your modal or navigation step
//     } else {
//       toast.error("Business created but missing response data.");
//     }
//   } catch (error) {
//     console.error("Submission error:", error);
//     toast.error(
//       error?.response?.data?.message || "Something went wrong. Try again."
//     );
//   } finally {
//     setLoading(false);
//   }
// };


   


    return (
        <div>
            <header className="flex justify-between items-center mx-8 mt-8 border-b-4">
                <div className="flex shrink-0 items-center">
                    <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
                </div>
                <div className="mt-2">
                    <p onClick={()=>router.back()} className="font-poppins font-medium text-2xl text-blue-600 cursor-pointer">Exit</p>
                </div>
            </header>
            <main className="bg-blue-50 w-full h-screen">
                <div className="flex justify-center">
                    <ul className="flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4">
                        <li onClick={nextStep} className="font-plus-jakarta text-[16px] lg:text-xl font-medium cursor-pointer">Account Information</li>
                        <li onClick={stepThree} className="font-plus-jakarta text-[16px] lg:text-xl font-medium cursor-pointer">Online</li>
                        <li className="font-plus-jakarta text-[16px] lg:text-xl font-medium text-blue-600 cursor-pointer">Business Details</li>
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
                                    <ul className="list-disc pl-5">{renderFiles(values.financialStatements || [])}</ul>
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
                                    <ul className="list-disc pl-5">{renderFiles(values.growthPlans || [])}</ul>
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
                                    <ul className="list-disc pl-5">{renderFiles(values.loanRequirements || [])}</ul>
                                </aside>
                            </section>

                            <div className="flex justify-center">
                                <button type="submit" className="w-[50%] py-3 my-5 bg-blue-600 text-white rounded-lg">
                                    {loading ? 'Submitting...' :'Submit'}
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
                                                <button onClick={()=>router.push('/debtor/loans')} className="w-full py-2 rounded-md border border-blue-400 text-blue-600 cursor-pointer">Add Loan</button>
                                                <button onClick={()=>router.reload()} className="w-full rounded-md bg-blue-500 text-white cursor-pointer">
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
