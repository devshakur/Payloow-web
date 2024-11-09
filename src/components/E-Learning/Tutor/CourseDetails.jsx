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
import CreateQuiz from './CreateQuiz';


const CourseDetails = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();
  const [openSectionId, setOpenSectionId] = useState(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

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
      console.log(token);
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setCourses(response.data.data)
    } catch (error) {
      toast.error('An error occured while fetching user data')
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const backToCourses = () => {
    navigate('/e-learning/tutor/all-courses');
  }

  const course = courses.find(c => c._id === (id));

  const handleQuizSubmit = async (quizzes) => {
    const payload = {
      course_id: id,
      section_id: openSectionId,
      lesson_id: null, // Update this if you have a specific lesson ID
      quiz_title: quizzes[0].title || "Sample Quiz",
      questions: quizzes[0].questions.map((q) => ({
        question_text: q.question,
        options: q.options.map((option, index) => ({
          option,
          is_correct: q.correctOption === index,
        })),
      })),
    };

    console.log(payload);
    // try {
    //   const token = JSON.parse(localStorage.getItem('auth')).auth;
    //   await axios.post(endpoints.createQuiz, payload, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   toast.success('Quiz created successfully');
    //   setIsQuizModalOpen(false);
    // } catch (error) {
    //   toast.error('Failed to create quiz');
    // }
  };





  if (!course) return <div><Loader /></div>;
  return (
    <Layout>
      <div className="">
        <button onClick={backToCourses} className="flex items-center text-blue-600 mb-6">
          <IoIosReturnLeft className="mr-2" />
          Back to Courses
        </button>

        <div className="grid md:grid-cols-5 gap-8">

          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <div className="h-44 max-h-64 overflow-hidden overflow-y-scroll">
              <p className="text-gray-600 mb-6">{course.description}</p>
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
                    ))}
                  </div>
                </TabPanel>
                <TabPanel>
                  <button
                    onClick={() => setIsQuizModalOpen(true)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    Create Quiz
                  </button>
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
              <button onClick={() => handleCourseClick(course._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Edit Course
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

      <Dialog
        open={isQuizModalOpen}
        as="div"
        className="relative z-50"
        onClose={() => setIsQuizModalOpen(false)}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-3xl bg-white rounded-lg p-6">
            <CreateQuiz
              onClose={() => setIsQuizModalOpen(false)}
              onSubmit={handleQuizSubmit}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </Layout>
  );
};

export default CourseDetails;