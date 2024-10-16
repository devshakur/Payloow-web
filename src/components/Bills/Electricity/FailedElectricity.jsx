import React from 'react'

const FailedElectricity = () => {
  return (
    <div className='flex items-end md:items-center justify-center lg:-ml-[-14vw]'>  
    <div className='flex justify-center'>  
        <main className=' md:w-[600px]  bg-[#FFFFFF] shadow-md rounded-lg'>  
            <section className=' w-auto mx-5 p-5'>  
                <div className='flex justify-center md:justify-center'>  
                    <img src="./images/failed.png" alt="success-logo" />  
                </div>  
                <div className='flex justify-center my-6'>  
                    <p className='font-poppins text-lg font-[550] leading-6 text-[#1D2433]'>Electricity Purchase Failed!</p>  
                </div> 
                <div className='flex justify-center flex-col lg:flex-row lg:gap-5 my-3'>
                <button type='button' className="p-3 w-[95%] lg:w-[50%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]">  
                Cancel
                </button>  
                <button type='button' className="p-3w-[95%] lg:w-[50%] font-poppins my-3 rounded-lg bg-blue-500 text-white">  
                Retry
                </button>  
                    
                    </div> 
            </section>  
        </main>  
    </div>  
</div>
  )
}

export default FailedElectricity
