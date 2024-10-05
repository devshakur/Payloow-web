import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./Layout";
import CourseCard from "./CourseCard";
import { LuBook } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { GiGraduateCap } from "react-icons/gi";

const StudentDashboard = () => {
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
          slidesToScroll: 3,
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
  const user = {
    name: "Mayowa Sunusi",
  };

  const courses = [
    {
      id: 1,
      image: "/images/course-card-image.png",
      courseTitle: "MTN AirtimeBeginner Guide to Backend Development",
      progress: "completed",
      tag: "Programming",
      enrolledStudents: 200,
    },
    {
      id: 2,
      image: "/images/course-card-image.png",
      courseTitle: "Advanced React Techniques",
      progress: "in progress",
      tag: "Web Development",
      enrolledStudents: 150,
    },
    {
      id: 3,
      image: "/images/course-card-image.png",
      courseTitle: "Introduction to Machine Learning",
      progress: "not started",
      tag: "Data Science",
      enrolledStudents: 300,
    },
    {
      id: 4,
      image: "/images/course-card-image.png",
      courseTitle: "UI/UX Design Fundamentals",
      progress: "completed",
      tag: "Design",
      enrolledStudents: 120,
    },
    {
      id: 5,
      image: "/images/course-card-image.png",
      courseTitle: "Digital Marketing Essentials",
      progress: "in progress",
      tag: "Marketing",
      enrolledStudents: 180,
    },
    {
      id: 6,
      image: "/images/course-card-image.png",
      courseTitle: "Cybersecurity Basics",
      progress: "not started",
      tag: "Security",
      enrolledStudents: 220,
    },
  ];
  return (
    <Layout>
      <section>
        <div>
          <h3 className="md:text-3xl text-3xl font-bold pb-3">
            Welcome Back,{" "}
            <span className="md:hidden">
              <br />
            </span>{" "}
            {user?.name}
          </h3>
          <p>This is your learning dashboard</p>
        </div>
        <div className="my-10 grid md:grid-cols-4 gap-8">
          <div className="md:p-4 p-8 bg-white rounded-lg shadow-md flex items-center justify-between">
            <div className="bg-[#F1F3F9] flex items-center justify-center text-xl w-14 h-14 rounded-full text-primary">
              <LuBook />
            </div>
            <div className="text-center">
              <h4 className="md:text-lg">Your Courses</h4>
              <p className="pt-3 text-3xl font-extrabold">6</p>
            </div>
            <SlOptionsVertical />
          </div>
          <div className="md:p-4 p-8 bg-white rounded-lg shadow-md flex items-center justify-between">
            <div className="bg-[#F1F3F9] flex items-center justify-center text-xl w-14 h-14 rounded-full text-primary">
              <GiGraduateCap />
            </div>
            <div className="text-center">
              <h4 className="md:text-lg">Students Enrolled</h4>
              <p className="pt-3 text-3xl font-extrabold">200</p>
            </div>
            <SlOptionsVertical />
          </div>
        </div>
        <div className="">
          <div className="slider-container md:px-0 px-5">
            <Slider {...settings}>
              {/* <div className="md:pr-5"></div> */}

              {courses.map((course) => (
                <div key={course.id} className="pr-5">
                  <CourseCard key={course.id} {...course} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentDashboard;
