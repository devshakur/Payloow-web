import React from 'react'
import SharesLayout from './SharesLayout'
import { GoArrowUpRight } from "react-icons/go";
import { LuHeartPulse } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { BiChart } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const Portfolio = () => {
  return (
    <SharesLayout>
    <div className='md:grid md:grid-cols-[2fr_1fr] gap-4'>
      <div className="bg-white p-3 shadow-md rounded-md">
        <h3 className='font-poppins text-[24px] font-normal text-[#1D2433CC]'>Total Portfolio Value</h3>
        <h2 className='font-poppins text-[26px] font-medium text-[#000]'>₦15,200.45</h2>
        <h5 className='font-poppins text-[18px] font-normal text-[#1D2433CC]'>Your portfolio has grown by 5.3% in the past month.</h5>
        <div className="mt-16 border rounded-md">
            <div className="flex justify-between p-3">
                <h4 className='font-poppins text-[24px] font-normal text-[#1D2433]'>Get Started with Payloow Share</h4>
                <span className='w-12 h-12 flex justify-center items-center rounded-full bg-[#F1F3F9]'><GoArrowUpRight className='h-7 w-7 text-[#1D2433CC]'/></span>
            </div>
            <div className="mt-4">
                <div className="flex gap-3 p-3 items-center">
                    <span className="w-10 h-10 rounded-full bg-[#DBE7FE] flex justify-center items-center"><LuHeartPulse className='h-5 w-5 text-blue-500'/></span>
                    <p className='font-poppins font-normal text-[18px] text-[#1D2433]'>High Profit</p>
                </div>
                <div className="flex gap-3 p-3 items-center">
                    <span className="w-10 h-10 rounded-full bg-[#DBE7FE] flex justify-center items-center"><LuClock className='h-5 w-5 text-blue-500'/></span>
                    <p className='font-poppins font-normal text-[18px] text-[#1D2433]'>Invest 24/7hrs</p>
                </div>
                <div className="flex gap-3 p-3 items-center">
                    <span className="w-10 h-10 rounded-full bg-[#DBE7FE] flex justify-center items-center"><BiChart className='h-5 w-5 text-blue-500'/></span>
                    <p className='font-poppins font-normal text-[18px] text-[#1D2433]'>Get started with as little as ₦10,000.</p>
                </div>
            </div>
        </div>
      </div>
      <div className='bg-white mt-6 md:mt-0'>
     <div className="p-4">
        <img src="/images/payLogo.png" alt="payloow-logo" />
     <h6 className='font-poppins font-normal text-lg text-[#1D2433CC]'>Payloow.Inc</h6>
     </div>
     <div className="flex items-center p-5 gap-4">
        <h3 className="font-poppins font-medium text-[20px] text-[#1D2433]">₦9,900</h3>
        <p>Per Share</p>
     </div>
     <div className="flex flex-col p-3 gap-5">
     <div className="flex justify-between">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Quantity</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-[#1D2433]'>10 shares</p>
     </div>
     <div className="flex justify-between ">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Current value</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-[#1D2433]'>₦9,900</p>
     </div>
     <div className="flex justify-between">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Cost Basis</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-[#1D2433]'>₦9,900</p>
     </div>
     <div className="flex justify-between">
        <h4 className='font-plus-jakarta font-normal text-[18px] text-[#1D2433CC]'>Growth (%)</h4>
        <p className='font-plus-jakarta font-medium text-[18px] text-green-500'>+15.4%</p>
     </div>
     </div>
     <div className='w-full px-2 flex flex-col gap-3 pb-3'>
        <button className='w-full bg-blue-700 text-white py-2 rounded-md'>Buy Now</button>
        <button className='w-full border border-blue-700 text-blue-700 py-2 rounded-md'>Sell</button>
     </div>
      </div>
    </div>
    <div className="mt-6 bg-white rounded-md">
    <div className="flex justify-between mx-3">
            <h3 className='font-medium text-lg font-poppins'>Portfolio Performance</h3>
            <h6 className='flex items-center gap-3 font-medium text-lg font-poppins'>Last Month <span><IoIosArrowDown/></span></h6>
        </div>  
        <div>
            <img src="/images/portfolioChart.png" alt="chart" />
        </div>
    </div>
    </SharesLayout>
  )
}

export default Portfolio
