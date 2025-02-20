import React from 'react'
import { Link } from 'react-router-dom'
import RegisterHeaders from './RegisterHeaders'
import PasswordInput from './PasswordInput'

const RegisterOne = ({ formik, handleNextPage }) => {
  const validateField = () => {
    const { values } = formik
    const { country, state, address, role, ...others } = values
    const val = Object.values(others).filter(v => v.length === 0)
    if (val.length > 0) {
      formik.submitForm()
      
    } else {
      formik.setErrors({ errors: {} })
      handleNextPage();
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center overflow-y-auto'>
        <div className='bg-white w-[90vw]  max-w-xl p-6 rounded-lg shadow-lg flex flex-col'>
          <RegisterHeaders currentIndex={0} />
          <div className='mt-2'>
            <label htmlFor='firstName' className='text-primary-text text-[14px] font-semibold font-plus-jakarta'>First Name <span className='text-red-700'>*</span></label>
            <input
              id="outlined-required-1"
              placeholder="First Name"
              type="text"
              name="firstName"
              autoComplete='username'
              {...formik.getFieldProps('firstName')}
              className='input-field'
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="LastName" className='text-primary-text text-[14px] font-semibold font-plus-jakarta'>Surname<span className='text-red-700'>*</span></label>
            <input
              id="outlined-required-2"
              placeholder='Surname'
              type='text'
              name='lastName'
              autoComplete='username'
              {...formik.getFieldProps('lastName')}
              className='input-field'
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <PasswordInput formik={formik} />

          {/* <div>
            <label htmlFor="Password" className='text-primary-text text-[14px] font-semibold font-plus-jakarta'>Password<span className='text-red-700'>*</span></label>
            <input
              id="outlined-required-5"
              placeholder='Create Password'
              type='password'
              name='password'
              autoComplete='current-password'
              {...formik.getFieldProps('password')}
              className='input-field'
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.password}</div>
            ) : null}
          </div> */}

          <div>
            <label htmlFor="phone" className='text-primary-text text-[14px] font-semibold font-plus-jakarta'>Phone Number<span className='text-red-700'>*</span></label>
            <input
              id="outlined-required-4"
              placeholder='Mobile No.'
              name='phone'
              type='phone'
              {...formik.getFieldProps('phone')}
              className='input-field'
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.phone}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className='text-primary-text text-[14px] font-semibold font-plus-jakarta'>Email<span className='text-red-700'>*</span></label>
            <input

              id="outlined-required-3"
              placeholder='ex:myname@gmail.com'
              type='email'
              name='email'
              autoComplete='username'
              fullWidth
              {...formik.getFieldProps('email')}
              className='input-field'
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className='w-full'>

            <button type='button' className="h-[50px] w-[100%] font-poppins my-3 rounded-lg bg-blue-500 text-white p-4" onClick={validateField}>
              Next
            </button>
          </div>
          <div>
            <div className='flex justify-center items-center'>
              <span className='flex-grow h-px bg-[#e9ecef]'></span>
              <span className='mx-2 font-normal text-[18px] text-primary-text'>OR</span>
              <span className='flex-grow h-px bg-[#e9ecef]'></span>
            </div>
          </div>
          <div className='flex justify-center font-medium text-[14px] leading-5'>Already have an account? <Link to={'/login'}><span className='text-[#3369F4] ml-1'>Log in
          </span></Link></div>
        </div>
      </div>
    </div>
  )
}

export default RegisterOne