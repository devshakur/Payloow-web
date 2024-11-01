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



const CourseDetails = () => {
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
            <h1 className="text-3xl font-bold mb-4">{course ? course.title : 'Lorem ipsum dolor sit amet.'}</h1>
            <div className="h-44 max-h-64 overflow-hidden overflow-y-scroll">
              <p className="text-gray-600 mb-6">{course ? course.description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem consequuntur eos officiis perferendis suscipit doloremque, nemo, minus, sapiente laudantium voluptatum dignissimos excepturi. Repudiandae perferendis fugit porro ipsa commodi aliquam molestias! Temporibus, aperiam? Quos qui vitae doloribus mollitia nesciunt? Hic aspernatur quos voluptates temporibus, dolorum incidunt exercitationem qui aperiam possimus beatae at soluta fuga nisi totam quisquam minima veritatis, maiores corporis.'}</p>
            </div>

            <TabGroup>
              <TabList className="flex mb-6">

                <Tab className="course-detail-card">
                  Contents
                </Tab>
                <Tab className="course-detail-card">
                  Quiz
                </Tab>
                <Tab className="course-detail-card">
                  Announcements
                </Tab>
                <Tab className="course-detail-card">
                  Q&A
                </Tab>
              </TabList>
              <TabPanels className="mt-6">
                <TabPanel>
                  <div className="mt-10 mb-6">
                    {/* {course.sections?.map((section) => ( */}
                    {/* <motion.div key={section._id} */}
                    <motion.div
                      className="mb-4"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={sectionVariant}
                      transition={{ duration: 0.5 }}>
                      {/* <div
                          className='bg-white flex items-center justify-between text-xl p-3 rounded-xl cursor-pointer'
                          onClick={() => setOpenSectionId(openSectionId === section._id ? null : section._id)}
                        > */}
                      <div
                        className='bg-white flex items-center justify-between text-xl p-3 rounded-xl cursor-pointer'
                      >
                        {/* <span>{section.title}</span> */}
                        <span>Title</span>
                        <span>
                          {/* {openSectionId === section._id ? <IoIosArrowUp /> : <IoIosArrowDown />} */}
                        </span>
                      </div>
                      {/* {openSectionId === section._id && ( */}
                      <motion.div className="space-y-5 pl-5 mt-5"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={sectionVariant}
                        transition={{ duration: 0.5 }}>
                        {/* {section.lessons.map(lesson => ( */}
                        {/* <div key={lesson._id} className='flex items-center space-x-3'> */}
                        <div className='flex items-center space-x-3'>
                          <span><CiPlay1 /></span>
                          {/* <span>{lesson.title}</span> */}
                          <span>Lesson Title</span>
                        </div>
                        {/* ))} */}
                      </motion.div>
                      {/* )} */}
                    </motion.div>
                    {/* ))
                    } */}
                  </div>
                </TabPanel>
                <TabPanel>
                  No Quiz
                </TabPanel>
                <TabPanel>
                  No Announcement
                </TabPanel>
                <TabPanel>
                  No Q&A
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>



          <div className="md:col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <img
                // src={course.thumbnailUrl ? course.thumbnailUrl : '/images/course-img.png'}
                src={'/images/course-img.png'}
                // alt={course.title}
                className="w-full h-72 object-cover rounded-lg mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="mb-4">
                  {/* <span className="bg-[#C0D5FD] text-sm px-3 py-1 rounded">{course.category}</span> */}
                  <span className="bg-[#C0D5FD] text-sm px-3 py-1 rounded">category</span>
                </div>
                <div className="text-3xl font-bold mb-4">
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
              {/* <button onClick={() => handleCourseClick(course._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"> */}
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
              {/* <button onClick={() => alert('Working on it')} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Edit Course
              </button> */}

              <h3 className="font-bold text-xl mt-10">Course Includes</h3>
              <div className="space-y-4 mt-5">
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
      </div>
    </Layout>
  );
};

export default CourseDetails;