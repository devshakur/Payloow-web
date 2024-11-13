import React, { useEffect, useState } from 'react'
import { IoIosReturnLeft } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './Layout'
import VideoPlayer from './VideoPlayer'
import CourseContent from './CourseContent'
import CourseTabs from './CourseTabs'
import { Loader } from '../../../AuthContext/Loader'
import { useCourse } from '../../../hooks/useCourse'


const SingleCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')
  const { course, tutor, courseQuiz, loading, courseMessages, announcements } = useCourse(id)

  const backToCourses = () => {
    navigate('/e-learning/student/courses')
  }

  if (loading) return <div><Loader /></div>

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
              <VideoPlayer
                currentVideoUrl={currentVideoUrl}
              />
              <div className="md:hidden my-6">
                <CourseContent
                  course={course}
                  setCurrentVideoUrl={setCurrentVideoUrl}
                  isMobile={true}
                />
              </div>
              <CourseTabs
                course={course}
                tutor={tutor}
                courseId={id}
                courseQuiz={courseQuiz}
                courseMessages={courseMessages}
                announcements={announcements}
              />
            </div>

            <div className="md:col-span-2 md:order-last order-first md:block hidden">
              <CourseContent
                course={course}
                setCurrentVideoUrl={setCurrentVideoUrl}
                isMobile={false}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SingleCourse