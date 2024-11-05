import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosReturnLeft } from 'react-icons/io';
import { ImUsers } from "react-icons/im";
import { CiClock2, CiPlay1 } from "react-icons/ci";
import { BsPatchQuestion } from "react-icons/bs";
import { RiBookLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../../api/Endpoint';
import Layout from './Layout';
import { Loader } from '../../../AuthContext/Loader';
import { Dialog, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';



const CourseDetails = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();
  const [openSectionId, setOpenSectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/tutor/course/edit-course/${courseId}`);
  };

  const sectionVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data.data)
    } catch (error) {
      toast.error('An error occured while fetching user data')
    }
  }

  const addToCart = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.post(endpoints.addToCart, {
        course_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success('Course added to cart')
    } catch (error) {
      console.error(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const backToCourses = () => {
    navigate('/e-learning/student/all-courses');
  }

  const goToBuyCourse = () => {
    navigate(`/e-learning/student/course/buy/${id}`);
  }

  const course = courses.find(c => c._id === (id));


  if (!course) return <div><Loader /></div>;
  return (
    <>
      <Toaster />
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
                      {course.sections?.map((section) => (
                        <motion.div key={section._id}
                          className="mb-4"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={sectionVariant}
                          transition={{ duration: 0.5 }}>
                          <div
                            className='bg-white flex items-center justify-between text-xl p-3 rounded-xl cursor-pointer'
                            onClick={() => setOpenSectionId(openSectionId === section._id ? null : section._id)}
                          >

                            <span>{section.title}</span>
                            <span>
                              {openSectionId === section._id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </span>
                          </div>
                          {openSectionId === section._id && (
                            <motion.div className="space-y-5 pl-5 mt-5"
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={sectionVariant}
                              transition={{ duration: 0.5 }}>
                              {section.lessons.map(lesson => (
                                <div key={lesson._id} className='flex items-center space-x-3'>

                                  <span><CiPlay1 /></span>
                                  <span>{lesson.title}</span>

                                </div>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      ))
                      }
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



            <div className="md:col-span-2 md:order-last order-first">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img
                  src={course.thumbnailUrl ? course.thumbnailUrl : '/images/course-img.png'}
                  alt={course.title}
                  className="w-full h-72 object-cover rounded-lg mb-6"
                />
                <div className="flex items-center justify-between">
                  <div className="mb-4">
                    <span className="bg-[#C0D5FD] text-sm px-3 py-1 rounded">{course.category}</span>
                  </div>
                  <div className="text-3xl font-bold mb-4">
                    {course.discount_price ? (
                      <>
                        <span>${course.discount_price}</span>
                        <span className="line-through text-red-500 ml-2">${course.price}</span>
                      </>
                    ) : (
                      <span>${course.price}</span>
                    )}
                  </div>
                </div>
                {/* <button onClick={() => handleCourseClick(course._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"> */}
                <button onClick={goToBuyCourse} className="w-full text-blue-600 bg-white border border-primary py-3 rounded-lg hover:bg-primary mb-5 hover:text-white transition duration-300">
                  Buy Now
                </button>
                <button
                  disabled={isLoading}
                  onClick={addToCart}
                  className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
                  {isLoading ? <div className="loader"></div> : "Add to Cart"}
                </button>

                {/* <button onClick={() => alert('Working on it')} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Edit Course
              </button> */}

                <h3 className="font-bold text-xl mt-10">Course Includes</h3>
                <div className="space-y-4 mt-5">
                  <div className="flex items-center space-x-3">
                    <span><CiPlay1 /></span>
                    <span>{course.duration} hours videos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span><RiBookLine /></span>
                    <span>{course.sections.length} sections</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span><BsPatchQuestion /></span>
                    <span>{course.sections.length} quizzess</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CourseDetails;