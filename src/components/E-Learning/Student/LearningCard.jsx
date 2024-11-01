import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

const LearningCard = ({
  thumbnailUrl,
  title,
  progress,
  tag,
  enrolledStudents,
  percentageCompleted
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
    <div className="bg-white shadow-lg rounded-lg mb-5">
      <img src={thumbnailUrl ? thumbnailUrl : '/images/course-img.png'} alt={title} className="h-40 w-full object-cover rounded-t-lg" />

      <div className="p-5 h-60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1">{tag}</p>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <img src="/images/students-icon.svg" alt="" />
            <p>+ {enrolledStudents} enrolled</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold pb-5 h-2/6 place-items-start">{title}</h3>
        <div className="w-full bg-slate-100 h-2 mb-5 rounded-full">
          <div
            className={`bg-primary h-full rounded-full`}
            style={{ width: `${percentageCompleted}%` }}
          ></div>
        </div>
        <div className="place-items-end w-full">
          <div className="flex items-center justify-between">
            <p
              className={`${getProgressColor(
                progress
              )} text-sm capitalize px-5 rounded py-1`}
            >
              {progress}
            </p>
            <span className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
              <SlOptionsVertical />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
