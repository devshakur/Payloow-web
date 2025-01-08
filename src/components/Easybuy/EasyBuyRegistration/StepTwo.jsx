import React from 'react'

const StepTwo = ({ openStepThree, formik }) => {
  return (
    <div>
      <div className='flex justify-center pb-[3rem]'>
        <div className='bg-white w-[80%] max-w-3xl rounded-xl shadow-lg pb-10'>
          <form className='my-3 flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label htmlFor="fullname" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Full Name</label>
              <input name='fullName' id='fullName' type="text" placeholder='full Name' className='border mx-5 p-2 rounded-md focus:outline-none'
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-red-500">{formik.errors.fullName}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="phone number" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Phone Number</label>
              <input name='phoneNumber' id='phoneNumber' type="text" placeholder='Phone Number' className='border mx-5 p-2 rounded-md focus:outline-none'
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Email</label>
              <input name='email' id='email' type="text" placeholder='Email' className='border mx-5 p-2 rounded-md focus:outline-none'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="country" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Country</label>
              <select 
              name='country' 
              id='country' 
              placeholder='country' 
              className='border mx-5 p-2 rounded-md focus:outline-none'
              onChange={formik.handleChange}
              value={formik.values.country}
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Liberia">Liberia</option>
                <option value="Congo">Congo</option>
                
              </select>
              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-500">{formik.errors.country}</div>
              ) : null}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="state" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>State</label>
              <select 
              name='state' 
              id='state' 
              placeholder='state' 
              className='border mx-5 p-2 rounded-md focus:outline-none'
              onChange={formik.handleChange}
              value={formik.values.state}
              >
                <option value="Kano">Kano</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kaduna">Kaduna</option>
              </select>
              {formik.touched.state && formik.errors.state ? (
                <div className="text-red-500">{formik.errors.state}</div>
              ) : null}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="address" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Address</label>
              <input 
              name='address' 
              id='address' 
              type="text" 
              placeholder='Home Address' 
              className='border mx-5 p-2 rounded-md focus:outline-none' 
               onChange={formik.handleChange}
                value={formik.values.address}
                />
                  {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="id" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>National ID</label>
              <input 
              name='nin' 
              id='nin' 
              type="text" 
              placeholder='National Id' 
              className='border mx-5 p-2 rounded-md focus:outline-none' 
              onChange={formik.handleChange}
              value={formik.values.nin}
              />
               {formik.touched.nin && formik.errors.nin ? (
                <div className="text-red-500">{formik.errors.nin}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="bvn" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>BVN</label>
              <input 
              name='bvn' 
              id='bvn' 
              type="text" 
              placeholder='BVN' 
              className='border mx-5 p-2 rounded-md focus:outline-none' 
              onChange={formik.handleChange}
              value={formik.values.bvn}
              />
              {formik.touched.bvn && formik.errors.bvn ? (
                <div className="text-red-500">{formik.errors.bvn}</div>
              ) : null}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="referral" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Referral ID</label>
              <input 
              name='referralCode' 
              id='referralCode' 
              type="text" 
              placeholder='Referral ID' 
              className='border mx-5 p-2 rounded-md focus:outline-none' 
              onChange={formik.handleChange}
              value={formik.values.referralCode}
              />
                {formik.touched.referralCode && formik.errors.referralCode ? (
                <div className="text-red-500">{formik.errors.referralCode}</div>
              ) : null}
            </div>
            <div className='mx-5'>
              <button onClick={openStepThree} className='bg-blue-700 text-white mt-3 w-full py-3 rounded-md'>Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StepTwo
