import React from 'react'

const ApproveElectricity = ({handleErrorPage}) => {
  return (
    <div>
    <div className='flex items-end md:items-center justify-center lg:-ml-[-14vw]'>  
<div className='flex justify-center'>  
  <main className='md:w-[600px] bg-[#FFFFFF] shadow-md rounded-lg'>  
      <section className='my-3 mx-5'>  
          <div className='flex justify-center md:justify-center'>  
              <img src="./images/success.png" alt="success-logo" />  
          </div>  
          <div className='flex justify-center my-5'>  
              <p className='font-poppins text-lg font-[650] leading-6 text-[#1D2433] my-2'>Electricity Purchase Successful!</p>  
          </div> 
          <div className='flex flex-col lg:flex-row lg:justify-around items-center mx-2 p-4 bg-[#DBE7FE]'>
            <p className='font-poppins text-[14px] lg:text-[24px] font-bold'>Token:</p>
            <p className='font-poppins text-[14px] font-bold flex flex-row gap-2 lg:text-[24px]'>6666-7865-9867-2567-2312 <span><img src="./images/copy.png" className='w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]' alt="copy-icon" /></span></p>
           
          </div>
          <div className='flex justify-center flex-col lg:flex-row lg:gap-3 my-8'>
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

export default ApproveElectricity
