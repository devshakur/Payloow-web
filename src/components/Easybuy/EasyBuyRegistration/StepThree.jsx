import React, { useState } from 'react'
import { useRouter } from '../../../Routes/router'


const StepThree = ({ formik }) => {
  
    const router = useRouter();

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        await formik.handleSubmit()
        if (formik.isValid && formik.dirty) {
            
        }
    }

    return (
        <div>

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
