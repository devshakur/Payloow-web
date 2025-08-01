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
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const handleCourseClick = (courseId) => {
    navigate(`/e-learning/student/my-course/${courseId}`);
  };

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      setIsLoading(true)
      const response = await axios.get(endpoints.getPurchasedCourse, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data.courses)
    } catch (error) {
      toast.error('An error occured while fetching user data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  if (isLoading) return <div><Loader /></div>;

  return (
    <Layout>
      <div className="my-10">
        <h3 className="font-semibold md:text-3xl text-xl my-5">
          My Courses ({courses?.length})
        </h3>
        <TabGroup>
          <TabList className="flex mb-6">

            <Tab className="course-detail-card">
              Ongoing Courses
            </Tab>
            <Tab className="course-detail-card">
              Completed Courses
            </Tab>
          </TabList>
          <TabPanels className="mt-6">
            <TabPanel>
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-8">
                {courses.map((course) => (
                  <div key={course._id} className="" onClick={() => handleCourseClick(course._id)}>
                    <LearningCard key={course.id} {...course} />
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              No Completed Course
            </TabPanel>
          </TabPanels>
        </TabGroup>

      </div>
    </Layout>
  );
};

export default CourseList;
