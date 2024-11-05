import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import '../../auth.css';
import useBills from '../../../../hooks/useBills';
import { useRouter } from '../../../../Routes/router';



const SetPin = ({ handleSuccess }) => {
    const { SetPins } = useBills();
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            pin: '',
            confirmPin: '',
        },
        validationSchema: Yup.object({
            pin: Yup.string().required('Required'),
            confirmPin: Yup.string()
                .oneOf([Yup.ref('pin'), null], 'Pins must match')
                .required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { ...data } = values
                const response = await SetPins(data)
                if (response) {
                    toast.success('Pin set Suscessfully!');
                    handleSuccess();
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to set PIN. Please try again.');
            }
            setSubmitting(false);
        },
    });
    const skipPin = () => {
        router.push('/dashboard')
    }

    return (
        <main className='bg h-screen w-screen overflow-y-auto'>
            <div className='vectors'>
                <div className='flex justify-center p-4 mt-9 items-center'>
                    <span><img src="images/pay.png" alt="" /></span>
                    <span><img src="images/curve.png" className='h-9 relative right-8' alt="" /></span>
                    <span><img src="images/angle.png" className='h-5 relative right-10 -top-8' alt="arrow" /></span>
                    <span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3 relative right-12'>ayloow</span>
                </div>
                <div className='bg-white w-[90vw] max-w-lg p-6 rounded-lg shadow-lg flex flex-col'>
                    <h4 className='flex justify-center font-poppins text-2xl font-bold text-primary-text'>Set Up Your Transaction Code</h4>
                    <h6 className='flex justify-center text-xl font-poppins font-medium text-primary-text text-center leading-7'>To secure your transactions, please set up a transaction code.</h6>
                    <form onSubmit={formik.handleSubmit} className='grid gap-4 mt-8'>
                        <div>
                            <label htmlFor='pin' className='text-primary-text text-[14px] font-medium'>Transaction Code</label>
                            <input
                                id="pin"
                                placeholder='Enter Pin'
                                type='password'
                                {...formik.getFieldProps('pin')}
                                className='input-field'
                            />
                            {formik.touched.pin && formik.errors.pin ? (
                                <div>{formik.errors.pin}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor='confirmPin' className='text-primary-text text-[14px] font-medium'>Confirm Pin</label>
                            <input
                                id="confirmPin"
                                placeholder='Confirm Pin'
                                type='password'
                                {...formik.getFieldProps('confirmPin')}
                                className='input-field'
                            />
                            {formik.touched.confirmPin && formik.errors.confirmPin ? (
                                <div>{formik.errors.confirmPin}</div>
                            ) : null}
                        </div>

                        <button type="submit" disabled={formik.isSubmitting} className="h-[55px] bg-[#3369F4] rounded-lg p-4 text-white py-2">
                            Set Code
                        </button>
                        <button type="button" onClick={skipPin} className="h-[55px] bg-white rounded-lg p-4 text-[#3369F4] border  border-[#3369F4] mt-2">
                            Skip for now
                        </button>
                    </form>
                    <Toaster />
                </div>
            </div>
        </main>
    );
};

export default SetPin;
