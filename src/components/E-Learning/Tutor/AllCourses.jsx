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
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/tutor/course/${courseId}`);
  };

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data.data)
    } catch (error) {
      toast.error('An error occured while fetching user data')
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  if (!courses) return <div><Loader /></div>;

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
