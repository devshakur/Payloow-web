import React from 'react'
import '../auth.css'
import { Link } from 'react-router-dom'


const SuccessPage = () => {

  return (
    <div>
        <main className='bg h-screen w-screen overflow-y-auto flex items-center justify-center'>
      <div className='vector'>
        <div className='flex justify-center p-6 items-center'>
          <span><img src="images/pay.png" alt="" /></span>
          <span><img src="" alt="" /></span>
          <span><img src="" alt="" /></span>
          <span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3'>ayloow</span>
        </div>
            <div className='bg-white w-[90vw] h-[430px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col items-center'>
                <div className='h-[120px] w-full flex justify-center'>
                    <img src="images/success.png" alt="success" />
                </div>
                <p className='font-poppins text-2xl my-5 text-[#1D2433] font-medium'>Password Reset Successful!</p>
                <div className='w-[85%] font-poppins ml-3 leading-7 text-lg font-normal text-[#1D2433CC]'>
                    <p>Your password has been successfully reset. You can now log in using your new password.</p>
                </div>
                <div className='w-full flex justify-center mt-4 font-poppins'>
                <button type="submit" className="h-[55px] w-[80%] bg-[#3369F4] rounded-lg p-4 text-white py-2">
              <Link to={'/login'}>  Go to Login</Link>
                    </button>

               </div>
            </div>
    </div>
    </main>
    </div>
  )
}

export default SuccessPage
