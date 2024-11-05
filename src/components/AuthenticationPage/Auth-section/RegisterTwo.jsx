import React from 'react'
import '../auth.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import RegisterHeaders from './RegisterHeaders'
import Select from 'react-select';

function RegisterTwo({ formik }) {
  const Country = [
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'USA', label: 'USA' }
  ]

  const States = [
    { value: 'Abuja', label: 'FCT' },
    { value: 'Kano', label: 'Kano' },
    { value: 'Lagos', label: 'Lagos' }
  ]
  const register = [
    { value: 'user', label: 'User' },
    { value: 'Tutor', label: 'Tutor' },
  
  ]
  return (
    <div>
      <div className='flex justify-center items-center overflow-y-auto'>
        <div className='bg-white w-[90vw] h-[760px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col'>
          <RegisterHeaders currentIndex={1} />
          <div className='mb-4'>
            <label htmlFor="country" className='text-primary-text text-[16px] font-medium -pb-8'>Country</label>
            <Select
              id="country"
              name="country"
              options={Country}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}
              value={Country.find((option) => option.value === formik.values.country)}
              onChange={(option) => formik.setFieldValue('country', option.value)}
              placeholder="Country"
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '56px', 
                  fontWeight: '600',
                  padding: '5px', 
                }),
              }}
            />
            {formik.touched.country && formik.errors.country ? (
              <div style={{ color: 'red', marginTop: "1vh" }}>{formik.errors.country}</div>
            ) : null}
          </div>

          <div className='mb-4'>
            <label htmlFor="state" className='text-primary-text text-[16px] font-medium -pb-8'>State</label>
            <Select
              id="state"
              name="state"
              options={States}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}
              value={States.find((option) => option.value === formik.values.state)}
              onChange={(option) => formik.setFieldValue('state', option.value)}
              placeholder="State"
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '56px', 
                  fontWeight: '600',
                  padding: '5px', 
                }),
              }}
            />
            {formik.touched.state && formik.errors.state ? (
              <div style={{ color: 'red', marginTop: "1vh" }}>{formik.errors.state}</div>
            ) : null}

          </div>

          <div className=''>
            <label htmlFor="address" className='text-primary-text text-[16px] font-medium'>Address</label>
            <input
              id="outlined-required-8"
              placeholder='Home-Address'
              type='text'
              name='address'
              autoComplete='off'
              fullWidth
              {...formik.getFieldProps('address')}
              className='input-field'
            />
            {formik.touched.address && formik.errors.address ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.address}</div>
            ) : null}
          </div>

          <div className='mb-7'>
            <label htmlFor="role" className='text-primary-text text-[16px] font-medium'>Register as</label>
            <Select
              id="role"
              name="role"
              options={register}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}
              value={register.find((option) => option.value === formik.values.register)}
              onChange={(option) => formik.setFieldValue('role', option.value)}
              placeholder="Register as"
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: '56px', 
                  fontWeight: '600',
                  padding: '5px', 
                }),
              }}
            />
            {formik.touched.role && formik.errors.role ? (
              <div style={{ color: 'red', marginTop: "1vh" }}>{formik.errors.role}</div>
            ) : null}
          </div>
          <div className='w-full -mt-4'>
            <button type="submit" disabled={formik.isSubmitting} className="h-[50px] w-[100%] font-poppins my-5 rounded-lg bg-blue-500 text-white p-4">
              {formik.isSubmitting ? 'Registering User...' : ' Register Account '}
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

export default RegisterTwo
