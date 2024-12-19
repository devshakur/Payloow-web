import React from 'react'
import SharesLayout from './SharesLayout'
import { IoIosArrowDown } from "react-icons/io";

const Analysis = () => {
    return (
      <SharesLayout>
    <div>
    <div className='flex flex-col md:grid md:grid-cols-3 gap-3'>
    <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Total Revenue</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>200</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>32.3%</p>
                    </div>
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Portfolio Growth Rate</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>8%</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>32.3%</p>
                    </div>
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Transaction</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>200</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-down.png" alt="up" />
                        <p className='text-red-600'>32.3%</p>
                    </div>
              </div>
    </div>
    </div>
    <div className="mt-6 bg-white rounded-md">
    <div className="flex justify-between mx-3">
            <h3 className='font-medium text-lg font-poppins'>Analytics</h3>
            <h6 className='flex items-center gap-3 font-medium text-lg font-poppins'>Last Month <span><IoIosArrowDown/></span></h6>
        </div>  
        <div>
            <img className='w-full' src="/images/secondline.png" alt="chart" />
        </div>
    </div>
    </SharesLayout>
  )
}

export default Analysis
