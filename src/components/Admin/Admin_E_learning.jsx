import React,{ useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { motion } from 'framer-motion';
import { IoIosArrowDown} from "react-icons/io";
import Tutor from './Tutor';
import Courses from './Courses';
import Admin_Headers from './Admin_Headers';
import axios from 'axios';
import { AdminEndpoints } from '../../api/Endpoint';
import {toast, Toaster} from 'react-hot-toast'




const Admin_E_learning = () => {
const [active, setActive] = useState('tutors')
const [loading, setLoading] = useState(false)
const [tutors, setTutors] = useState([])
const [courses, setCourses] = useState([])
const [students, setStudents] = useState([])

const getAllTutors = async () => {
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

      const response = await axios.get(AdminEndpoints.getAllTutors, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      
      setTutors(response.data.data);
  } catch (error) {
     
      toast.error('An error occurred while fetching user data');
  } finally {
      setLoading(false); // Ensure loading is set to false
  }
};
const getAllCourses = async () => {
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

      const response = await axios.get(AdminEndpoints.getAllCourses, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      
      setCourses(response.data.data);
  } catch (error) {
     
      toast.error('An error occurred while fetching user data');
  } finally {
      setLoading(false); // Ensure loading is set to false
  }
};
const getAllStudents = async () => {
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

      const response = await axios.get(AdminEndpoints.getEnrolledStudents, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      
      setStudents(response.data.data);
  } catch (error) {
     
      toast.error('An error occurred while fetching user data');
  } finally {
      setLoading(false); // Ensure loading is set to false
  }
};


useEffect(() => {
  getAllTutors()
  getAllCourses()
  getAllStudents()
}, [])

  return (
    <AdminLayout>
      <>
      <Admin_Headers 
      one={' No. of Tutors'}
      two={tutors?.length} 
      img1={tutors?.length > 20 ? "/images/chart-ups.png" : "/images/chart-down.png"}
      img1_text={tutors?.length > 20 ? 'green' : 'red'}
      three={(tutors?.length / 50).toLocaleString() * 100 || '0'}
      four={'Total No. of Courses'}
      five={courses?.length}
      six={(tutors?.length / courses ).toLocaleString() * 100 || '0'}
      img2={courses > 20 ? "/images/chart-ups.png" : "/images/chart-down.png"}
      six_text={courses > 20 ? 'green' : 'red'}
      seven={' No. of Students'}
      eight={'200'}
      nine={'18%'}
      img={"/images/chart-down.png"}
      arrow={'red'}
      />
            <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className='mt-10 border-b border-gray-400 w-[150px] p-2'
        >
          <ul className='flex gap-3 cursor-pointer mt-6 md:mt-0'>
            <motion.li 
              tabIndex={0}  
              onClick={()=>setActive('tutors')}
              className='focus:text-blue-600 font-poppins font-medium text-lg'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Tutors
            </motion.li>
            <motion.li 
              tabIndex={0}
              onClick={()=>setActive('courses')}
              className='focus:text-blue-600 font-poppins font-medium text-lg'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
             Courses
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
          {active === 'tutors' ? <Tutor tutors={tutors} /> : <Courses courses={courses} />}

          </div>
      
           <Toaster />
      </>
    </AdminLayout>
  )
}

export default Admin_E_learning

