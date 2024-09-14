import React from 'react'
import { Button, TextField } from '@mui/material'
import SocialLogins from './SocialLogins'
import { Link } from 'react-router-dom'
function Login() {

    return (
        <div>
            <div className='w-[100%] mt-6 text-red-500 items-center'>
                <form action="" className='grid gap-4'>

                    <TextField
                        required
                        id="outlined-required-3"
                        placeholder='Mobile No.'
                        type='phone'
                        fullWidth
                        InputProps={{
                            style: { height: 50, borderRadius: 10 }
                        }}
                    />

                    <TextField
                        required
                        id="outlined-required-4"
                        placeholder='password'
                        type='password'
                        fullWidth
                        InputProps={{
                            style: { height: 50, borderRadius: 10 }
                        }}
                    />
                    <Button type='submit' variant="contained">Login</Button>
                </form>
                <div className='my-3 flex justify-between text-[15px] cursor-pointer'>
                    <div></div>
                    <div>   <Link  to={'/pswdissue'}>password_support</Link></div>
                  
                </div>
            </div>
            <div className='mt-10'>
                <div className='flex justify-center items-center'>
                    <span className='flex-grow h-px bg-[#e9ecef]'></span>
                    <span className='mx-2 text-gray-600 font-medium'>or login with</span>
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

export default Login
