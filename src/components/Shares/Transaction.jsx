import React from 'react'
import SharesLayout from './SharesLayout'
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import HistoryData from './HistoryData';

const Transaction = () => {
  return (
    <SharesLayout>
    <div>
      <h2 className='font-semibold text-[30px]'>Transaction History</h2>
    </div>
    <div className='flex justify-between mt-4'>
                    <div className='lg:flex items-center gap-4'>
                        <button className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'>
                            <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
                            <p className='text-lg text-blue-700'> Filters</p>
                        </button>
                        <div className='hidden lg:flex gap-3'>
        
                            <p className='font-poppins text-lg font-semibold flex items-center gap-2 text-blue-400'>
                                Type <IoIosArrowDown className='text-blue-400' />
                            </p>
                        </div>
                    </div>
                    <p className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'>
                        Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>November<IoIosArrowDown /></span>
                    </p>
                </div>
                <div className="">
                    <HistoryData />
                </div>
    </SharesLayout>
  )
}

export default Transaction
