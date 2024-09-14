import React from 'react'
import { Button, TextField, Link } from '@mui/material'
import { ArrangeHorizontal } from 'iconsax-react';
import ForgetPassWord from '../../../Utils/hooks';
import ForgetPswd from './ForgetPswd';

function ResetPswd() {

  const [isForget, setIsForget] = ForgetPassWord();
   const handleChange = ()=>{
     setIsForget(!isForget);
   } 


  return (
    <div>
      {isForget ? (

      <section className='w-[100vw] h-screen'>
        <div className='w-full h-screen grid grid-cols-[1fr, 2fr] md:grid-flow-col'>
          <div className='flex justify-start items-center'>
            <img src="/images/forget.jpeg" style={{ width: "100%" }} alt="forget-pswd" />
          </div>
          <div className='text-center -mt-10 flex items-start flex-col md:justify-center'>
            <h3 className='w-[100%] flex justify-center font-plus-jakarta font-extrabold text-[2rem] leading-tight my-4 -mx-2'>Reset Password</h3>
            <form action="" className='w-[100%] flex flex-col justify-center gap-8'>
              <div>
                <TextField id="standard-basic" sx={{ width: "60%" }} label="Email" variant="standard" />
              </div>
              <div>
                <TextField id="standard-basic" sx={{ width: "60%" }} type='password' label="Token" variant="standard" />
              </div>
              <div>
                <TextField id="standard-basic" sx={{ width: "60%" }} type='password' label="New password" variant="standard" />
              </div>
              <div>
                <Button variant="contained" type='submit' sx={{ width: "60%" }}>Reset Password</Button>
                <div className='w-[100%] flex justify-center'>
                  <div className=' h-9 w-9 rounded-lg border-2 border-[#FF8A65] mt-5'>
                    <ArrangeHorizontal size="32" onClick={handleChange} color="#FF8A65" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      ): <ForgetPswd />}

    </div>
  )
}

export default ResetPswd

