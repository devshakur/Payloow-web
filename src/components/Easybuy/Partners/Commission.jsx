import React, { useState } from 'react';
import PartnersLayout from './PartnersLayout';
import { ArrowDown2 } from 'iconsax-react';

const sales = [
  {
    customerName: 'Mayowa Sanusi',
    item: 'Nokia C12',
    amount: '$50,000',
    commission: '$5,000',
    points: '2',
    purchaseStatus: 'completed',
  },
  {
    customerName: 'John Doe',
    item: 'Samsung Galaxy S22',
    amount: '$80,000',
    commission: '$8,000',
    points: '4',
    purchaseStatus: 'completed',
  },
  {
    customerName: 'Jane Smith',
    item: 'iPhone 14',
    amount: '$100,000',
    commission: '$10,000',
    points: '5',
    purchaseStatus: 'pending',
  },
  {
    customerName: 'Jake Smart',
    item: 'iPhone 14',
    amount: '$100,000',
    commission: '$10,000',
    points: '5',
    purchaseStatus: 'pending',
  },
];

const Commission = () => {
  const [currentSaleIndex, setCurrentSaleIndex] = useState(0);

  
  const handleCircleClick = (index) => {
    setCurrentSaleIndex(index);
  };

 
  const currentSale = sales[currentSaleIndex];

  return (
    <PartnersLayout>
       <div className='flex flex-col md:grid md:grid-cols-3 gap-3'>
    <div className="bg-[#DBE7FE] shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Total Commissions</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>₦50,000</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>32.3%</p>
                    </div>
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Monthly Commissions</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>₦50,000</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>32.3%</p>
                    </div>
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Total Points</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>10</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-down.png" alt="up" />
                        <p className='text-red-600'>18%</p>
                    </div>
              </div>
    </div>
    <section className='flex flex-col md:grid md:grid-cols-3 mt-9 gap-3'>
    <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Paying Number:</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>2347083175021</p>
                   
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>VU</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>0</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-down.png" alt="up" />
                        <p className='text-red-600'>100%</p>
                    </div>
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>FPD</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>1 Customer</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-down.png" alt="up" />
                        <p className='text-red-600'>10%</p>
                    </div>
              </div>
    </section>
      <main className="md:grid md:grid-cols-2 gap-3 items-start">
        <div className="mt-12 bg-white shadow-sm">
          <div className="flex justify-between mx-5">
            <h3 className="font-medium font-plus-jakarta">Completion Data</h3>
            <span className="flex items-center gap-2 font-medium font-plus-jakarta">
              last Month <ArrowDown2 className="w-4 h-4" />
            </span>
          </div>
          <div className="pb-3">
            <img src="/images/Basic-bar-chart.png" alt="bar" />
          </div>
        </div>
        <div className="mt-12 bg-white shadow-sm">
          <div className="flex justify-between mx-5">
            <h3 className="text-lg font-medium font-poppins">Sales Commission</h3>
            <h6 className="text-[14px] text-blue-700">View More</h6>
          </div>
          <div className="mt-4 mx-4">
           
            <div className="flex flex-col gap-2 bg-[#F1F3F9] rounded-lg mx-3 p-3">
              <div className="flex justify-between">
                <p>Customer</p>
                <p>{currentSale.customerName}</p>
              </div>
              <div className="flex justify-between">
                <p>Item Sold</p>
                <p className=" text-[14px]">{currentSale.item}</p>
              </div>
              <div className="flex justify-between">
                <p>Amount</p>
                <p className=" text-[14px]">{currentSale.amount}</p>
              </div>
              <div className="flex justify-between">
                <p>Commission</p>
                <p className=" text-[14px]">{currentSale.commission}</p>
              </div>
              <div className="flex justify-between">
                <p>Points Earned</p>
                <p className=" text-[14px]">{currentSale.points}</p>
              </div>
              <div className="flex justify-between">
                <p>Status</p>
                <p className=" text-[14px]">{currentSale.purchaseStatus}</p>
              </div>
              <div className="w-full">
                <button className="w-full bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
                  View Details
                </button>
              </div>
            </div>
            
            <div className="flex justify-center mt-4 gap-3 mb-3 pb-1">
              {sales.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCircleClick(index)}
                  className={`w-3 h-3 rounded-full ${index === currentSaleIndex ? 'bg-blue-600' : 'bg-gray-400'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PartnersLayout>
  );
};

export default Commission;
