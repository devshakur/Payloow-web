import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

const CourseCard = ({
  thumbnailUrl,
  category,
  title,
  discount_price,
  price,
  students_enrolled,
  details,
}) => {


  return (
    <div className="bg-white shadow-lg rounded-lg cursor-pointer mb-5">
      <img src={thumbnailUrl ? thumbnailUrl : '/images/course-img.png'} alt={title} className="h-40 w-full object-cover rounded-t-lg" />
      <div className="p-5 h-72 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1">{category}</p>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <img src="/images/students-icon.svg" alt="" className="w-10" />
            <p>{students_enrolled} enrolled</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold pb-5 h-1/6 place-items-start">{title}</h3>
        <p>{details}</p>
        <div className="flex items-center justify-between pt-3">
          <div className="flex font-bold text-2xl">
            {discount_price ? (
              <div className="">
                <span className="line-through mr-2 text-red-500 text-xl">${price}</span>
                <span>${discount_price}</span>
              </div>
            ) : (
              <div>${price}</div>
            )}
          </div>
          <SlOptionsVertical />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
