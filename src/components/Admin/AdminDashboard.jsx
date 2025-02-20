import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { ArrowDown2, } from "iconsax-react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
  } from "@headlessui/react";
import Admin_Headers from './Admin_Headers';
import { AdminEndpoints } from '../../api/Endpoint';


  const userNavigation = [
    { name: "Web"},
  ];



const AdminDashboard = () => {
  const [balance, setBalance] = useState(0);
  const getVtuBanlance = async () => {
    try {
        const authData = localStorage.getItem('auth');
        if (!authData) {
            throw new Error('No auth data found');
        }
  
        const token = JSON.parse(authData)?.auth;
        if (!token) {
            throw new Error('Invalid token');
        }
  
        const response = await axios.get(AdminEndpoints.getVtuBalance, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        setBalance(response.data.data.data);
    } catch (error) {
       
        toast.error('An error occurred while fetching user data');
    } 
  };
console.log(balance);
  useEffect(() => {
    getVtuBanlance();
  }, []);
  return (
   <AdminLayout>
    <>
    <Admin_Headers
      one={'Bills Balance'}
      two={`₦${balance?.balance ? balance?.balance : '0'} `} 
      img1={balance?.balance > 20 ? "/images/chart-ups.png" : "/images/chart-down.png"}
      three={'32.3'}
      four={' Users'}
      five={'900'}
      six={'12.3'}
      seven={'Active Now'}
      eight={'150'}
      nine={'18%'}
      img={"/images/chart-down.png"}
      arrow={'red'}
      />
            <main className='w-[100%] gap-5 h-[300px] mt-6 md:grid md:grid-cols-[2fr_1fr]'>
            <section className='w-full h-auto '>    
            <div className="bg-white shadow-xl rounded-lg">
                <header className='flex justify-between m-4'>
                  <h3 className='font-poppins font-medium text-lg text-[#1D2433]'>Total Visitors</h3>
                  <Menu as="div" className=' relative'>
                    <MenuButton className='flex gap-4 justify-center items-center'>
                  <h4>web</h4>
                  <ArrowDown2 className='h-4' />
                  </MenuButton>
                  <MenuItems
            transition
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                //   href={item.href}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 focus:bg-blue-900 data-[focus]:bg-gray-50"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
               </Menu>
                </header>
                <div>
                    <img src="/images/admin-bar-chart.png" alt="chart" className='w-[80%]' />
                </div>

            </div>
            </section>
            <article className='bg-white shadow-xl rounded-lg '>
            <header className='flex justify-between m-4'>
                  <h3 className='font-poppins font-medium text-lg text-[#1D2433]'>Total Visitors</h3>
                  <Menu as="div" className=' relative'>
                    <MenuButton className='flex gap-4 justify-center items-center'>
                  <h4>Jun</h4>
                  <ArrowDown2 className='h-4' />
                  </MenuButton>
                  <MenuItems
            transition
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                //   href={item.href}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 focus:bg-blue-900 data-[focus]:bg-gray-50"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
               </Menu>
                </header>
                <ul className='grid mx-5 justify-end'>
                    <div className='flex gap-2 items-center'>
                     <span className='w-3 h-3 rounded-full bg-orange-700'></span>
                    <li className='font-plus-jakarta text-sm font-normal'>Active</li>
                    </div>
                    <div className='flex gap-2 items-center'>
                     <span className='w-3 h-3 rounded-full bg-blue-600'></span>
                    <li className='font-plus-jakarta text-sm font-normal'>Total Users</li>
                    </div>
                </ul>
                <div className='flex justify-center items-center '>
                    <img src="/images/admin-pie-chart.png" alt="chart" className='w-[100%]' />
                </div>
                <div className='flex justify-end -mt-12 mr-5 pb-5'>
              <div className='bg-white rounded-lg w-[160px] shadow-lg p-1'>
               <h3 className='font-poppins font-medium text-lg mx-2 '>Total Users:</h3>
               <h6 className='font-poppins font-medium text-[16px] mx-2'>1000</h6>
              </div>

                </div>
            </article>
            <Toaster />
            </main>
            </>
   </AdminLayout>
  )
}

export default AdminDashboard
