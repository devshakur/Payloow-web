import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

const CourseCard = ({
  thumbnailUrl,
  category,
  title,
  discount_price,
  price,
  students_enrolled,
}) => {


  return (
    <div className="bg-white shadow-lg rounded-lg cursor-pointer w-full">
    <img
      src={thumbnailUrl ? thumbnailUrl : '/images/course-img.png'}
      alt={title}
      className="h-40 w-full object-cover rounded-t-lg"
    />
    <div className="p-5 h-52 flex flex-col justify-start">
      <div className="flex items-center justify-between">
        <p className="bg-[#C0D5FD] text-sm px-2 rounded py-1">{category}</p>
        <div className="flex items-center space-x-1 text-xs">
          <img src="/images/students-icon.svg" alt="" className="w-10" />
          <p>{students_enrolled} enrolled</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <div className="flex items-center justify-between mt-auto pt-4">
        <div className="flex font-bold text-2xl">
          {discount_price ? (
            <>
              <span className="line-through mr-2 text-red-500 text-xl">${price}</span>
              <span>${discount_price}</span>
            </>
          ) : (
            <span>${price}</span>
          )}
        </div>
        <SlOptionsVertical />
      </div>
    </div>
  </div>
  );
};

export default CourseCard;
