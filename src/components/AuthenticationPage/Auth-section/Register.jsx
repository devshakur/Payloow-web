import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from '../../../Routes/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/fira-sans'
import '../auth.css'
import RegisterOne from './RegisterOne'
import RegisterTwo from './RegisterTwo'
import useAuth from '../../../hooks/useAuth'



function Register() {
  const { RegisterUser } = useAuth();
  const [formInput, setFormInput] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    address: '',
    identify: ''
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPage = () => {
    setCurrentIndex(currentIndex + 1)
  }

  const router = useRouter()



  const formik = useFormik({
    initialValues: formInput,
    validationSchema: Yup.object({
      firstName: Yup.string("field must be a text").required('Required'),
      lastName: Yup.string().required('Required'),
      password: Yup.string().required('Required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number'),
      phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      country: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      identify: Yup.string().required('Required'),
    }),
    
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { identify, ...payload } = values
        const resp = await RegisterUser(payload)
        if (resp) {
          toast.success('Congratulation you have been successfully registered go to Login')
          setTimeout(() => {
            router.push('/login') 
        }, 6000);
        }
      } catch (error) {
        if (error) {
          toast.error('Failed to Register User')
          setTimeout(() => {
            router.reload();
        }, 6000);   
        }
      }
      setSubmitting(false);
    },
  });
  return (
    <main className='bg h-screen w-screen overflow-y-auto'>
      <div className='vector'>
        <div className='flex justify-center p-6 items-center'>
          <span><img src="images/pay.png" alt="" /></span>
          <span><img src="" alt="" /></span>
          <span><img src="" alt="" /></span>
          <span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3'>ayloow</span>
        </div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col'>
              {currentIndex === 0 ?
                <RegisterOne formik={formik} handleNextPage={handleNextPage} /> : <RegisterTwo formik={formik} />}
            </form>
            <ToastContainer
              position='top-center' autoClose={5000} className='w-[100%]'

            />
        </div>
      
    </main>
  )
}

export default Register

