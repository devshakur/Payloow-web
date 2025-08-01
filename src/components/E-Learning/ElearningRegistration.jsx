import React from 'react';
import CreateCourseBanner from './Tutor/CreateCourseBanner';
import DashboardLayout from '../Dashboard/DashboardLayout';
import RoleSelectionModal from './RoleSelectionModal';



const courses = [
  {
    thumbnailUrl: '/images/course-img.png',
    title: 'Mastering React from Scratch',
    category: 'Web Development',
    students_enrolled: 1200,
    price: 120,
    discount_price: 85,
  },
  {
    thumbnailUrl: '/images/course-img.png',
    title: 'UI/UX Design Principles',
    category: 'Design',
    students_enrolled: 870,
    price: 100,
    discount_price: null,
  },
    {
    thumbnailUrl: '/images/course-img.png',
    title: 'UI/UX Design Principles',
    category: 'Design',
    students_enrolled: 870,
    price: 100,
    discount_price: null,
  },
];
const currentUser =  JSON.parse(localStorage.getItem("currentUser"));




const ELearningRegistration = () => {
  const handleTutor = () => {
    if(currentUser?.elearningRole === 'tutor'){
      window.location.href = '/e-learning/tutor/dashboard';
    }else{
    window.location.href =  '/e-learning/tutor/complete-profile';
    }
  };

  const handleStudent = () => {
      window.location.href = '/e-learning/student/dashboard';
    
  };

  

  return (
    <DashboardLayout>
      <RoleSelectionModal handleTutor={handleTutor} handleStudent={handleStudent} />
      <CreateCourseBanner />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg cursor-pointer"
          >
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            <div className="p-5 h-52 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1">{course.category}</p>
                <div className="flex items-center space-x-1 text-xs">
                  <img src="/images/students-icon.svg" alt="students" className="w-10" />
                  <p>{course.students_enrolled} enrolled</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <div className="flex items-center justify-between font-bold text-2xl">
                {course.discount_price ? (
                  <div>
                    <span className="line-through mr-2 text-red-500 text-xl">${course.price}</span>
                    <span>${course.discount_price}</span>
                  </div>
                ) : (
                  <div>${course.price}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ELearningRegistration;
