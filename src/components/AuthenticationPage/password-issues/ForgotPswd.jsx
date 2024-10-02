import React, { useState } from 'react';  
import '../auth.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from '../../../Routes/router';

function ForgotPswd() {  
  const {ForgetPswd} = useAuth();
  const router = useRouter()
  
  const formik = useFormik({
    initialValues: {
        email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'), 
    }),
  
    onSubmit:  async (values, { setSubmitting }) => {    
        try {  
          const response = await ForgetPswd(values)
          if (response) {
            toast.success('Code Sent')
            setTimeout(() => {
                router.push('/verification');
            }, 6000);
        }
        } catch (error) {  
          if(error.response.status === 400){
            toast.error('Email not Found')
          }
        }  
        setSubmitting(false);  
      },
  })
  return (   
      <div>  
       <main className='bg h-screen w-screen overflow-y-auto flex items-center justify-center'>
      <div className='vectors'>
        <div className='flex justify-center p-6 items-center'>
          <span><img src="images/pay.png" alt="" /></span>
          <span><img src="" alt="" /></span>
          <span><img src="" alt="" /></span>
          <span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3'>ayloow</span>
        </div>
            <div className='bg-white w-[90vw] h-[400px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col'>
            <form onSubmit={formik.handleSubmit} className='w-[100%] flex flex-col justify-center gap-6'>
            <h4 className='flex justify-center font-poppins text-2xl font-semibold leading-9  text-primary-text'>Forgot Password</h4>
              <h6 className='flex justify-center text-lg font-poppins leading-7 -mt-3 font-medium text-primary-text'>Enter your registered Email</h6>
              <div>
            <label htmlFor='password' className='text-primary-text text-[14px] font-medium'>Email</label>
                    <input
                        id="outlined-required-4"
                        placeholder='Enter Your Email'
                        type='email'
                        fullWidth
                        {...formik.getFieldProps('email')}
                        className='input-field'
                    /> 
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{color: 'red'}}>{formik.errors.email}</div>
                    ) : null}
                    </div>
                    <button type="submit" disabled={formik.isSubmitting} className="h-[55px] bg-[#3369F4] rounded-lg p-4 text-white py-2">
                        {formik.isSubmitting ? 'Sending...' : 'Send Code'}
                    </button>
              </form>
              <ToastContainer
                    position='top-center' autoClose={5000} className='w-[100%]'
                />
            </div>
            </div>
            </main>
      </div>  
  );  
}  

export default ForgotPswd;