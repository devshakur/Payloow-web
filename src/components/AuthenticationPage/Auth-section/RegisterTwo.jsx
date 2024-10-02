import React from 'react'
import '../auth.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import RegisterHeaders from './RegisterHeaders'

function RegisterTwo({formik}) {
return (
  <div>
      <div className='flex justify-center items-center overflow-y-auto'>
       <div className='bg-white w-[90vw] h-[760px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col'>
       <RegisterHeaders currentIndex={1} />
       <div>
     <img src="images/down.png" alt="down-arrow" style={{width: "30px", height: "32px", position: "relative", right: "-90%", bottom: "-50%"}} />
     <label htmlFor="country" className='text-primary-text text-[16px] font-medium -pb-8'>Country</label>
            <input   
              id="outlined-required-6"
              placeholder='Country'
              type='text'
              name='country'
              autoComplete='off'
              {...formik.getFieldProps('country')}
              className='input-field'
            />
            {formik.touched.country && formik.errors.country ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.country}</div>
            ) : null}
            </div>

            <div>
            <label htmlFor="state" className='text-primary-text text-[16px] font-medium -mb-7'>State</label>
            <input 
              id="outlined-required-7"
              placeholder='State'
              name='state'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('state')}
              className='input-field'
            />
            {formik.touched.state && formik.errors.state ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.state}</div>
              ) : null}
              <img src="images/down.png" alt="down-arrow" style={{width: "30px", height: "32px", position: "relative", right: "-90%", top: "-50%"}} />
             </div>

             <div className='-mt-8'>
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

            <div>
            <label htmlFor="Register as" className='text-primary-text text-[16px] font-medium'>Register as</label>
            <input
              id="outlined-required-9"
              placeholder='Register as'
              type='text'
              name='identify'
              autoComplete='off'
              fullWidth
              {...formik.getFieldProps('identify')}
              className='input-field'
            />
            {formik.touched.identify && formik.errors.identify ? (
              <div style={{ color: 'red', marginTop: "-2vh" }}>{formik.errors.identify}</div>
              ) : null}
              <img src="images/down.png" alt="down-arrow" style={{width: "30px", height: "32px", position: "relative", right: "-90%", top: "-50%"}} />
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
