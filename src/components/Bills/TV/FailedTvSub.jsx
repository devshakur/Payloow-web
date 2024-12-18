import React from 'react'
import { useRouter } from '../../../Routes/router'

const DataPurchaseFailed = () => {
    const router = useRouter();
  return (
    <div className='md:-mt-12 flex items-end md:items-center justify-center lg:-ml-[-14vw]'>  
    <div className='flex justify-center'>  
        <main className='w-full md:w-[600px] md:mt-[6rem] h-auto bg-[#FFFFFF] pb-[20px] shadow-md rounded-lg'>  
            <section className='h-auto w-auto mx-5'>  
                <div className='w-[100%] h-auto py-4 flex justify-center md:justify-center'>  
                    <img src="./images/failed.png" alt="success-logo" />  
                </div>  
                <div className='flex justify-center my-5'>  
                    <p className='font-poppins text-lg font-[550] leading-6 text-[#1D2433]'>Tv Subcription Purchase Failed!</p>  
                </div>  
                <div className='flex justify-center flex-col lg:flex-row lg:gap-3 py-2'>
                <button  onClick={()=>{router.reload()}} type='button' className="h-[55px] w-[95%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]">  
                    Cancel  
                </button>  
                <button onClick={()=>{router.back()}} type='button' className="h-[55px] w-[95%] font-poppins my-3 rounded-lg bg-blue-500 text-white">  
                    Retry
                </button>  

                </div>
            </section>  
        </main>  
    </div>  
</div>
  )
}

export default DataPurchaseFailed
