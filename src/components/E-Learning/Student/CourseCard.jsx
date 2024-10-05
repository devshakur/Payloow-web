import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

const CourseCard = ({
  image,
  courseTitle,
  progress,
  tag,
  enrolledStudents,
}) => {
  const getProgressColor = (progress) => {
    switch (progress.toLowerCase()) {
      case "completed":
        return "text-green-500 bg-green-100";
      case "in progress":
        return "text-orange-500 bg-orange-100";
      case "not started":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <img src={image} alt={courseTitle} />
      <div className="p-5 h-44">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1">{tag}</p>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <img src="/images/students-icon.svg" alt="" />
            <p>+ {enrolledStudents} enrolled</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold pb-5">{courseTitle}</h3>
          <div className="flex items-center justify-between">
            <p
              className={`${getProgressColor(
                progress
              )} text-sm capitalize px-5 rounded py-1`}
            >
              {progress}
            </p>
            <SlOptionsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
