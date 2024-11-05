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
import LearningCard from "./LearningCard";

const CourseList = () => {
  // const [courses, setCourses] = useState([])
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
          My Courses ({courses.length})
        </h3>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="" onClick={() => handleCourseClick(course._id)}>
              <LearningCard key={course.id} {...course} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CourseList;
