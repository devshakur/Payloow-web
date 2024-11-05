import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from '@headlessui/react';
import { useRouter } from '../../../Routes/router';

const SuccessModal = ({ isOpen, onClose }) => {
   
    const [success, setIssuccess] = useState(false)
    const navigate = useRouter()
    const moveToDashboard = ()=>{
        setIssuccess(true)
        navigate.push('/debtor/dashboard')
    }
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0  flex items-center justify-center">
                <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6">
                    <DialogTitle as="h3" className="text-lg font-medium flex justify-center">
                        <img src="/images/success.png" alt="success" />
                    </DialogTitle>
                    <p className="mt-2 text-xl font-medium text-center">Youre all set! Now you can start adding your business loans. Lets grow your financial journey together..</p>
                    <div className="mt-8 flex justify-center">
                        <Button onClick={moveToDashboard} className="w-full lg:w-1/2 bg-blue-600 text-white py-2 px-6 rounded">Done</Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default SuccessModal
