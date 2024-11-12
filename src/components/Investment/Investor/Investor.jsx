import React, { useState, useEffect } from 'react';
import { Copy, Briefcase } from 'iconsax-react';
import InvestorLayoutPage from './InvestorLayoutPage';
import { SliderVertical1 } from 'iconsax-react';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';
import useInvestment from '../../../hooks/useInvetment';
import SkeletonLoader from '../../Skeleton/SkeletalLoading';
import { Toaster, toast } from 'react-hot-toast';
import InvestModal from './InvestModal';

const Investor = () => {
    const { GetLoanBusiness, InvestInBusiness, getUserDetails } = useInvestment();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [verifying, setVerifying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [wallet, setWallet] = useState({});
    const [getId, setGetId] = useState(''); // Holds the business ID selected
    const [formData, setFormData] = useState({
        business_id: '',
        investment_amount: 0,
        expected_roi: 0,
        repayment_term: 0
    });

    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const businessDetails = async () => {
            try {
                const resp = await GetLoanBusiness();
                let info = resp.data.data.businesses;
                console.log(info);
                setData(info);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch information on business:", error);
                setIsLoading(false);
            }
        };

        businessDetails();
    }, []);

    useEffect(() => {
        const userDetails = async () => {
            try {
                const resp = await getUserDetails();
                let info = resp.data.data;
                let balance = resp.data.data.wallet
                if(info){
                    setUser(info)
                    setWallet(balance)

                }
            } catch (error) {
                console.error("Failed to fetch information on User:", error);
            }
        };

        userDetails();
    }, []);

    // Function to open the modal and set the selected business ID
    const handleGetId = (id) => {
        console.log('Selected business ID:', id);
        open();
        setGetId(id);
        setFormData((prevData) => ({ ...prevData, business_id: id })); // Update business_id in formData
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const invest = async () => {
        try {
            setVerifying(true);
            const resp = await InvestInBusiness(formData);
            if (resp?.data?.data) {
                toast.success('Investment successful');
                close(); // Close the modal
            }
        } catch (error) {
            console.error("Error investing:", error);


            if (error?.response) {

                const errorMessage = error.response?.data?.message || "Unknown error occurred";
                toast.error(errorMessage); 
                setVerifying(false);
                setTimeout(() => {
                    close();
                    
                }, 2000);
            } else {

                console.log("Error message: Network issue or server down");
            }
        }
    };


    const handleInvest = () => {
        invest();
    };

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return (
        <InvestorLayoutPage>
            <h4 className='font-poppins text-2xl font-medium'>Welcome, Mayowa</h4>
            <div className='flex justify-between'>
                <p className='font-poppins text-lg font-normal my-3 text-[#000000]'>Explore and Invest in Growing Businesses!</p>
                <Button className='px-8 h-12 rounded-lg text-lg text-white bg-[#3369F4]'>
                    {isLargeScreen ? 'Invest Now' : '+'}
                </Button>
                <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-xl rounded-xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                                <div className='flex justify-between my-6 items-center mx-5'>
                                    <DialogTitle as="h3" className="text-xl  py-4 font-semibold">
                                        Invest Now
                                    </DialogTitle>
                                    <CloseCircle size="30" color="black" onClick={close} />
                                </div>
                                <InvestModal formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleInvest={handleInvest}
                                    onCancel={close} 
                                    verifying={verifying}
                                    />
                                <Toaster />
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

            <main className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <section className='md:col-span-2'>
                    <div className="w-full md:max-w-6xl p-6 border border-gray-200 rounded-lg shadow bg-[#1E3DD7] dark:border-blue-700">
                        <a href="#">
                            <h5 className="-mt-2 mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Available Balance</h5>
                        </a>
                        <p className="mb-4 font-medium text-2xl text-white">₦{wallet.balance}</p>
                        <div className='flex items-center gap-1'>
                            <p className='text-white font-medium text-sm my-3'>Wema bank: 4054673854</p>
                            <Copy size="17" color="white" />
                        </div>
                        <div className='mt-6'>
                            <button href="#" className="w-full flex justify-center items-center md:py-3 py-3 text-sm font-semibold text-[#0099FF] bg-white rounded-lg">
                                Fund Wallet
                            </button>
                        </div>
                    </div>

                    <div className='md:flex gap-5'>
                        <div className='bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Total Investment</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 font-poppins font-[600]'>₦0</p>
                        </div>
                        <div className='bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Returns</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 font-poppins font-[600]'>₦0</p>
                        </div>
                    </div>

                    <div className='bg-white'>
                        <header className='flex justify-between'>
                            <h4 className='font-semibold font-poppins text-2xl'>Active Investments</h4>
                            <h4 className='text-blue-600 font-medium text-lg'>view all</h4>
                        </header>
                        <ul className='flex justify-between bg-[#F1F3F9] py-3 my-4'>
                            <li className='text-[#000000] text-lg font-medium font-poppins'>Business</li>
                            <li className='text-[#000000] text-lg font-medium font-poppins'>Progress</li>
                            <li className='text-[#000000] text-lg font-medium font-poppins'>Status</li>
                            <li><img src="/images/verticalline.png" alt="vertical" className='relative right-4' /></li>
                        </ul>

                        {/* Show skeleton loader when data is still loading */}
                        {isLoading ? (
                            <SkeletonLoader />
                        ) : (
                            data.map((item) => (
                                <div key={item.id} className='flex justify-between gap-7 mx-4 mb-4 border-b border-gray-200'>
                                    <p className=''>{item.business_name}</p>
                                    <img src='/images/Progress-bar.png' className='w-auto h-3' alt="bar" />
                                    <p className='text-md font-normal font-poppins text-[#F37426]'>Active</p>
                                    <span><img src='/images/verticalline.png' alt="line" /></span>
                                </div>
                            ))
                        )}
                    </div>
                </section>
                <article className='bg-white shadow-md p-5 rounded-md md:h-auto'>
                    <header className='flex justify-between items-center'>
                        <h4 className='font-poppins lg:font-medium lg:text-xl md:text-sm md:font-semibold'>Investment Requests</h4>
                        <a href="#" className='text-blue-500 lg:text-lg md:text-sm md:font-semibold'>See all</a>
                    </header>

                    {/* Show skeleton loader while data is loading */}
                    {isLoading ? (
                        <SkeletonLoader />
                    ) : (
                        data.map((item) => (
                            <div className='bg-[#F8F9FC] mt-3 rounded-lg' key={item.id}>
                                <div className='flex justify-between py-4 mx-3'>
                                    <p className='font-bold font-poppins'>Businesses</p>
                                    <p className='text-blue-500 font-medium'>Explore</p>
                                </div>
                                <div className='h-9 w-9 mx-3 flex justify-center items-center bg-gray-300 rounded-[50%]'>
                                    <SliderVertical1 size="22" color="blue" />
                                </div>
                                <h3 className='font-poppins font-medium text-xl mx-3 my-3'>{item.business_name}</h3>
                                <p className='font-poppins font-medium text-lg mx-4 leading-7'>{item.business_description}</p>
                                <div className='w-full'>
                                    <button onClick={() => handleGetId(item.business_id)} className='w-[90%] mx-4 my-6 bg-blue-600 py-2 font-poppins font-medium text-white rounded-md'>
                                        Invest Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </article>
            </main>
        </InvestorLayoutPage>
    );
};

export default Investor;
