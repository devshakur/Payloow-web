import React from 'react'
import { useRouter } from '../../../Routes/router';

const SellSuccessfull = () => {
    const router = useRouter()
    const handleRoute = ()=>{
        router.reload()
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex justify-center">
        <main className="w-full md:w-[600px] bg-[#FFFFFF] shadow-md rounded-lg">
          <section className="w-auto mx-5 my-5">
            <div className="w-[100%] flex justify-center md:justify-center">
              <img src="/images/success.png" alt="success-logo" />
            </div>
            <div className="flex justify-center my-5">
              <p className="font-poppins text-lg font-[550] leading-6 text-[#1D2433] my-4">
                You've successfully sold 3 shares of Payloow
              </p>
            </div>
            <div className="flex justify-center flex-col lg:flex-row lg:gap-5 my-4">
              <button
                type="button"
                className="p-3 w-[95%] lg:w-[50%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]"
              >
               View in Portfolio
              </button>
              <button
              onClick={handleRoute}
                type="button"
                className="p-3 w-[95%] lg:w-[50%] font-poppins my-3 rounded-lg bg-blue-500 text-white"
              >
                Done
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SellSuccessfull;
