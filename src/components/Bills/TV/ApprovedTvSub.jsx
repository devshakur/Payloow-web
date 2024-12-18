import React from 'react'
import { useRouter } from '../../../Routes/router'

const ApprovedTvSub = () => {
    const router = useRouter();
  return (
    <div>
          <div>
          <div className='md:-mt-12 flex items-end md:items-center justify-center lg:-ml-[-14vw]'>  
    <div className='flex justify-center'>  
        <main className='w-full  md:w-[600px] bg-[#FFFFFF]  shadow-md rounded-lg my-6'>  
            <section className=' w-auto mx-5 '>  
                <div className=' flex justify-center md:justify-center'>  
                    <img src="./images/success.png" alt="success-logo" />  
                </div>  
                <div className='flex justify-center my-5'>  
                    <p className='font-poppins text-lg font-[550] leading-6 text-[#1D2433] my-2'>TV Subscription Successful!</p>  
                </div>  
                <div className='flex justify-center flex-col lg:flex-row lg:gap-3 my-4'>
                <button onClick={()=>{router.push('/dashboard')}} type='button' className="p-3 w-[95%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]">  
                    Share Receipt  
                </button>  
                <button onClick={()=>{router.reload()}} type='button'  className="p-3 w-[95%] font-poppins my-3 rounded-lg bg-blue-500 text-white">  
                    Done  
                </button>  

                </div>
            </section>  
        </main>  
    </div>  
</div>
    </div>
    </div>
  )
}

export default ApprovedTvSub
