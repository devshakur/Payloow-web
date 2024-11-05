import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./Layout";
import CourseCard from "./CourseCard";
import { LuBook } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { GiGraduateCap } from "react-icons/gi";
import LearningCard from "./LearningCard";

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
      thumbnailUrl: "/images/course-card-image.png",
      title: "MTN AirtimeBeginner Guide to Backend Development",
      progress: "completed",
      tag: "Programming",
      enrolledStudents: 200,
      percentageCompleted: 100
    },
    {
      id: 2,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Advanced React Techniques",
      progress: "in progress",
      tag: "Web Development",
      enrolledStudents: 150,
      percentageCompleted: 70
    },
    {
      id: 3,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Introduction to Machine Learning",
      progress: "not started",
      tag: "Data Science",
      enrolledStudents: 300,
      percentageCompleted: 0
    },
    {
      id: 4,
      thumbnailUrl: "/images/course-card-image.png",
      title: "UI/UX Design Fundamentals",
      progress: "completed",
      tag: "Design",
      enrolledStudents: 120,
      percentageCompleted: 100
    },
    {
      id: 5,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Digital Marketing Essentials",
      progress: "in progress",
      tag: "Marketing",
      enrolledStudents: 180,
      percentageCompleted: 50
    },
    {
      id: 6,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Cybersecurity Basics",
      progress: "not started",
      tag: "Security",
      enrolledStudents: 220,
      percentageCompleted: 0
    },
  ];

  const recommendedCourses = [
    {
      id: 1,
      thumbnailUrl: "/images/course-card-image.png",
      title: "MTN AirtimeBeginner Guide to Backend Development",
      category: "Programming",
      enrolledStudents: 200,
      price: 50,
      discount_price: 40,
      details: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Advanced React Techniques",
      category: "Web Development",
      enrolledStudents: 150,
      price: 50,
      discount_price: 40,
      details: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 3,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Introduction to Machine Learning",
      category: "Data Science",
      enrolledStudents: 300,
      price: 50,
      discount_price: 40,
      details: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 4,
      thumbnailUrl: "/images/course-card-image.png",
      title: "UI/UX Design Fundamentals",
      category: "Design",
      enrolledStudents: 120,
      price: 50,
      discount_price: 40,
      details: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 5,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Digital Marketing Essentials",
      category: "Marketing",
      enrolledStudents: 180,
      price: 50,
      discount_price: 40,
      details: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 6,
      thumbnailUrl: "/images/course-card-image.png",
      title: "Cybersecurity Basics",
      category: "Security",
      enrolledStudents: 220,
      price: 50,
      discount_price: 40,
      details: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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

        <div className="mt-10 space-y-5">
          <p className="font-normal text-xl">Let's keep learning</p>
          <div className="slider-container md:px-0 px-5">
            <Slider {...settings}>
              {courses.map((course) => (
                <div key={course.id} className="pr-5">
                  <LearningCard key={course.id} {...course} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="mt-16 space-y-5">
          <p className="font-semibold text-2xl">Recommended For you</p>
          <div className="slider-container md:px-0 px-5">
            <Slider {...settings}>
              {recommendedCourses.map((course) => (
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
