import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosReturnLeft } from 'react-icons/io';
import { ImUsers } from "react-icons/im";
import { CiClock2, CiPlay1 } from "react-icons/ci";
import { BsPatchQuestion } from "react-icons/bs";
import { RiBookLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { endpoints } from '../../../api/Endpoint';
import Layout from './Layout';
import { Loader } from '../../../AuthContext/Loader';
import { Dialog, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { motion } from 'framer-motion';



const BuyCourse = () => {
  // const { id } = useParams();
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();
  const [openSectionId, setOpenSectionId] = useState(null);

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/tutor/course/edit-course/${courseId}`);
  };

  const sectionVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  // const getAllCourses = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('auth')).auth;
  //     console.log(token);
  //     const response = await axios.get(endpoints.getAllCourses, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log(response.data);
  //     setCourses(response.data.data)
  //   } catch (error) {
  //     toast.error('An error occured while fetching user data')
  //   }
  // }

  // useEffect(() => {
  //   getAllCourses();
  // }, []);

  const backToCourses = () => {
    navigate('/e-learning/student/all-courses');
  }

  const course = courses.find(c => c._id === (id));


  // if (!course) return <div><Loader /></div>;
  return (
    <Layout>
      <div className="">
        <button onClick={backToCourses} className="flex items-center text-blue-600 mb-6">
          <IoIosReturnLeft className="mr-2" />
          Back to Courses
        </button>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="bg-white shadow-lg rounded-lg p-6 flex md:flex-row flex-col md:space-x-5">
              <img
                // src={course.thumbnailUrl ? course.thumbnailUrl : '/images/course-img.png'}
                src={'/images/course-img.png'}
                // alt={course.title}
                className="w-full md:h-64 md:w-64 object-cover rounded-lg mb-6"
              />
              <div className='w-full'>
                <div className="flex items-center justify-between mb-4">
                  <div className="">
                    {/* <span className="bg-[#C0D5FD] text-sm px-3 py-1 rounded">{course.category}</span> */}
                    <span className="bg-[#C0D5FD] text-sm px-3 py-1 rounded">Category</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {/* {course.discount_price ? (
                    <>
                      <span>${course.discount_price}</span>
                      <span className="line-through text-red-500 ml-2">${course.price}</span>
                    </>
                  ) : (
                    <span>${course.price}</span>
                  )} */}

                    <>
                      <span>$20</span>
                      <span className="line-through text-red-500 ml-2">$10</span>
                    </>

                  </div>
                </div>
                <div className='space-y-2'>
                  <h2 className="md:text-3xl text-2xl font-bold">{course ? course.title : 'Lorem ipsum dolor sit amet.'}</h2>
                  <p className='font-normal md:text-sm text-xs'>By Mayowa Sunusi</p>
                </div>

                {/* <button onClick={() => alert('Working on it')} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Edit Course
              </button> */}

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="flex items-center space-x-3">
                    <span><CiPlay1 /></span>
                    {/* <span>{course.duration} hours videos</span> */}
                    <span>5 hours videos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span><RiBookLine /></span>
                    {/* <span>{course.sections.length} sections</span> */}
                    <span>5 sections</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span><BsPatchQuestion /></span>
                    {/* <span>{course.sections.length} quizzess</span> */}
                    <span>5 quizzess</span>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="md:col-span-2">
            <div className='bg-white shadow-lg rounded-lg p-6'>
              <h4 className="font-bold text-2xl">Summary</h4>
              <div className='spacew-y-3'>
                <div className="flex items-center justify-between mt-4">
                  <span>Original Price</span>
                  <span>N20,000</span>
                </div>
                <div className="flex items-center justify-between mt-4 pb-3">
                  <span>Discount Price</span>
                  <span>N10,000</span>
                </div>
                <hr />
                <div className="flex items-center justify-between mt-4 font-bold pb-4">
                  <span>Total</span>
                  <span>N10,000</span>
                </div>
              </div>

              {/* <button onClick={() => handleCourseClick(course._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"> */}
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyCourse;