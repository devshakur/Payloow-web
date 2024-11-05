import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "./Layout";
import CourseCard from "./CourseCard";
import { LuBook, LuPlus } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { GiGraduateCap } from "react-icons/gi";
import { CloseCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../api/Endpoint";
import toast from "react-hot-toast";

const TutorDashboard = () => {
  const router = useNavigate();
  const [courses, setCourses] = useState([])
  let [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  // function open() {
  //   setIsOpen(true);
  // }

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


  const handleCourseClick = (courseId) => {
    router(`/e-learning/tutor/course/${courseId}`);
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
      console.error(error)
      toast.error('An error occured while fetching tutor courses')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const goToRegistration = () => {
    router("/e-learning/tutor/complete-profile");
  };


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isTutorVerified = currentUser?.isTutorVerified;

  return (
    <Layout>
      <section>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="md:text-3xl text-3xl font-bold pb-3">
              Welcome Back,{" "}
              <span className="md:hidden">{currentUser ? currentUser.firstName : 'John Doe'}</span>
            </h3>
            <button
              onClick={() => {
                router("/e-learning/tutor/create-course");
              }}
              className="bg-primary text-white flex items-center space-x-3 md:py-3 py-5 md:px-10 px-5 rounded"
            >
              <span>
                <LuPlus />
              </span>
              <span className="md:block hidden">Create Course</span>
            </button>
          </div>
          <p>This is your learning dashboard</p>
        </div>
        <div className="my-10 grid md:grid-cols-4 gap-8">
          <div className="md:p-4 p-8 bg-white rounded-lg shadow-md flex items-center justify-between">
            <div className="bg-[#F1F3F9] flex items-center justify-center text-xl w-14 h-14 rounded-full text-primary">
              <LuBook />
            </div>
            <div className="text-center">
              <h4 className="md:text-lg">Your Courses</h4>
              <p className="pt-3 text-3xl font-extrabold">{courses?.length}</p>
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
                    <div key={course._id} className="pr-5 pb-5" onClick={() => handleCourseClick(course._id)}>
                      <CourseCard key={course._id} {...course} />
                    </div>
                  ))}
                </Slider>
              )
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {!isTutorVerified &&
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
                className="w-full max-w-2xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex items-center justify-end text-primary">
                  <button onClick={close}>
                    <CloseCircle />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold md:text-3xl text-xl mt-4">
                    Complete Your Tutor Profile
                  </h3>
                  <p className="mt-4">
                    You&apos;re almost ready to start teaching! Set up your profile now
                    to showcase your expertise, attract more students, and manage
                    your classes seamlessly. It only takes a few minutes!
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-end">
                  <div className="flex items-center space-x-6">
                    <Button
                      className="border border-primary px-7 py-3 rounded-md text-primary"
                      onClick={close}
                    >
                      Skip for now
                    </Button>

                    <Button
                      className="bg-primary border border-primary px-7 py-3 rounded-md text-white"
                      onClick={goToRegistration}
                    >
                      Set Up Now
                    </Button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      }
    </Layout>
  );
};

export default TutorDashboard;
