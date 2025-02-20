import React,{useState,useEffect} from 'react'
import AdminLayout from './AdminLayout'
import Admin_Headers from './Admin_Headers'
import { motion } from 'framer-motion';
import { IoIosArrowDown} from "react-icons/io";
import Debtors from './Debtors';
import Investors from './Investors';
import Businesses from './Businesses';
import DebtorBusiness from './DebtorBusiness';
import {toast, Toaster} from 'react-hot-toast'
import axios from "axios";
import { AdminEndpoints } from '../../api/Endpoint';

const Admin_Investment = () => {
    const [active, setActive] = useState('Debtor')
    const [data, setData] = useState([])
    const [investors, setInvestors] = useState([])
    const [business, setBusiness] = useState([])
    const [loading, setLoading] = useState(false)
  


    const getAllDebtors = async () => {
        try {
            setLoading(true); // Set loading to true before fetching
    
            const authData = localStorage.getItem('auth');
            if (!authData) {
                throw new Error('No auth data found');
            }
    
            const token = JSON.parse(authData)?.auth;
            if (!token) {
                throw new Error('Invalid token');
            }
    
            const response = await axios.get(AdminEndpoints.getAllDebtors, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
           toast.success('Data Fetched')
            setData(response.data.data);
            
        } catch (error) {
            console.error('Error fetching debtors:', error);
            toast.error('An error occurred while fetching user data');
        } finally {
            setLoading(false); // Ensure loading is set to false
        }
    };

    const getAllInvestors = async () => {
      try {
          setLoading(true); // Set loading to true before fetching
  
          const authData = localStorage.getItem('auth');
          if (!authData) {
              throw new Error('No auth data found');
          }
  
          const token = JSON.parse(authData)?.auth;
          if (!token) {
              throw new Error('Invalid token');
          }
  
          const response = await axios.get(AdminEndpoints.getAllInvestors, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
           toast.success('Data Fetched ')
          setInvestors(response.data.data);
      } catch (error) {
          toast.error('An error occurred while fetching user data');
      } finally {
          setLoading(false); // Ensure loading is set to false
      }
  };
  const getAllBusiness = async () => {
    try {
        setLoading(true); // Set loading to true before fetching

        const authData = localStorage.getItem('auth');
        if (!authData) {
            throw new Error('No auth data found');
        }

        const token = JSON.parse(authData)?.auth;
        if (!token) {
            throw new Error('Invalid token');
        }

        const response = await axios.get(AdminEndpoints.getAllBusinesses, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        setBusiness(response.data.data);
    } catch (error) {
       
        toast.error('An error occurred while fetching user data');
    } finally {
        setLoading(false); // Ensure loading is set to false
    }
};



  
  useEffect(() => {
    getAllDebtors();
      getAllInvestors();
      getAllBusiness();
  }, []); 
    
  
  return (
      <AdminLayout>
    <>
    <Admin_Headers
      one={'Total Debtors'}
      two={data?.length} 
      img1={data?.length > 20 ? "/images/chart-ups.png" : "/images/chart-down.png"}
      img1_text={data?.length > 20 ? 'green' : 'red'}
      three={(data?.length / business?.length).toLocaleString() * 100 || '0'}
      four={'Total Investors'}
      five={investors?.length}
      six={(investors?.length / business?.length).toLocaleString() * 100 || '0' }
      img2={investors?.length > 20 ? "/images/chart-ups.png" : "/images/chart-down.png"}
      six_text={investors?.length > 20 ? 'green' : 'red'}
      seven={'Total Businesses'}
      eight={business?.length}
      nine={(investors?.length / business?.length ).toLocaleString()  * 100  || '0' }
      img={business?.length > 20 ? "/images/chart-ups.png" : "/images/chart-down.png"}
      arrow={business?.length > 20 ? 'green' : 'red'}
      />
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className='mt-10'
        >
          <ul className='flex gap-5 cursor-pointer mt-6 md:mt-0'>
            <motion.li 
              tabIndex={0}  
              onClick={()=>setActive('Debtor')}
              className='focus:text-blue-600 font-poppins font-medium text-sm lg:text-lg'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Debtors
            </motion.li>
            <motion.li 
              tabIndex={0}
              onClick={()=>setActive('Investor')}
              className='focus:text-blue-600 font-poppins font-medium text-sm lg:text-lg'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
             Investors
            </motion.li>  
            <motion.li 
              tabIndex={0}
              onClick={()=>setActive('Business')}
              className='focus:text-blue-600 font-poppins font-medium text-sm lg:text-lg'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
            Businesses
            </motion.li>  
          </ul> 
        </motion.div>
        <motion.div 
                className="flex justify-between mt-5"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className='lg:flex items-center gap-4'>
                    <button className='p-2'>
                        <p className='text-md text-[#000]'> Filters</p>
                    </button>
                    <div className='hidden lg:flex gap-3'>
                        <p className='font-poppins text-md font-semibold flex items-center gap-2 text-blue-400'>
                            Type <IoIosArrowDown className='text-blue-400' />
                        </p>
                    </div>
                </div>
                <p className='font-poppins font-medium flex items-center gap-2 text-md text-[#101928]'>
                    Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>November</span>
                </p>
            </motion.div>
            <div className="w-full">
             {active === 'Debtor' && <Debtors data={data} />}
             {active === 'Investor' && <Investors investors={investors} />}
             {active === 'Business' && <Businesses business={business} />}
             {active === 'Debtor_Business' && <DebtorBusiness />}
             <Toaster />
            </div>
    </>
      </AdminLayout>
  )
}

export default Admin_Investment
