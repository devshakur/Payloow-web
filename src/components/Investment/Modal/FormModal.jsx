

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label
} from '@headlessui/react';
import { CloseCircle } from "iconsax-react";
import clsx from 'clsx';
import '../investment.css';
import useInvestment from '../../../hooks/useInvetment';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from '../../../Routes/router';
import useAuth from '../../../hooks/useAuth';

const FormModal = ({ isOpen, onClose, onRegister }) => {
  const { CreateDebtorAccount } = useInvestment();
  const { setUser, GetUser } = useAuth(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const phone = `${'+234' + user?.phone}`;
  const [debtorDetails, setDebtorDetails] = useState({
    contactEmail: user?.email || '',
    contactPhoneNumber: phone || '',
    proofOfCreditScore: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files) {
      setDebtorDetails({
        ...debtorDetails,
        [name]: Array.from(files), // allow multiple files
      });
    } else {
      setDebtorDetails({
        ...debtorDetails,
        [name]: value,
      });
    }
  };

  const registerDebtor = async () => {
    try {
      const formData = new FormData();

      formData.append('contactEmail', debtorDetails.contactEmail);
      formData.append('contactPhoneNumber', debtorDetails.contactPhoneNumber);

      // Append each selected file
      if (debtorDetails.proofOfCreditScore.length > 0) {
        debtorDetails.proofOfCreditScore.forEach((file, index) => {
          formData.append('proofOfCreditScore', file);
        });
      }

      setLoading(true);
      const resp = await CreateDebtorAccount(formData);

      if (resp?.data?.success) {
        toast.success('Your Profile has been created successfully: ' + resp.data.message);

     const updatedUser = await GetUser();
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setLoading(false);
        onClose();
        onRegister();
      } else {
        toast.error(resp?.data?.message || 'Something went wrong.');
        setLoading(false);
      }
    } catch (error) {
      toast.error('An error occurred: ' + error?.response?.data?.message);
      setLoading(false);

      if (error?.response?.data?.message === 'Debtor Profile Already Created') {
        setTimeout(() => {
          router.push('/debtor/dashboard');
        }, 3000);
      }
    }
  };

  console.log(user?.investmentRole);
  

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
              <DialogTitle as="h3" className="text-xl font-plus-jakarta font-medium">
                Create Debtor Account
              </DialogTitle>
              <CloseCircle size="30" color="black" onClick={onClose} />
            </div>

            <form>
              <Field>
                <Label className='text-sm font-medium'>Email</Label>
                <Input
                  type='email'
                  name='contactEmail'
                  onChange={handleChange}
                  value={debtorDetails.contactEmail}
                  placeholder='Enter your email address'
                  className={clsx(
                    'border border-gray-400 block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3',
                  )}
                />
                <Label className='text-sm font-medium'>Phone Number</Label>
                <Input
                  type='tel'
                  name='contactPhoneNumber'
                  onChange={handleChange}
                  value={debtorDetails.contactPhoneNumber}
                  placeholder='+234xxxxxxxxxx'
                  className={clsx(
                    'block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3 border border-gray-400',
                  )}
                />
                <Label className='text-sm font-medium'>Proof of Credit Score</Label>
                <Input
                  type="file"
                  name='proofOfCreditScore'
                  onChange={handleChange}
                  multiple
                  className={clsx(
                    'block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3 border border-gray-400',
                  )}
                />
              </Field>

              <div className='w-full flex flex-col lg:flex-row lg:gap-4'>
                <Button
                  type="button"
                  onClick={registerDebtor}
                  disabled={loading}
                  className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                  {loading ? 'Registering User...' : 'Register'}
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  className="w-full lg:w-[200px] rounded-lg bg-white border text-blue-500 border-gray-300 py-2 px-2 text-md mt-6"
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

export default FormModal;
