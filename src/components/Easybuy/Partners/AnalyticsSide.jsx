import React from 'react'

const AnalyticsSide = () => {
  return (
    <div>
        <div className='mt-8 md:mt-0'>
        <div className="bg-white mt-4 p-4">
            <div className="border border-gray-300  flex justify-between rounded-md p-2">
            <div className="flex flex-col text-center">
                <h4 className='font-poppins font-medium  text-[14px] text-[#1D2433CC]'>Active Devices<span className='border-r-2 ml-5'></span></h4>
                <h5 className='text-[12px]'>4</h5>
              
            </div>
            <div className="flex flex-col text-center">
                <h4 className='font-poppins font-medium text-[14px] text-[#1D2433CC]'>Payment Status<span className='border-r-2 ml-5'></span></h4>
                <h5 className='text-green-600 text-[12px]'>on time</h5>
            </div>
            <div className="flex flex-col text-center">
                <h4 className='font-poppins font-medium text-[14px] text-[#1D2433CC]'>Next Overdue</h4>
                <h5 className='font-poppins font-medium text-[12px] text-[#1D2433]'>24th,Dec 2024</h5>
            </div>
            </div>
            <div className='mt-5'>
                <img src="/images/flow.png" alt="flow" />
            </div>
        </div>
    </div>
    </div>
  )
}

export default AnalyticsSide
