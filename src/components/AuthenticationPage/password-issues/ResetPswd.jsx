import React, { useRef, useEffect } from 'react';
import '../auth.css';
import { useRouter } from '../../../Routes/router';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLocation, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPswd = () => {
  const {ResetPswd} = useAuth();
  const location = useLocation();
  const { search } = location;
  const query = new URLSearchParams(search);
  const token = query.get('token');
  const email = query.get('email');



  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Token:', token);
      console.log('Email:', email);
      try{
        const response = await ResetPswd(email, token, values.password)
        if(response){
        toast.success('password reset succesful')
      }
    }catch(error){
      if(error.response.status === 400){
        toast.error('Error Occurred')
      }
    }finally{
      
      setSubmitting(false);
    }
  },
})

  const router = useRouter();
  const verifyCode = (e) => {
    e.preventDefault();
    //collect input value
    router.push('/success');
  };

  

  return (
    <div>
      <main className='bg h-screen w-screen overflow-y-auto flex items-center justify-center'>
        <div className='vector'>
        <div className='flex justify-center p-6 items-center'>
          <span><img src="images/pay.png" alt="pay" /></span>
          <span><img src="images/curve.png" alt="curve" className='h-9 relative right-8' /></span>
          <span><img src="images/angle.png" className='h-5 relative right-10 -top-8' alt="arrow" /></span>
          <span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3 relative right-12'>ayloow</span>
        </div>
          <div className='bg-white w-[90vw] h-[400px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col items-center'>
            <header className='my-9'>
              <h4 className='flex justify-center font-poppins text-2xl font-semibold text-primary-text leading-9'>Verification</h4>
              <h6 className='flex justify-center text-lg font-poppins leading-7 font-medium text-primary-text'>enter your new password</h6>
            </header>
            <main className='-mt-3'>
              <form  onSubmit={formik.handleSubmit}>
              <div className='flex flex-col gap-3 w-[55vw]  max-w-md'>
                <label htmlFor='email' className='text-primary-text text-[14px] font-medium'>New Password</label>
                <input
                  id="outlined-required-4"
                  placeholder='Enter new password'
                  type='password'
                  fullWidth
                  className='border-b border-blue-300'
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}

              </div>
            <div className='w-full flex justify-center mt-8'>
              <button type="submit" disabled={formik.isSubmitting}  className="h-[55px] w-[80%] bg-[#3369F4] rounded-lg p-4 text-white py-2">
                Next
              </button>
            </div>

              </form>
              <ToastContainer
                    position='top-center' autoClose={5000} className='w-[100%]'
                />
            </main>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPswd;