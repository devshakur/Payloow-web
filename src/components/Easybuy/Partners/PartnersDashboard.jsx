import React, { useState, useEffect } from 'react'
import PartnersLayout from './PartnersLayout'
import { LuStore } from "react-icons/lu";
import { TbMessageStar } from "react-icons/tb";
import { SlChart } from "react-icons/sl";
import { SlPeople } from "react-icons/sl";
import { useRouter } from '../../../Routes/router';
import { motion } from 'framer-motion';
import useInvestment from '../../../hooks/useInvetment';
import { toast, Toaster } from 'react-hot-toast'
import AddServiceModal from './AddServiceModal';

const history = [];

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
  const { GetActiveCustomers, GetPercentage } = useInvestment();
  const [customers, setCustomers] = useState(0)
  const [percentage, setPercentage] = useState(0)
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const getActiveCustomer = async () => {
      try {
        const resp = await GetActiveCustomers();
        // Check if the response is valid and contains the expected structure
        const productsData = resp?.data?.data?.[0]?.count;

        if (productsData !== undefined) {

          toast.success('Fetched Customers');
          setCustomers(productsData);
        } else {
          toast.error('No active customers found.');
        }
      } catch (error) {
        toast.error('Error fetching Customers:', error.message);
      }
    };

    getActiveCustomer();
  }, [GetActiveCustomers]);

  useEffect(() => {
    const getPercentageRate = async () => {
      try {
        const resp = await GetPercentage();
        // Check if the response is valid and contains the expected structure
        const productsData = resp?.data?.data?.[0]?.percentagePaid;

        if (productsData !== undefined) {
          toast.success('Fetched Percentage');
          setPercentage(productsData);
        } else {
          toast.error('No Percentage.');
        }
      } catch (error) {
        toast.error('Error fetching Customers:', error.message);
      }
    };

    getPercentageRate();
  }, [GetPercentage]);


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
          onClick={() => setIsOpen(true)}
        >
          Add Service Center
        </motion.button>
      </motion.div>
      <div>
        {isOpen && <AddServiceModal isOpen={isOpen} setIsOpen={setIsOpen} />}

      </div>
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
            <img src="/images/group-use.png" alt="rate" />
          </div>
          <div className='-mt-[12rem] flex justify-center'>
            <p className='text-[4rem] font-plus-jakarta'>{percentage}%</p>
          </div>
          <div className='flex justify-center'>
            {percentage <= 20 ? (
              <p className='text-red-500 text-lg font-medium font-plus-jakarta'>Low</p>
            ) : percentage <= 50 ? (
              <p className='text-yellow-500 text-lg font-medium font-plus-jakarta'>Average</p>
            ) : (
              <p className='text-green-500 text-lg font-medium font-plus-jakarta'>excellent</p>
            )}


          </div>
        </motion.div>

        <div className='mt-5 md:mt-0'>
          <div className="grid grid-cols-2 gap-4">
            <motion.div className="bg-white shadow-md w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-medium text-lg text-[#000]'>
                  Total Commission

                </h3>
                <span>...</span>
              </div>
              <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>50,000</p>
              <div className="mt-3 flex gap-2">
                <img src="/images/chart-ups.png" alt="up" />

                <p className='text-green-500'>32.3%</p>
              </div>
            </motion.div>
            <motion.div className="bg-white shadow-md w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-medium text-lg text-[#000]'>
                  Active Customers

                </h3>
                <span>...</span>
              </div>
              <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>{customers}</p>
              <div className="mt-3 flex gap-2">
                <img src="/images/chart-down.png" alt="up" />

                <p className='text-red-500'>32.3%</p>
              </div>
            </motion.div>
            <motion.div className="bg-white shadow-md w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-medium text-lg text-[#000]'>
                  Points

                </h3>
                <span>...</span>
              </div>
              <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>3</p>
              <div className="mt-3 flex gap-2">
                <img src="/images/chart-down.png" alt="up" />

                <p className='text-red-500'>52.3%</p>
              </div>
            </motion.div>
            <motion.div className="bg-white shadow-md w-full p-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between">
                <h3 className='font-medium text-lg text-[#000]'>
                  VU

                </h3>
                <span>...</span>
              </div>
              <p className='text-[28px] text-[#1D2433] font-medium font-poppins mt-6'>4</p>
              <div className="mt-3 flex gap-2">
                <img src="/images/chart-down.png" alt="up" />
                <p className='text-red-500'>22.3%</p>
              </div>
            </motion.div>
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
      <Toaster />
    </PartnersLayout>
  )
}

export default PartnersDashboard;
