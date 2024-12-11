import React from 'react';
import { useRouter } from '../../../../Routes/router';

const TradeSuccessModal = () => {
const router = useRouter();
const handleClick = ()=> {
    router.reload()
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex justify-center">
        <main className="w-full md:w-[600px] bg-[#ffff] shadow-md rounded-lg">
          <section className="w-auto mx-5 my-5">
            <div className="w-[100%] flex justify-center md:justify-center">
              <img src="./images/success.png" alt="success-logo" />
            </div>
            <div className="flex justify-center mt-5">
              <p className="font-poppins text-lg font-[550] leading-6 text-[#1D2433] my-4">
                Trade Sent Successful!
              </p>
            </div>
              <div className='flex justify-center font-poppins font-normal'><p>Our Team will send you a mail shortly</p></div>
            <div className="flex justify-center flex-col lg:flex-row lg:gap-5 my-4">
              <button
                type="button"
                className="p-3 w-[95%] lg:w-[50%] font-poppins text-sm font-semibold leading-5 my-3 rounded-lg border border-[#6196F9] text-[#6196F9]"
                onClick={handleClick}
              >
                Cancel
              </button>
              <button
                type="button"
                className="p-3 w-[95%] lg:w-[50%] font-poppins my-3 rounded-lg bg-blue-500 text-white"
                onClick={handleClick}
              >
                Done
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TradeSuccessModal;
