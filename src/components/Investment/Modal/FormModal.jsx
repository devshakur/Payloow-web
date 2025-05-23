import React, { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';
import '../investment.css';
import useInvestment from '../../../hooks/useInvetment';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from '../../../Routes/router';


const FormModal = ({ isOpen, onClose, onRegister }) => {
    const { CreateDebtorAccount } = useInvestment();
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const [debtorDetails, setDebtorDetails] = useState({
        contact_email: '',
        contact_phone_number: '',
        credit_profile: {
            credit_score: 0,
            proof_of_credit_score: '',
        },
    })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file' && files) {
            setDebtorDetails({
                ...debtorDetails,
                credit_profile: { ...debtorDetails.credit_profile, [name]: files[0] }, 
            });
        } else {
            setDebtorDetails({
                ...debtorDetails,
                [name]: value, // Handle text input as usual
            });
        }
    };
    


    const registerDebtor = async () => {
        try {
           
            const formData = new FormData();

          
            formData.append('contact_email', debtorDetails.contact_email);
            formData.append('contact_phone_number', debtorDetails.contact_phone_number);

            if (debtorDetails.credit_profile.proof_of_credit_score) {
                formData.append('proof_of_credit_score', debtorDetails.credit_profile.proof_of_credit_score);
            }

            
            formData.append('credit_score', debtorDetails.credit_profile.credit_score);

            // Make the API request using FormData
            const resp = await CreateDebtorAccount(formData);
            setLoading(true)
            if (resp && resp.data && resp.data.success) {
                toast.success('Your Profile has been created successfully' + resp.data.message);
                setLoading(false)
                onClose();
                onRegister();
            } else {
                toast.error(resp.data.message);
            }

          
        } catch (error) {
            toast.error('An error occurred: ' + error.response?.data?.message);
              setLoading(false)
            if (error.response?.data?.message === 'Debtor Profile Already Created') {
                setTimeout(() => {
                    router.push('/debtor/dashboard');
                }, 3000);
            }
        }
    };



    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 lg:inset-x-[7rem] z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-lg rounded-xl p-6 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)]"
                    >
                        <div className='flex justify-between my-6'>
                            <DialogTitle as="h3" className="text-base/7 font-medium">
                                Create Debtor Account
                            </DialogTitle>
                            <CloseCircle size="30" color="black" onClick={onClose} />
                        </div>
                        <form>
                            <Field>
                                <Label className='text-sm font-medium'>Email</Label>
                                <Input
                                    type='email'
                                    name='contact_email'
                                    onChange={handleChange}
                                    value={debtorDetails.contact_email}
                                    placeholder='Enter your email address'
                                    className={clsx(
                                        'border border-gray-400 block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                                    )}
                                />
                                <Label className='text-sm font-medium'>Phone Number</Label>
                                <Input
                                    type='tel'
                                    name='contact_phone_number'
                                    onChange={handleChange}
                                    value={debtorDetails.contact_phone_number}
                                    placeholder='+12345678923'
                                    className={clsx(
                                        'block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3 border border-gray-400',
                                    )}
                                />
                                <Label className='text-sm font-medium'>Proof of Credit Score</Label>
                                <Input
                                    type="file"
                                    name='proof_of_credit_score'
                                    onChange={handleChange} 
                                    placeholder='Upload your credit score'
                                    className={clsx(
                                        'block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3 border border-gray-400',
                                    )}
                                />
                            </Field>


                            <div className='w-full flex flex-col lg:flex-row lg:gap-4'>
                                <Button
                                    onClick={() => {
                                        setLoading(true)
                                        registerDebtor();
                                        // onClose();  Close the FormModal
                                    }}
                                    className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                                >
                                    {loading ? 'Registering User' : 'Register'}
                                </Button>
                                <Button onClick={onClose} className="w-full lg:w-[200px] rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-2 text-md mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
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

export default FormModal;
