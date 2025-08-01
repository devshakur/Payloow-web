import React, { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import QuizTab from './QuizTab'
import TutorInfo from './TutorInfo'
import MessageTab from './MessageTab'
import AnnouncementTab from './AnnouncementTab'
import RatingModal from './RatingModal'

const CourseTabs = ({
  course,
  tutor,
  courseId,
  courseQuiz,
  courseMessages,
  announcements,
  fetchQuiz,
  setCourseQuiz,
  selectedTabIndex,
  setSelectedTabIndex
}) => {

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)

 
  

  return (
 <TabGroup selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
      <TabList className="flex mb-6 border-b">
        <Tab className={({ selected }) =>
          `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-b-blue-600 outline-none' : 'text-gray-500'}`
        }>
          Overview
        </Tab>
        <Tab className={({ selected }) =>
          `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-b-blue-600 outline-none' : 'text-gray-500'}`
        }>
          Quiz
        </Tab>
        <Tab className={({ selected }) =>
          `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-b-blue-600 outline-none' : 'text-gray-500'}`
        }>
          Announcements
        </Tab>
        <Tab className={({ selected }) =>
          `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-b-blue-600 outline-none' : 'text-gray-500'}`
        }>
          Messages
        </Tab>
        <Tab className={({ selected }) =>
          `px-4 py-2 font-medium ${selected ? 'text-blue-600 border-b-2 border-b-blue-600 outline-none' : 'text-gray-500'}`
        }>
          Review
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel>
          <TutorInfo course={course} tutor={tutor} courseId={courseId} />
        </TabPanel>
      
        <TabPanel>
          {courseQuiz?.length > 0 ? (
            <QuizTab quizData={courseQuiz} />
          ) : (
            <p className="text-gray-600">No Quiz available at the moment.</p>
          )}
        </TabPanel>
        <TabPanel>
          <AnnouncementTab announcements={announcements} />
        </TabPanel>
        <TabPanel>
          <MessageTab courseMessages={courseMessages} courseId={courseId} />
        </TabPanel>
        <TabPanel>
          <button
            onClick={() => setIsRatingModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Rate this Course
          </button>        </TabPanel>
      </TabPanels>
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        courseId={courseId}
      />
    </TabGroup>
  )
}

export default CourseTabs