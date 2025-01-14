import React, {useState} from 'react'
import { Description, Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from '../../../Routes/router'

const BuyersSuccessModal = ({ isOpen, setIsOpen }) => {
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/buyers/dashboard')
        setIsOpen(false)
    }
  return (
    <div>
              <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <DialogBackdrop className="fixed inset-0 bg-black/30" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    {/* The actual dialog panel */}
                    <DialogPanel className="max-w-xl space-y-4 bg-white p-12">
                        <DialogTitle className="flex justify-center">
                            <img src="/images/success.png" alt="success" />
                        </DialogTitle>
                        <Description className='font-poppins font-semibold text-md text-center text-[#1D2433]'>
                            Your buyer profile is now complete. You’re all set to explore our products and enjoy flexible payment options. Happy shopping!
                        </Description>
                        <div className="flex flex-col justify-center gap-4 md:flex-row">
                            <button className='border border-blue-500 w-[16rem] rounded-md text-blue-700 py-2' onClick={handleDashboard}>Start Shopping</button>
                            <button className='bg-blue-800 w-[16rem] text-white py-2 rounded-md' onClick={handleDashboard}>Done</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
    </div>
  )
}

export default BuyersSuccessModal
