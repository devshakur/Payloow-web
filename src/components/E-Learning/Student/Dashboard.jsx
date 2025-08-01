import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./Layout";
import CourseCard from "./CourseCard";
import LearningCard from "./LearningCard";
import axios from "axios";
import { endpoints } from "../../../api/Endpoint";
import toast from "react-hot-toast";
import { Loader } from "../../../AuthContext/Loader";

const StudentDashboard = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  const currentUser = localStorage.getItem('currentUser');
  const userData = currentUser ? JSON.parse(currentUser) : null

  const user = {
    name: userData?.firstName ?? 'Guest'
  };


  const [isLoading, setIsLoading] = useState(false)
  const [recommendedCourses, setRecommendedCourses] = useState([])
  const [courses, setCourses] = useState([])

  const getMyCourses = async () => {
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

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      setIsLoading(true)
      const response = await axios.get(endpoints.getAllStdCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecommendedCourses(response.data.courses)
    } catch (error) {
      toast.error('An error occured while fetching user data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllCourses();
    getMyCourses()
  }, []);


  if (isLoading) return <div><Loader /></div>;

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
          <p className="font-normal text-xl"> Let's keep learning</p>
         <div className="md:px-0 px-5 flex flex-wrap w-full">
         
              {courses.map((course) => (
                <div key={course.id} className="pr-5 max-w-sm w-full">
                  <LearningCard key={course.id} {...course} />
                </div>
              ))}
        
          </div>
        </div>
         <div className="mt-10 space-y-5">
          <p className="font-normal text-xl">Recommended for you</p>
         <div className="md:px-0 px-5 flex flex-wrap w-full">
         
              {recommendedCourses.map((course) => (
                <div key={course.id} className="pr-5 max-w-sm w-full">
                  <LearningCard key={course.id} {...course} />
                </div>
              ))}
        
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentDashboard;
