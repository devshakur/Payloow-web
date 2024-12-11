import React from 'react'
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const BuyersDashboardTwo = () => {
    return (
        <div>
            {/* <BuyersLayoutPage> */}
                <main>
                   
         <h3 className='text-blue-700 text-lg font-medium font-plus-jakarta'>Home<span className='text-black ml-2 font-poppins font-medium'>/  Iphones</span></h3>
          <div className='flex justify-between'>
            <div className='lg:flex items-center gap-4'>
            <button className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'>
                <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
                <p className='text-lg text-blue-700'> FIlters</p>
               </button>
               <div className='hidden lg:flex gap-3'><p className='font-poppins text-lg font-semibold text-blue-700 flex items-center gap-2'>Brand (1) <IoIosArrowDown /> </p>
                <p className='font-poppins text-lg font-semibold flex items-center gap-2'>color <IoIosArrowDown /></p>
                <p className='font-poppins text-lg font-semibold flex items-center gap-2'>price <IoIosArrowDown /></p>
               </div>
               </div>
            <p className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'>Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>Most popular <IoIosArrowDown /></span></p>
          </div>
          <div className='mt-5 flex justify-between'>
            <button className='bg-blue-300 text-[#000] px-6 text-lg font-poppins font-medium rounded-lg py-1 border-2 border-blue-400'>iphone  X</button>
            <p className='text-[#101928] font-poppins text-lg font-medium'>Showing 1- 6 of 20 results</p>
          </div>
                </main>
            {/* </BuyersLayoutPage> */}
        </div>
    )
}

export default BuyersDashboardTwo
