'use client'

import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp, IoIosReturnLeft } from 'react-icons/io'
import { CiPlay1 } from "react-icons/ci"
import { FaCheckCircle } from "react-icons/fa"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { endpoints } from '../../../api/Endpoint'
import Layout from './Layout'
import { Loader } from '../../../AuthContext/Loader'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import ReactPlayer from 'react-player'
import QuizTab from './QuizTab'

const MyCourse = () => {
  const { id } = useParams()
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  const [openSectionId, setOpenSectionId] = useState(null)
  const [courseQuiz, setCourseQuiz] = useState([])
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')

  const sectionVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  }

  const removeAllWhitespace = (url) => {
    return url.trim().replace(/\s+/g, '%20')
  }

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCourses(response.data.data)

      // Find the current course by id and set the first lesson as the default video URL
      const currentCourse = response.data.data.find(course => course._id === id)
      if (currentCourse && currentCourse.sections.length > 0 && currentCourse.sections[0].lessons.length > 0) {
        setCurrentVideoUrl(removeAllWhitespace(currentCourse.sections[0].lessons[0].videoUrl))
      }
    } catch (error) {
      toast.error('An error occurred while fetching user data')
    }
  }

  const fetchQuiz = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth
      const response = await axios.get(endpoints.getCourseQuiz(id), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCourseQuiz(response.data.data)
      console.log('Course Quiz:', response.data.data);

    } catch (error) {
      console.error("Error fetching course:", error)
    }
  }

  useEffect(() => {
    getAllCourses()
    fetchQuiz()
  }, [])

  const backToCourses = () => {
    navigate('/e-learning/student/courses')
  }

  const course = courses.find(c => c._id === id)

  const handleLessonClick = (videoUrl) => {
    const cleanedUrl = removeAllWhitespace(videoUrl)
    setCurrentVideoUrl(cleanedUrl)
    console.log('Cleaned Video URL:', cleanedUrl)
  }

  const handleLessonComplete = (courseId, sectionId, lessonId) => {
    toast.success('Lesson completed successfully')
    // Implement API call here to mark the lesson as complete in the backend
  }

  if (!course) return <div><Loader /></div>

  return (
    <>
      <Toaster />
      <Layout>
        <div className="container mx-auto px-4">
          <button onClick={backToCourses} className="flex items-center text-blue-600 mb-6">
            <IoIosReturnLeft className="mr-2" />
            Back to Courses
          </button>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <div className="aspect-w-16 aspect-h-9 mb-5 md:h-[27rem] h-96">
                <ReactPlayer
                  url={currentVideoUrl}
                  width="100%"
                  height="100%"
                  controls
                  pip={true}
                  stopOnUnmount={false}
                  volume={0.1}
                  playIcon={<button className="text-white bg-primary rounded-full p-2"><CiPlay1 size={30} /></button>}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:hidden my-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                  <div className="space-y-4">
                    {course.sections?.map((section) => (
                      <motion.div key={section._id}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={sectionVariant}
                        transition={{ duration: 0.3 }}>
                        <div
                          className='bg-gray-100 flex items-center justify-between text-xl p-3 rounded-xl cursor-pointer'
                          onClick={() => setOpenSectionId(openSectionId === section._id ? null : section._id)}
                        >
                          <span className="font-medium">{section.title}</span>
                          <span>
                            {openSectionId === section._id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                          </span>
                        </div>
                        {openSectionId === section._id && (
                          <motion.div className="space-y-2 mt-2 pl-4"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={sectionVariant}
                            transition={{ duration: 0.3 }}>
                            {section.lessons.map(lesson => (
                              <div key={lesson._id} className='flex items-center justify-between py-2 border-b last:border-b-0'>
                                <div className='flex items-center space-x-3 cursor-pointer' onClick={() => handleLessonClick(lesson.videoUrl)}>
                                  <span className="text-blue-500"><CiPlay1 size={20} /></span>
                                  <span className="text-gray-700 hover:text-blue-600 transition-colors">{lesson.title}</span>
                                </div>
                                <button
                                  onClick={() => handleLessonComplete(course._id, section._id, lesson._id)}
                                  className={`${lesson.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'} transition-colors`}
                                >
                                  <FaCheckCircle size={18} />
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <TabGroup>
                <TabList className="flex mb-6 border-b">
                  <Tab className={({ selected }) => `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Overview</Tab>
                  <Tab className={({ selected }) => `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Quiz</Tab>
                  <Tab className={({ selected }) => `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Announcements</Tab>
                  <Tab className={({ selected }) => `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Q&A</Tab>
                </TabList>
                <TabPanels className="mt-6">
                  <TabPanel>
                    <div>
                      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                      <div className="h-44 max-h-64 overflow-hidden overflow-y-auto">
                        <p className="text-gray-600 mb-6">{course.description}</p>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {courseQuiz.length > 0 ? (
                      <QuizTab quizData={courseQuiz} />
                    )
                      :
                      <p className="text-gray-600">No Quiz available at the moment.</p>
                    }
                  </TabPanel>
                  <TabPanel>
                    <p className="text-gray-600">No Announcements at this time.</p>
                  </TabPanel>
                  <TabPanel>
                    <p className="text-gray-600">No Q&A sessions scheduled.</p>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>

            <div className="md:col-span-2 md:order-last order-first md:block hidden">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="space-y-4">
                  {course.sections?.map((section) => (
                    <motion.div key={section._id}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={sectionVariant}
                      transition={{ duration: 0.3 }}>
                      <div
                        className='bg-gray-100 flex items-center justify-between text-xl p-3 rounded-xl cursor-pointer'
                        onClick={() => setOpenSectionId(openSectionId === section._id ? null : section._id)}
                      >
                        <span className="font-medium">{section.title}</span>
                        <span>
                          {openSectionId === section._id ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span>
                      </div>
                      {openSectionId === section._id && (
                        <motion.div className="space-y-2 mt-2 pl-4"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={sectionVariant}
                          transition={{ duration: 0.3 }}>
                          {section.lessons.map(lesson => (
                            <div key={lesson._id} className='flex items-center justify-between py-2 border-b last:border-b-0'>
                              <div className='flex items-center space-x-3 cursor-pointer' onClick={() => handleLessonClick(lesson.videoUrl)}>
                                <span className="text-blue-500"><CiPlay1 size={20} /></span>
                                <span className="text-gray-700 hover:text-blue-600 transition-colors">{lesson.title}</span>
                              </div>
                              <button
                                onClick={() => handleLessonComplete(course._id, section._id, lesson._id)}
                                className={`${lesson.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'} transition-colors`}
                              >
                                <FaCheckCircle size={18} />
                              </button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MyCourse
