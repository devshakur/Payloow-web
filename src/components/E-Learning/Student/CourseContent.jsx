import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { CiPlay1 } from "react-icons/ci"
import { FaCheckCircle } from "react-icons/fa"
import toast from 'react-hot-toast'

const CourseContent = ({ course, setCurrentVideoUrl, isMobile }) => {
  const [openSectionId, setOpenSectionId] = useState(null)

  const sectionVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  }

  const handleLessonClick = (videoUrl) => {
    const cleanedUrl = videoUrl.trim().replace(/\s+/g, '%20')
    setCurrentVideoUrl(cleanedUrl)
  }

  const handleLessonComplete = (courseId, sectionId, lessonId) => {
    toast.success('Lesson completed successfully')
    // Implement API call here to mark the lesson as complete in the backend
  }

  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${isMobile ? '' : ''}`}>
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>
      <div className="space-y-4">
        {course.sections?.map((section) => (
          <Section
            key={section._id}
            section={section}
            openSectionId={openSectionId}
            setOpenSectionId={setOpenSectionId}
            handleLessonClick={handleLessonClick}
            handleLessonComplete={handleLessonComplete}
            sectionVariant={sectionVariant}
            course={course}
          />
        ))}
      </div>
    </div>
  )
}

const Section = ({
  section,
  openSectionId,
  setOpenSectionId,
  handleLessonClick,
  handleLessonComplete,
  sectionVariant,
  course
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={sectionVariant}
      transition={{ duration: 0.3 }}
    >
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
        <motion.div
          className="space-y-2 mt-2 pl-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sectionVariant}
          transition={{ duration: 0.3 }}
        >
          {section.lessons.map(lesson => (
            <div key={lesson._id} className='flex items-center justify-between py-2 border-b last:border-b-0'>
              <div
                className='flex items-center space-x-3 cursor-pointer'
                onClick={() => handleLessonClick(lesson.videoUrl)}
              >
                <span className="text-blue-500"><CiPlay1 size={20} /></span>
                <span className="text-gray-700 hover:text-blue-600 transition-colors">
                  {lesson.title}
                </span>
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
  )
}

export default CourseContent
