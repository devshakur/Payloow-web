import React from 'react'

const ApprovedData = ({ handleErrorPage}) => {
  return (
    <div>
          <div className='md:-mt-12 flex items-end md:items-center justify-center lg:-ml-[-14vw]'>  
    <div className='flex justify-center'>  
        <main className='w-full md:w-[600px] md:mt-[6rem] bg-[#FFFFFF] pb-[10px] shadow-md rounded-lg'>  
            <section className=' w-auto mx-5'>  
                <div className='w-[100%] flex justify-center md:justify-center my-4'>  
                    <img src="./images/success.png" alt="success-logo" />  
                </div>  
                <div className='flex justify-center my-5'>  
                    <p className='font-poppins text-lg font-[550] leading-6 text-[#1D2433] my-5'>Data Bundle Purchase Successful!</p>  
                </div> 
                <div className='flex justify-center flex-col lg:flex-row lg:gap-3'>
                <button type='button' className="p-3 w-[95%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]">  
                    Share Receipt  
                </button>  
                <button type='button' onClick={handleErrorPage} className="p-3 w-[95%] font-poppins my-3 rounded-lg bg-blue-500 text-white">  
                    Done  
                </button>  
                    
                    </div> 
            </section>  
        </main>  
    </div>  
</div>
    </div>
  )
}

export default ApprovedData
