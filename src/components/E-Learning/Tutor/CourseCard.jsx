import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

const CourseCard = ({
  image,
  category,
  title,
  discount_price,
  price,
  students_enrolled,
}) => {


  return (
    <div className="bg-white shadow-lg rounded-lg cursor-pointer">
      <img src={image ? image : '/images/course-card-image.png'} alt={title} />
      <div className="p-5 h-44">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1">{category}</p>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <img src="/images/students-icon.svg" alt="" className="w-10" />
            <p>{students_enrolled} enrolled</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold pb-5">{title}</h3>
          <div className="flex items-center justify-between">
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
    </div>
  );
};

export default CourseCard;
