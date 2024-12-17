import React from 'react'
import PartnersLayout from './PartnersLayout'
import { BiMenuAltRight } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdAddLocation } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
const Service = () => {
  return (
    <PartnersLayout>
      <div className="flex justify-between items-center">
        <h3 className='font-poppins font-medium text-[24px] text-[#1D2433]'>Service  Centers</h3>
        <span><BiMenuAltRight className='w-6 h-6'/></span>
      </div>
    <div className='md:grid md:grid-cols-2 md:gap-3'>
        <div className='bg-[#DBE7FE] h-[29vh] rounded-lg'>
       <div className="flex justify-between p-4">
        <h4 className='text-xl'>Kano Regional</h4>
        <span className='flex items-center gap-2 text-blue-500'><BiEdit/> Edit</span>
       </div>
       <div className="flex items-center gap-2 p-2">
        <span className='text-blue-500'>< MdAddLocation /></span>
        <p className='font-normal font-poppins text-[16px]'>No. 36 Ahmadu Bello Way, Kano State Libarary</p>
       </div>
       <div className="flex items-center gap-2 p-2">
        <span className='text-blue-500'>< FaPhone/></span>
        <p className='font-normal font-poppins text-[16px]'>07083175021</p>
       </div>
       <div className="flex items-center gap-2 p-2">
        <span className='text-blue-500'><MdOutlineMail/></span>
        <p className='font-normal font-poppins text-[16px]'>mayowasunusi@gmail.com</p>
       </div>
        </div>
      <div className="w-full mt-6 md:mt-0">
        <img className='w-full' src="/images/map.png" alt="map" />
      </div>
    </div>
    </PartnersLayout>
  )
}

export default Service
