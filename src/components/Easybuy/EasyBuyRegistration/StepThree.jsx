import React, { useState } from 'react'
import { Description, Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from '../../../Routes/router'

const StepThree = ({ formik }) => {
    let [isOpen, setIsOpen] = useState(false)
    const router = useRouter();

    const handleDashboard = () => {
        router.push('/buyers/dashboard')
        setIsOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await formik.handleSubmit()
        if (formik.isValid && formik.dirty) {
            
           //  setIsOpen(true)  Opens the success dialog when form is submitted
        }
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

            <div className='flex justify-center'>
                <div className='bg-white w-[90%] max-w-3xl rounded-xl shadow-lg pb-10'>
                    <form onSubmit={handleSubmit} className='my-3 flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="employment" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Employment Status</label>
                            <select
                                name='employmentStatus'
                                id='employmentStatus'
                                placeholder='employment'
                                className='border mx-5 p-2 rounded-md focus:outline-none'
                                onChange={formik.handleChange}
                                value={formik.values.employmentStatus}
                            >
                                <option value="Choose">Choose</option>
                                <option value="Employed">Employed</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Self-Employed">Self-Employed</option>
                                <option value="Enterprenuer">Enterprenuer</option>
                            </select>
                            {formik.touched.employmentStatus && formik.errors.employmentStatus ? (
                                <div className="text-red-500">{formik.errors.employmentStatus}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="income" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Monthly/ Annual Income</label>
                            <input
                                name='income'
                                id='income'
                                type="text"
                                placeholder='Income'
                                className='border mx-5 p-2 rounded-md focus:outline-none'
                                onChange={formik.handleChange}
                                value={formik.values.income}
                            />
                            {formik.touched.income && formik.errors.income ? (
                                <div className="text-red-500">{formik.errors.income}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="easyBuyRole" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Role</label>
                            <select
                                name='easyBuyRole'
                                id='easyBuyRole'
                                placeholder='Role'
                                className='border mx-5 p-2 rounded-md focus:outline-none'
                                onChange={formik.handleChange}
                                value={formik.values.easyBuyRole}
                            >
                                 <option value="choose">Choose</option>
                                <option value="buyer">Buyer</option>
                                <option value="partner">Partner</option>
                               
                            </select>
                            {formik.touched.easyBuyRole && formik.errors.easyBuyRole ? (
                                <div className="text-red-500">{formik.errors.easyBuyRole}</div>
                            ) : null}
                        </div>
                        <div className='mx-5'>
                            <p className='font-poppins text-md font-medium'>
                                By checking this box, you confirm that the information you've provided is accurate. Please note that for installment purchases, your details (including NIN and BVN) are securely verified to ensure eligibility. Review our terms and conditions for more details on payment plans, refund policies, and data privacy measures.
                            </p>
                        </div>
                        <div className='mx-6 flex gap-2'>
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                id="termsAccepted"
                                onChange={formik.handleChange}
                                checked={formik.values.termsAccepted}
                            />
                            <p>I have read and agree to the website terms and conditions *</p>
                        </div>
                        {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
                            <div className="text-red-500">{formik.errors.termsAccepted}</div>
                        ) : null}
                        <div className='bg-blue-800 py-2 flex justify-center mx-6'>
                            <button type="submit" className='text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StepThree
