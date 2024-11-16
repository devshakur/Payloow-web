// import React, { useState } from 'react';
// import { Button, Dialog, DialogPanel, DialogTitle, Label, Input } from '@headlessui/react';
// import { CloseCircle } from 'iconsax-react';
// import clsx from 'clsx';
// import '../investment.css';
// import { Toaster, toast } from 'react-hot-toast';
// import useInvestment from '../../../hooks/useInvetment';
// import { useRouter } from '../../../Routes/router';
// import '../investment.css'

// const InvestorFormModal = ({ isOpen, onClose, onRegister }) => {
//     const { CreateInvestorAccount } = useInvestment();
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [investorDetails, setInvestorDetails] = useState({
//         contact_email: '',
//         contact_phone_number: '',
//         industry: [], // Stores selected industries
//     });

//     const options = [
//         { value: 'Technology', label: 'Technology' },
//         { value: 'Real Estate', label: 'Real Estate' },
//         { value: 'HealthCare', label: 'HealthCare' },
//         { value: 'Finance', label: 'Finance' },
//         { value: 'Education', label: 'Education' },
//         { value: 'Agriculture', label: 'Agriculture' },
//         { value: 'Retails', label: 'Retails' },
//         { value: 'Manufacturing', label: 'Manufacturing' },
//         { value: 'Construction', label: 'Construction' },
//         { value: 'Transportation', label: 'Transportation' },
//         { value: 'Energy', label: 'Energy' },
//         { value: 'Food', label: 'Food' },
//         { value: 'Entertainment', label: 'Entertainment' },
//         { value: 'Non-Profit', label: 'Non-Profit' },
//         { value: 'Media', label: 'Media' },
//         { value: 'Other', label: 'Other' },
//     ];

//     // Handle form field changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInvestorDetails((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Handle industry selection (toggle selection in the industry array)
//     const handleSelectChange = (event) => {
//         const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
//         setInvestorDetails((prevState) => ({
//             ...prevState,
//             industry: selectedOptions,
//         }));
//     };

//     // Handle form submission (register investor)
//     const registerInvestor = async () => {
//         setLoading(true);
//         try {
//             const resp = await CreateInvestorAccount(investorDetails);
//             if (resp && resp.data && resp.data.success) {
//                 toast.success('Your Profile has been created successfully. ' + resp.data.message);
//                 onRegister(); // Trigger onRegister callback after successful registration
//             } else {
//                 toast.error(resp.data.message);
//             }
//         } catch (error) {
//             console.error(error.message);
//             toast.error('An error occurred: ' + (error.response?.data?.message || error.message));
//             if (error.response.data.message === 'Investor Profile Already Created') {
//                 setTimeout(() => {
//                     router.push('/investor/dashboard');
//                 }, 3000);
//             }
//         }
//     };

//     // Handle form submission (validate and submit)
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (investorDetails.industry.length >= 3) {
//             registerInvestor(); // Proceed to register if at least 3 industries are selected
//         } else {
//             toast.error('Please select at least 3 options for Industry.');
//         }
//     };

//     return (
//         <Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <div className="fixed inset-0 lg:inset-x-[7rem] z-10 w-screen overflow-y-auto">
//                 <div className="flex min-h-full items-center justify-center p-4">
//                     <DialogPanel className="w-full max-w-lg rounded-xl p-6 bg-white duration-300 ease-out">
//                         <div className="flex justify-between my-6">
//                             <DialogTitle as="h3" className="text-lg font-semibold">
//                                 Create Investor Account
//                             </DialogTitle>
//                             <CloseCircle size="30" color="black" onClick={onClose} />
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             {/* Email Input */}
//                             <label className="text-sm font-medium">Email</label>
//                             <Input
//                                 type="email"
//                                 name="contact_email"
//                                 onChange={handleChange}
//                                 value={investorDetails.contact_email}
//                                 placeholder="Enter your email address"
//                                 className={clsx(
//                                     'border border-gray-400 block w-full rounded-lg py-4 px-3 text-sm font-semibold mb-3'
//                                 )}
//                             />

//                             {/* Phone Number Input */}
//                             <label className="text-sm font-medium">Phone Number</label>
//                             <Input
//                                 type="tel"
//                                 name="contact_phone_number"
//                                 onChange={handleChange}
//                                 value={investorDetails.contact_phone_number}
//                                 placeholder="+12345678923"
//                                 className={clsx(
//                                     'block w-full rounded-lg py-4 px-3 text-sm font-semibold mb-3 border border-gray-400'
//                                 )}
//                             />

//                             {/* Select Industry */}
//                             {/* <div>
//                                 <label className="text-lg font-medium">Select Industry</label>
//                                 <select
//                                     multiple
//                                     onChange={handleSelectChange}
//                                     value={investorDetails.industry} // Bind to selected industries
//                                     className={clsx(
//                                         'block bg-blue-100 rounded-lg py-4 px-3 text-xl font-semibold mb-3 border border-gray-400'
//                                     )}
//                                 >
//                                     {options.map((option) => (
//                                         <option key={option.value} value={option.value} className="text-[24px] mb-4">
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {investorDetails.industry.length < 3 && (
//                                     <div className="text-red-500 text-sm">
//                                         Please select at least 3 options.
//                                     </div>
//                                 )}
//                             </div> */}
//                               <div>
//                                 <label className="text-lg font-medium">Select Industry (At least 3)</label>
//                                 <div className="flex flex-wrap gap-4 mb-3">
//                                     {options.map((option) => (
//                                         <div key={option.value} className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 name="industry"
//                                                 value={option.value}
//                                                 checked={investorDetails.industry.includes(option.value)}
//                                                 onChange={handleChange}
//                                                 className="mr-2"
//                                             />
//                                             <label className='text-gray-600 cursor-pointer'>{option.label}</label>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 {investorDetails.industry.length < 3 && (
//                                     <div className="text-red-500 text-sm">
//                                         Please select at least 3 options.
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Buttons */}
//                             <div className="w-full flex flex-col lg:flex-row lg:gap-4">
//                                 <Button
//                                     onClick={onClose}
//                                     className="w-full lg:w-[200px] rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-4 text-md mt-6"
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-4 text-md text-white mt-6"
//                                 >
//                                     {loading ? 'Registering...' : 'Register'}
//                                 </Button>
//                             </div>
//                         </form>
//                         <Toaster />
//                     </DialogPanel>
//                 </div>
//             </div>
//         </Dialog>
//     );
// };

// export default InvestorFormModal;

import React, { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Label, Input } from '@headlessui/react';
import { CloseCircle } from 'iconsax-react';
import clsx from 'clsx';
import '../investment.css';
import { Toaster, toast } from 'react-hot-toast';
import useInvestment from '../../../hooks/useInvetment';
import { useRouter } from '../../../Routes/router';
import '../investment.css'

const InvestorFormModal = ({ isOpen, onClose, onRegister }) => {
    const { CreateInvestorAccount } = useInvestment();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [investorDetails, setInvestorDetails] = useState({
        contact_email: '',
        contact_phone_number: '',
        industry: [], // Stores selected industries
    });

    const options = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Real Estate', label: 'Real Estate' },
        { value: 'HealthCare', label: 'HealthCare' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Education', label: 'Education' },
        { value: 'Agriculture', label: 'Agriculture' },
        { value: 'Retails', label: 'Retails' },
        { value: 'Manufacturing', label: 'Manufacturing' },
        { value: 'Construction', label: 'Construction' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Energy', label: 'Energy' },
        { value: 'Food', label: 'Food' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Non-Profit', label: 'Non-Profit' },
        { value: 'Media', label: 'Media' },
        { value: 'Other', label: 'Other' },
    ];

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Handle checkbox selection
            setInvestorDetails((prevState) => {
                const updatedIndustries = checked
                    ? [...prevState.industry, value] // Add industry if checked
                    : prevState.industry.filter((industry) => industry !== value); // Remove industry if unchecked

                return {
                    ...prevState,
                    industry: updatedIndustries,
                };
            });
        } else {
            // Handle regular input fields (email, phone number)
            setInvestorDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Handle form submission (register investor)
    const registerInvestor = async () => {
        setLoading(true);
        try {
            const resp = await CreateInvestorAccount(investorDetails);
            if (resp && resp.data && resp.data.success) {
                toast.success('Your Profile has been created successfully. ' + resp.data.message);
                onRegister(); // Trigger onRegister callback after successful registration
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error('An error occurred: ' + (error.response?.data?.message || error.message));
            if (error.response.data.message === 'Investor Profile Already Created') {
                setTimeout(() => {
                    router.push('/investor/dashboard');
                }, 3000);
            }
        }
    };

    // Handle form submission (validate and submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (investorDetails.industry.length >= 3) {
            registerInvestor(); // Proceed to register if at least 3 industries are selected
        } else {
            toast.error('Please select at least 3 options for Industry.');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 lg:inset-x-[7rem] z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg rounded-xl p-6 bg-white duration-300 ease-out">
                        <div className="flex justify-between my-6">
                            <DialogTitle as="h3" className="text-lg font-semibold">
                                Create Investor Account
                            </DialogTitle>
                            <CloseCircle size="30" color="black" onClick={onClose} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                name="contact_email"
                                onChange={handleChange}
                                value={investorDetails.contact_email}
                                placeholder="Enter your email address"
                                className={clsx(
                                    'border border-gray-400 block w-full rounded-lg py-4 px-3 text-sm font-semibold mb-3'
                                )}
                            />

                            {/* Phone Number Input */}
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input
                                type="tel"
                                name="contact_phone_number"
                                onChange={handleChange}
                                value={investorDetails.contact_phone_number}
                                placeholder="+12345678923"
                                className={clsx(
                                    'block w-full rounded-lg py-4 px-3 text-sm font-semibold mb-3 border border-gray-400'
                                )}
                            />

                            {/* Select Industry */}
                            <div>
                                <label className="text-lg font-medium">Select Industry (At least 3)</label>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    {options.map((option) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="industry"
                                                value={option.value}
                                                checked={investorDetails.industry.includes(option.value)}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <label className='text-gray-600 cursor-pointer'>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                                {investorDetails.industry.length < 3 && (
                                    <div className="text-red-500 text-sm">
                                        Please select at least 3 options.
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="w-full flex flex-col lg:flex-row lg:gap-4">
                                <Button
                                    onClick={onClose}
                                    className="w-full lg:w-[200px] rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-4 text-md mt-6"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-4 text-md text-white mt-6"
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </Button>
                            </div>
                        </form>
                        <Toaster />
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default InvestorFormModal;
