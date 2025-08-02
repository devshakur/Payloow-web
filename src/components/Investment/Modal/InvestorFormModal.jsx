import React, { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Label, Input } from '@headlessui/react';
import { CloseCircle } from 'iconsax-react';
import clsx from 'clsx';
import '../investment.css';
import { Toaster, toast } from 'react-hot-toast';
import useInvestment from '../../../hooks/useInvetment';
import { useRouter } from '../../../Routes/router';
import '../investment.css'
import useAuth from '../../../hooks/useAuth';

const InvestorFormModal = ({ isOpen, onClose, onRegister }) => {
    const { CreateInvestorAccount } = useInvestment();
    const {GetUser,  setUser} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const phone = user?.phone ? `+234${typeof user.phone === 'string' && user.phone.startsWith('234') ? user.phone.slice(3) : user.phone}` : '';
    const [investorDetails, setInvestorDetails] = useState({
        email: user?.email || '',
        phoneNumber: phone || '',
        industries: [], // Stores selected industries
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
                    ? [...prevState.industries, value] // Add industries if checked
                    : prevState.industries.filter((industries) => industries !== value); // Remove industries if unchecked

                return {
                    ...prevState,
                    industries: updatedIndustries,
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
            setLoading(false); // Ensure loading is set to false after the API call

            if (resp && resp.data && resp.data.success) {
                toast.success('Your Profile has been created successfully. ' + resp.data.message);
                const updatedUser = await GetUser();
                setUser(updatedUser);
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                onRegister();
                router.push('/investor/dashboard'); // Redirect to investor dashboard
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            setLoading(false); // Ensure loading is set to false in case of an error
            const errorMsg = error.response?.data?.error || error.message;
            if (errorMsg === "Investor Profile Already Created") {
                toast.error("Investor profile already exists.");
                  router.push('/investor/dashboard');
            } else {
                toast.error('An error occurred: ' + errorMsg);
                  router.push('/investor/dashboard');
            }
        }
    };

    // Handle form submission (validate and submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (investorDetails.industries.length >= 3) {
            registerInvestor(); // Proceed to register if at least 3 industries are selected
        } else {
            toast.error('Please select at least 3 options for Industries.');
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
                                name="email"
                                onChange={handleChange}
                                value={investorDetails.email}
                                placeholder="Enter your email address"
                                className={clsx(
                                    'border border-gray-400 block w-full rounded-lg py-4 px-3 text-sm font-semibold mb-3'
                                )}
                            />

                            {/* Phone Number Input */}
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input
                                type="tel"
                                name="phoneNumber"
                                onChange={handleChange}
                                value={investorDetails.phoneNumber}
                                placeholder="+12345678923"
                                className={clsx(
                                    'block w-full rounded-lg py-4 px-3 text-sm font-semibold mb-3 border border-gray-400'
                                )}
                            />

                            {/* Select Industries */}
                            <div>
                                <label className="text-lg font-medium">Select Industries (At least 3)</label>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    {options.map((option) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="industries"
                                                value={option.value}
                                                checked={investorDetails.industries.includes(option.value)}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <label className='text-gray-600 cursor-pointer'>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                                {investorDetails.industries.length < 3 && (
                                    <div className="text-red-500 text-sm">
                                        Please select at least 3 options.
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="w-full flex flex-col lg:flex-row lg:gap-4">
                               
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-4 text-md text-white mt-6"
                                >
                                    {loading ? 'Registering User...' : 'Register'}
                                </Button>
                                <Button
                                    onClick={onClose}
                                    className="w-full lg:w-[200px] rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-4 text-md mt-6"
                                >
                                    Cancel
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
