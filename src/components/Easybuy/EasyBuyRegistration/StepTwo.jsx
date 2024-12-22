import React from 'react'

const StepTwo = ({openStepThree}) => {
  return (
    <div>
                   <div className='flex justify-center pb-[3rem]'>
                <div className='bg-white w-[80%] max-w-3xl rounded-xl shadow-lg pb-10'>
                   <form className='my-3 flex flex-col gap-3'>
                    <div className='flex flex-col'>
                    <label htmlFor="fullname" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Full Name</label>
                    <input name='fullname' id='fullname' type="text" placeholder='full Name' className='border mx-5 p-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="phone number" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Phone Number</label>
                    <input name='phone number' id='fullname' type="text" placeholder='Phone Number' className='border mx-5 p-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="country" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Country</label>
                    <select name='country' id='country' placeholder='country' className='border mx-5 p-2 rounded-md focus:outline-none'>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Congo">Congo</option>
                    </select>
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="state" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>State</label>
                    <select name='state' id='state' placeholder='country' className='border mx-5 p-2 rounded-md focus:outline-none'>
                    <option value="Kano">Kano</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Kaduna">Kaduna</option>
                    </select>
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="address" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Address</label>
                    <input name='address' id='address' type="text" placeholder='Home Address' className='border mx-5 p-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="id" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>National ID</label>
                    <input name='id' id='id' type="text" placeholder='National Id' className='border mx-5 p-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="bvn" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>BVN</label>
                    <input name='bvn' id='bvn' type="text" placeholder='BVN' className='border mx-5 p-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="referral" className='mx-5 font-poppins font-medium text-[15px] text-[#101928]'>Referral ID</label>
                    <input name='referral' id='referrel' type="text" placeholder='Referral ID' className='border mx-5 p-2 rounded-md focus:outline-none' />
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
