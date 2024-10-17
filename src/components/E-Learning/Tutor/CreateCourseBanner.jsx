import React from "react";
import { useNavigate } from "react-router-dom";

const CreateCourseBanner = () => {
  const router = useNavigate();
  return (
    <div className="bg-[#DBE7FE] md:p-10 md:px-14 p-5 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="space-y-6 md:max-w-2xl">
          <h4 className="font-semibold md:text-4xl text-2xl">
            Start Building Your Course Today!
          </h4>
          <p>
            Whether you're a seasoned educator or new to teaching, you have the
            potential to create an impactful and engaging course.
          </p>
          <button
            onClick={() => {
              router("/e-learning/tutor/create-course");
            }}
            className="bg-primary text-white px-10 md:w-auto w-full py-3 rounded-lg"
          >
            Create Course
          </button>
        </div>
        <div>
          <img
            src="/images/banner-img.svg"
            alt=""
            className="md:block hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCourseBanner;
