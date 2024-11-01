import React, { useEffect } from "react";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCard";
import { endpoints } from "../../../api/Endpoint";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../AuthContext/Loader";

const AllCourses = () => {
  // const [courses, setCourses] = useState([])
  const courses = [
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/student/course/${courseId}`);
  };

  // const getAllCourses = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('auth')).auth;
  //     setIsLoading(true)
  //     const response = await axios.get(endpoints.getAllCourses, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setCourses(response.data.data)
  //   } catch (error) {
  //     toast.error('An error occured while fetching user data')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getAllCourses();
  // }, []);

  if (isLoading) return <div><Loader /></div>;

  return (
    <Layout>
      <div className="my-10">
        <h3 className="font-semibold md:text-3xl text-xl my-5">
          All Courses ({courses.length})
        </h3>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="" onClick={() => handleCourseClick(course._id)}>
              <CourseCard key={course.id} {...course} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllCourses;
