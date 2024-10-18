import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCard";
import { CloseCircle } from "iconsax-react";
import { endpoints } from "../../../api/Endpoint";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [isOpen, setIsOpen] = useState(false);

  const goToCourses = () => {
    navigate('/e-learning/tutor/all-courses');
  };

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/tutor/course/${courseId}`);
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data.data);
    } catch (error) {
      toast.error('An error occurred while fetching user data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="my-10">
      <div className="flex items-center justify-between mb-5">
        <h4 className="md:text-2xl text-xl">Course List</h4>
        <button className="text-primary" onClick={goToCourses}>
          See all
        </button>
      </div>
      <div className="">
        <div className="slider-container md:px-0 px-5 py-5">
          {isLoading ? (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-8">
              <div className="animate-pulse">
                <CourseCard title="Loading..." description="Please wait while the courses are loading." />
              </div>
            </div>
          ) : (
            courses.length < 3 ? (
              courses.length === 1 ? (
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-8">
                  <div onClick={() => handleCourseClick(courses[0]._id)}>
                    <CourseCard key={courses[0]._id} {...courses[0]} />
                  </div>
                </div>
              ) : (
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-8">
                  {courses.map((course) => (
                    <div key={course._id} onClick={() => handleCourseClick(course._id)}>
                      <CourseCard key={course._id} {...course} />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <Slider {...settings}>
                {courses.map((course) => (
                  <div key={course._id} className="pr-5 mb-5" onClick={() => handleCourseClick(course._id)}>
                    <CourseCard key={course._id} {...course} />
                  </div>
                ))}
              </Slider>
            )
          )}
        </div>
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-7xl h-[50rem] overflow-hidden overflow-y-auto rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex items-center justify-end text-primary">
                <button onClick={close}>
                  <CloseCircle />
                </button>
              </div>
              <div>
                <h3 className="font-semibold md:text-3xl text-xl my-5">
                  All Courses
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <div key={course.id} className="">
                      <CourseCard key={course.id} {...course} />
                    </div>
                  ))}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CourseList;