import React, { useEffect, useState } from 'react';
import { IoIosReturnLeft } from 'react-icons/io';
import { ImUsers } from "react-icons/im";
import { CiClock2 } from "react-icons/ci";
import { RiBookLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { endpoints } from '../../../api/Endpoint';
import Layout from './Layout';
import { Loader } from '../../../AuthContext/Loader';

const CourseDetails = () => {

  const { id } = useParams();
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/tutor/course/edit-course/${courseId}`);
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

  const course = courses.find(c => c._id === (id));

  if (!course) return <div><Loader /></div>;
  return (
    <Layout>
      <div className="">
        <button className="flex items-center text-blue-600 mb-6">
          <IoIosReturnLeft className="mr-2" />
          Back to Courses
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img
              src={course.image || '/images/course-card-image.png'}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <CiClock2 className="mr-2" />
                <span>{course.duration} hrs</span>
              </div>
              <div className="flex items-center">
                <ImUsers className="mr-2" />
                <span>{course.students_enrolled} students</span>
              </div>
              <div className="flex items-center">
                <RiBookLine className="mr-2" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Instructor</h2>
              <p>{course.instructor}</p>
            </div>

            <div className="mt-10 mb-6">
              <h2 className="text-xl font-semibold mb-2">Course Content</h2>
              {course.sections?.map((section, index) => (
                <div key={section._id} className="mb-4">
                  <h3 className="font-semibold">{index + 1}. {section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                  <ul className="list-disc list-inside ml-4">
                    {section.lessons.map(lesson => (
                      <li key={lesson._id}>{lesson.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>



          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6">
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
              {/* <button onClick={() => handleCourseClick(course._id)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Edit Course
              </button> */}
              <button onClick={() => alert('Working on it')} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Edit Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;