import React from 'react'
import { Button, TextField } from '@mui/material'
import SocialLogins from './SocialLogins'


function Register() {
  return (
    <div className='w-[100%] mt-6 text-red-500 items-center'>
      <form action="" className='grid gap-4'>
        <div className='w-[100%] grid  grid-cols-2 gap-2 '>
          <TextField
            required
            id="outlined-required-1"
            placeholder='firstName'
            type='text'
            InputProps={{
              style: { height: 45,  borderRadius: 10 }
            }}
          />
          <TextField
            required
            id="outlined-required-2"
            placeholder='lastName'
          type='text'
            InputProps={{
              style: { height: 45, borderRadius: 10 }
            }}
          />
        </div>
        <TextField
          required
          id="outlined-required-3"
          placeholder='Email'
          type='email'
          fullWidth
          InputProps={{
            style: { height: 50,  borderRadius: 10 }
          }}
        />
          <div className='w-[100%] grid  grid-cols-2 gap-2 '>
          <TextField
            required
            id="outlined-required-1"
            placeholder='Mobile No.'
            type='phone'
            InputProps={{
              style: { height: 50,  borderRadius: 10 }
            }}
          />
          <TextField
            required
            id="outlined-required-2"
            placeholder='Enter password'
          type='password'
            InputProps={{
              style: { height: 50, borderRadius: 10 }
            }}
          />
        </div>

        <div className='w-[100%] grid  grid-cols-2 gap-2 '>
          <TextField
            required
            id="outlined-required-1"
            placeholder='Country'
            type='text'
            InputProps={{
              style: { height: 50,  borderRadius: 10 }
            }}
          />
          <TextField
            required
            id="outlined-required-2"
            placeholder='State'
          type='text'
            InputProps={{
              style: { height: 50, borderRadius: 10 }
            }}
          />
        </div>


        <TextField
          required
          id="outlined-required-4"
          placeholder='Home Address'
          type='text'
          fullWidth
          InputProps={{
            style: { height: 50,  borderRadius: 10 }
          }}
        />


        <Button type='submit' variant="contained">Submit</Button>
      </form>
      <div className='mt-10'>
               <div className='flex justify-center items-center'>
                <span className='flex-grow h-px bg-[#e9ecef]'></span>
                <span className='mx-2 text-gray-600 font-medium'>or continue with</span>
                <span className='flex-grow h-px bg-[#e9ecef]'></span>
              </div>
             </div>
             <article>
             <SocialLogins />
             </article>
             <div>
    </div>
    </div>
  )
}

export default Register
