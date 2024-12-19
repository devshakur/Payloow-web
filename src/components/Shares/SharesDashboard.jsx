import React, {useState} from 'react'
import SharesLayout from './SharesLayout'
import { IoIosArrowDown } from "react-icons/io";
import BuySharesModal from './SharesModal/BuySharesModal';
import PurchaseSuccessfullModal from './SharesModal/PurchaseSuccessfullModal';
import SellSharesModal from './SharesModal/SellSharesModal';
import SellSuccessfull from './SharesModal/SellSuccessfull';

const SharesDashboard = () => {
    let [isOpen, setIsOpen] = useState(false)
    const [steps, setSteps] = useState('zero')

    const handleOpenBuyModal = ()=>{
        setIsOpen(true)
        setSteps('one')
    }
    const handleSuccess = ()=>{
        setIsOpen(false)
        setSteps('two')
    }
    const handleSellsSuccess = ()=>{
        setIsOpen(false)
        setSteps('four')
    }
    const handleOpenSellsModal = ()=>{
        setIsOpen(true)
        setSteps('three')
    }
  return (
    <SharesLayout>
        <div className="w-full flex flex-col gap-3 md:grid md:grid-cols-[2fr_2fr_1fr] md:gap-5">
    <div className='bg-blue-700 p-4 rounded-md'>
      <h3 className='font-poppins font-normal text-[20px] text-[#FFFFFF]'>Total Invested</h3>
      <h5 className='font-plus-jakarta font-medium text-[32px] text-[#FFFFFF] p-2'>₦50,000</h5>
      <div className="w-full flex gap-2">
        <button onClick={handleOpenBuyModal} className='w-full bg-white py-3 text-blue-700 rounded-md'>Buy</button>
        <button onClick={handleOpenSellsModal} className='w-full text-white py-3 border border-white rounded-md'>Sell</button>
      </div>
    </div>
    <div className='bg-white p-4 rounded-md'>
      <h3 className='font-poppins font-normal text-[20px] text-[#1D2433CC]'>Current Investment Balance</h3>
      <h5 className='font-plus-jakarta font-medium text-[32px] text-[#1D2433] p-2'>₦90,900</h5>
      <div className="w-full flex gap-2">
        <button className='w-full bg-blue-700 py-3 text-white rounded-md'>Withdraw</button>
        <button className='w-full text-blue-700 py-3 border border-blue-700 rounded-md'>Top up</button>
      </div>
    </div>
    <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Price Per Piece</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>₦9,900</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>32.3%</p>
                    </div>
              </div>
    </div>
    <main>
        <section className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-3 mt-8">
        <div className="bg-white">
        <div className="flex justify-between mx-3">
            <h3 className='font-medium text-lg font-poppins'>Analytics</h3>
            <h6 className='flex items-center gap-3 font-medium text-lg font-poppins'>Last Month <span><IoIosArrowDown/></span></h6>
        </div>
        <div className="mx-2">
        <img className='w-full' src="/images/chartline.png" alt="chart" />
        </div>
        </div>
        <div className="bg-white">
        <div className="flex justify-between mx-3">
            <h3 className='font-medium text-lg font-poppins'>Portfolio Performance</h3>
            <h6 className='flex items-center gap-3 font-medium text-lg font-poppins'>Last Month <span><IoIosArrowDown/></span></h6>
        </div>
        <div className="mx-2">
        <img className='w-full' src="/images/linecart.png" alt="chart" />
        </div>
        </div>
        </section>
        <div className="mt-6 w-full md:w-1/2 bg-white">
            <div className="flex justify-between items-center">
                <h3 className='font-poppins text-lg font-medium'>Recent Activities</h3>
                <span className='text-blue-600'>see more</span>
            </div>
                <section>
                    <div className='flex justify-between items-center p-2'>
                        <div className="flex">
                        <img className='ml-3 w-16 h-16' src="/images/Logopay.png" alt="payloow-logo" />
                        <div className='ml-2'>
                            <h4 className='font-poppins font-normal text-[22px] text-[#1D2433]'>Investment</h4>
                            <p className='font-poppins font-normal text-[18px] text-[#1D2433]'>Your Investment in payloow</p>
                        </div>
                        </div>
                        
                        <div>
                            <p className='font-poppins font-medium text-[24px] text-[#1D2433]'>₦90,900</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                        <div className="flex">
                        <img className='ml-3 w-16 h-16' src="/images/Logopay.png" alt="payloow-logo" />
                        <div className='ml-2'>
                            <h4 className='font-poppins font-normal text-[22px] text-[#1D2433]'>Withdraw</h4>
                            <p className='font-poppins font-normal text-[18px] text-[#1D2433]'>payloow.inc</p>
                        </div>
                        </div>
                        
                        <div>
                            <p className='font-poppins font-medium text-[24px] text-[#1D2433]'>- ₦50,900</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                        <div className="flex">
                        <img className='ml-3 w-16 h-16' src="/images/Logopay.png" alt="payloow-logo" />
                        <div className='ml-2'>
                            <h4 className='font-poppins font-normal text-[22px] text-[#1D2433]'>Withdraw</h4>
                            <p className='font-poppins font-normal text-[18px] text-[#1D2433]'>Your Investment in payloow</p>
                        </div>
                        </div>
                        
                        <div>
                            <p className='font-poppins font-medium text-[24px] text-[#1D2433]'>- ₦90,900</p>
                        </div>
                    </div>
                </section>
        </div>
    </main>
    {steps === 'one' && <BuySharesModal isOpen={isOpen} setIsOpen={setIsOpen} handleSuccess={handleSuccess}/>}
    {steps === 'two' && <PurchaseSuccessfullModal/>}
    {steps === 'three' && <SellSharesModal isOpen={isOpen} setIsOpen={setIsOpen} handleSellsSuccess={handleSellsSuccess}/>}
    {steps === 'four' && <SellSuccessfull/>}
    </SharesLayout>
  )
}

export default SharesDashboard
