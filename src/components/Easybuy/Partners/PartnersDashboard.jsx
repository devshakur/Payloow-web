import React from 'react'
import PartnersLayout from './PartnersLayout'
import { LuStore } from "react-icons/lu";
import { TbMessageStar } from "react-icons/tb";
import { SlChart } from "react-icons/sl";
import { SlPeople } from "react-icons/sl";
import { useRouter } from '../../../Routes/router';
import { motion } from 'framer-motion'; 

const history = [
  {
    text: 'New Customer Added',
    date: 'Sep 27th, 20:01:16',
    status: 'Successful',
  },
  {
    text: 'New Inventory by Mayo...',
    date: 'Sep 27th, 20:01:16',
    status: 'Updated',
  },
  {
    text: '1.2 VLI points ',
    date: 'Sep 27th, 20:01:16',
    status: 'Awarded',
  },
  {
    text: 'New Customer Added',
    date: 'Sep 27th, 20:01:16',
    status: 'Successful',
  }
];

const icons = [
  {
    icon: LuStore,
    nav: 'Service Center',
    href: '/partners/service-center'
  },
  {
    icon: TbMessageStar,
    nav: 'Inventory',
    href: '/partners/inventory'
  },
  {
    icon: SlChart,
    nav: 'Commission',
    href: '/partners/commission'
  },
  {
    icon: SlPeople,
    nav: 'Customers',
    href: '/partners/customers'
  }
];

const PartnersDashboard = () => {
  const router = useRouter();

  const navigateIcon = (href) => {
    router.push(href);
  };

  return (
    <PartnersLayout>
      <motion.div className='flex justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h3 className='font-poppins font-medium text-xl text-[#000]'>Welcome Mayowa</h3>
        <motion.button
          className='bg-blue-700 text-white py-2 px-6 rounded-md'
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Add Customer
        </motion.button>
      </motion.div>
      
      <motion.h5 className='font-poppins font-medium text-lg text-[#000]' initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        Explore and Invest in Growing Businesses!
      </motion.h5>

      <motion.main className='md:grid md:grid-cols-2 md:gap-6 mt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className='bg-white shadow-md w-full' whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <div className='flex justify-between mx-5'>
            <h4 className='font-iner font-medium text-xl'>Collection Performance</h4>
            <span className='font-semibold text-lg'>...</span>
          </div>
          <div className='flex justify-center mt-5'>
            <img src="/images/groups.png" alt="rate" />
          </div>
        </motion.div>

        <div className='mt-5 md:mt-0'>
          <div className="grid grid-cols-2 gap-4">
            {['₦50,000', '10', '0', '₦5,000'].map((amount, index) => (
              <motion.div className="bg-white shadow-md w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} key={index}>
                <div className="flex justify-between">
                  <h3 className='font-medium text-lg text-[#000]'>
                    {index % 2 === 0 ? 'Total Commissions' : 'Active Customers'}
                  </h3>
                  <span>...</span>
                </div>
                <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>{amount}</p>
                <div className="mt-3 flex gap-2">
                  <img src="/images/chart-ups.png" alt="up" />
                  <p className={`text-${index % 2 === 0 ? 'green' : 'red'}-600`}>32.3%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>

      <motion.section className='w-full md:grid md:grid-cols-2 gap-3 mt-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="bg-white shadow-md" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <div className="flex justify-between mx-5 items-center">
            <h3 className='font-poppins font-medium text-[24px] text-[#1D2433]'>Recent Activities</h3>
            <h5 className='font-medium font-poppins text-lg text-blue-700'>see all</h5>
          </div>
          {history.map((item, index) => (
            <motion.div key={index} className="m-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.2 }}>
              <h3 className='font-poppins font-normal text-lg text-[#1D2433]'>{item.text}</h3>
              <div className="flex justify-between">
                <h4 className='font-poppins font-normal text-[16px] text-[#1D2433CC]'>{item.date}</h4>
                <button className='bg-[#EDFDF8] px-4 py-2 text-green-600'>{item.status}</button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className='bg-white shadow-md' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h3 className='font-inter font-medium text-[24px] mx-4'>Quick Links</h3>
          <motion.div className="grid grid-cols-2 md:flex md:flex-row md:justify-evenly p-3">
            {icons.map((icon, index) => (
              <motion.ul
                key={index}
                className='cursor-pointer'
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onClick={() => { navigateIcon(icon.href) }}
              >
                <li className="w-16 h-16 rounded-[50%] flex justify-center items-center bg-[#F1F3F9]">
                  <icon.icon className='w-5 h-5 text-[#3369F4]' />
                </li>
                <p className="font-poppins font-normal text-lg">{icon.nav}</p>
              </motion.ul>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </PartnersLayout>
  )
}

export default PartnersDashboard;
