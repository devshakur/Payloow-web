import React from 'react';
import { useRouter } from '../../../Routes/router';

const ApprovedData = ({ successResponse }) => {
console.log(successResponse);

  const router = useRouter();

  const number = successResponse?.mobile_number || 'N/A';
const network = successResponse?.network || 'N/A';
const amount = successResponse?.amount || 'N/A';


  return (
    <div>
      <div className='md:-mt-12 flex items-end md:items-center justify-center lg:-ml-[-14vw]'>  
        <div className='flex justify-center'>  
          <main className='w-full md:w-[600px] md:mt-[6rem] bg-[#FFFFFF] pb-[10px] shadow-md rounded-lg'>  
            <section className='w-auto mx-5'>  
              <div className='w-[100%] flex justify-center my-4'>  
                <img src="/images/success.png" alt="success-logo" />  
              </div>  
              <div className='flex justify-center my-5'>
                <p className='font-poppins text-lg font-[550] text-[#1D2433]'>
                  Data Bundle Purchase Successful!
                </p>
              </div>

              <div className='bg-[#F1F3F9] rounded-md p-4 mx-2 text-center'>
                <p className='text-sm text-gray-700 mb-1'>
                  <strong>Network:</strong> {network}
                </p>
                <p className='text-sm text-gray-700 mb-1'>
                  <strong>Phone Number:</strong> {number}
                </p>
                <p className='text-sm text-gray-700'>
                  <strong>Amount:</strong> ₦{amount}
                </p>
              </div>

              <div className='flex justify-center flex-col lg:flex-row lg:gap-3 mt-6'>
                <button
                  onClick={() => router.push('/dashboard')}
                  type='button'
                  className="p-3 w-[95%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]"
                >
                  Close
                </button>  
                <button
                  onClick={() => router.reload()}
                  type='button'
                  className="p-3 w-[95%] font-poppins my-3 rounded-lg bg-blue-500 text-white"
                >
                  Done 
                </button>  
              </div>
            </section>  
          </main>  
        </div>  
      </div>
    </div>
  );
};

export default ApprovedData;
