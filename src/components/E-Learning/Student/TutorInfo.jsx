import React from 'react'
import { FaLinkedin, FaStar } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const TutorInfo = ({ course, tutor, courseId, }) => {

  return (
    <>
      <div className='space-y-6'>
        {/* <h1 className="text-3xl font-bold mb-4">{courseId}</h1> */}
        <h2 className="text-3xl font-bold mb-4">{course?.title}</h2>
        <hr />
        <div>
          <div className="flex items-center space-x-10 ">
            <div>
              <div className='flex items-center space-x-1'>
                <div className="font-bold text-2xl">{course?.averageRating}</div>
                <FaStar color='#FF9529' size={24} />
              </div>
              <p className='text-sm'>{course?.numOfReviews} ratings</p>
            </div>
            <div>
              <div className='flex items-center space-x-1'>
                <div className="font-bold text-2xl">{course?.students_enrolled}</div>
              </div>
              <p className='text-sm'>Students</p>
            </div>
            <div>
              <div className='flex items-center space-x-1'>
                <div className="font-bold text-2xl">{course?.duration?.includes('hours') ? course?.duration : `${course?.duration} hours`}</div>
              </div>
              <p className='text-sm'>Total</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex space-x-10">
          <p>Description</p>
          <p className="text-gray-600 mb-6">{course?.description}</p>
        </div>
        <hr />
        <div className="flex space-x-10">
          <p>Instructor</p>
          <div className='space-y-5'>
            <div className="text-gray-600 mb-6 space-x-3 flex items-center">
              <img src={'/images/user1.jpg'} alt="" className='h-20 w-20 rounded-full' />
              <div>
                <p className="font-semibold text-lg">{tutor?.tutor_name}</p>
                <p className="">{tutor?.tutor_experience}</p>
              </div>

            </div>
            <div className="flex items-center space-x-5">
              <a href={tutor?.tutor_email} target='_blank'><MdEmail size={24} /></a>
              <a href={tutor?.tutor_linkedin} target='_blank'><FaLinkedin size={24} /></a>
              <a href={tutor?.tutor_twitter} target='_blank'><FaSquareXTwitter size={24} /></a>
            </div>
            <div>
              <p>&quot;{tutor?.tutor_about}&quot;</p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default TutorInfo