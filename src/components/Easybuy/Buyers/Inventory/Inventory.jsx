import React, {useState} from 'react'
import PartnersLayout from '../../Partners/PartnersLayout'
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import MyInventory from './MyInventory';
import Orders from './Orders';
import Consignment from './Consignment';


const Inventory = () => {
    const [orders, setOrders] = useState('Inventory')

    const handleInventory = ()=>{
        setOrders('Inventory')
    }
    const handleOrders = ()=>{
        setOrders('order')
    }
    const handleConsignment = ()=>{
        setOrders('consignment')
    }
  return (
    <PartnersLayout>
    <div className='flex justify-between items-center'>
      <h3 className='font-poppins font-medium md:text-[28px] text-[18px]'>Inventory Management</h3>
      <button className='bg-blue-700 py-2 px-4 rounded-md text-white'>Add Product</button>
    </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full">
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Total Stock</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>30</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>32.3%</p>
                    </div>
              </div>
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Solar Products</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>20</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-ups.png" alt="up" />
                        <p className='text-green-600'>20%</p>
                    </div>
              </div>
              
              <div className="bg-white shadow-md w-full p-3">
                <div className="flex justify-between">
                    <h3 className='font-medium text-lg text-[#000]'>Phones</h3>
                    <span>...</span>
                </div>
                    <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>10</p>
                    <div className="mt-3 flex gap-2">
                        <img src="/images/chart-down.png" alt="up" />
                        <p className='text-red-600'>18%</p>
                    </div>
              </div>
              </div>
              <ul className='flex gap-3 mt-9 cursor-pointer'>
                <li tabIndex={0} onClick={handleInventory} className='focus:text-blue-600'>My Inventory</li>
                <li tabIndex={0} onClick={handleOrders} className='focus:text-blue-600'>Orders</li>
                <li tabIndex={0} onClick={handleConsignment} className='focus:text-blue-600'>Consignment</li>
              </ul>
              <p className='w-[70%] md:w-[20%] border-b border-[#1D2433A6] p-1'></p>
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
               {orders === 'Inventory' && <MyInventory/>}
               {orders === 'order' && <Orders/>}
               {orders === 'consignment' && <Consignment/>}
    </PartnersLayout>
  )
}

export default Inventory
