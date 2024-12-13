import React from 'react'
import { GiElectric } from "react-icons/gi";
import { GoArrowSwitch } from "react-icons/go";
import { PiDevicesDuotone } from "react-icons/pi";
import { BiCopy } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const Header0ne = () => {
  return (
    <div>
       <section className='hidden w-full lg:grid lg:grid-cols-3  gap-5'>
      <div className='bg-[#1E3DD7] w-full  rounded-lg p-6 lg:p-8 lg:h-[300px]'>
        <h3 className='font-poppins font-medium text-2xl text-white'>Available Balance</h3>
        <h4 className='font-poppins font-medium text-4xl text-white mt-3'>₦2,000.00</h4>
        <div className='flex mt-3 text-white gap-3'>
        <p>Wema bank: 4054673854</p>
        <span className='text-white'><BiCopy className='w-4 h-4 text-white'/></span>
        </div>
        <div className='w-full my-5'>
            <button className='bg-[#FFFF] text-blue-800 font-semibold py-3 w-full rounded-md text-sm lg:mt-5'>Make Payment</button>
        </div>
      </div>
      <div className='bg-white w-full shadow-sm rounded-lg mt-8 lg:mt-0 lg:h-[300px]'>
      <div className='flex justify-between mx-5 mt-2'>
        <h4 className='font-poppins text-xl text-[#1D2433] font-normal'>Repayment Status</h4>
        <span className='font-semibold'>...</span>
      </div>
      <div className='flex flex-col justify-center'>
        <div  className='flex justify-center'>
      <img className='relative top-8' src="/images/track.png" alt="tracker" />

        </div>
        <div className='flex justify-center'>
        <p className='text-[24px] lg:text-[18px] relative md:top-3 mt-1 -top-10 xl:-top-6 2xl:-top-24 font-medium font-poppins' >You are 74% Behind</p>
        </div>
      </div>
      </div>
      <div className=' bg-white w-full 2xl:max-w-xs shadow-sm rounded-lg mt-8 lg:mt-0 lg:h-[300px]'>
        <h3 className='text-xl font-poppins font-normal p-3'>Services</h3>
        <div className='flex gap-5 lg:flex-col justify-evenly'>
          <div className='flex flex-col lg:flex-row text-center lg:items-center lg:ml-10 lg:gap-3'>
          <div className='h-16 w-16 bg-[#DBE7FE] rounded-[50%] flex justify-center items-center'>
          <PiDevicesDuotone className='w-10 h-10 text-blue-700' /> 
        </div>
          <p className='lg:flex items-center gap-3'>Phones <span className='hidden lg:block text-center lg:ml-2 xl:ml-24'><IoIosArrowForward  className='w-5 h-5' /></span>
          </p>
          </div>
          <div className="flex flex-col text-center lg:flex-row lg:items-center lg:ml-10 lg:gap-3">
        <div className='h-16 w-16 bg-[#DBE7FE] rounded-[50%] flex justify-center items-center'>
        <GiElectric className='w-10 h-10 text-blue-700' />
        </div>
        <p className='lg:flex items-center gap-3'>Solar<span className='hidden lg:block text-center lg:ml-6 xl:ml-28'><IoIosArrowForward  className='w-5 h-5' /></span></p>
        </div>
        <div className="flex flex-col text-center lg:flex-row lg:items-center lg:ml-10 lg:gap-3">
        <div className='h-16 w-16 bg-[#DBE7FE] rounded-[50%] flex justify-center items-center'>
        <GoArrowSwitch className='w-10 h-10 text-blue-700' />
        </div>
        <p className='lg:flex items-center gap-3'>Swap<span className='hidden lg:block text-center lg:ml-6 xl:ml-28'><IoIosArrowForward className='w-5 h-5' /></span></p>
        </div>
        </div>
        
      </div>
                </section>
    </div>
  )
}

export default Header0ne
