import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "../AuthContext/Loader.jsx";
import App from "../components/App.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import DashboardHome from "../components/Dashboard/DashboardHome.jsx";
import TutorDashboard from "../components/E-Learning/Tutor/Dashboard.jsx";
import StudentDashboard from "../components/E-Learning/Student/Dashboard.jsx";
import CompleteProfile from "../components/E-Learning/Tutor/CompleteProfile.jsx";
import Courses from "../components/E-Learning/Tutor/Courses.jsx";
import CreateCourse from "../components/E-Learning/Tutor/CreateCourse.jsx";
import Settings from "../components/Dashboard/Settings.jsx";
import Messages from "../components/E-Learning/Tutor/Messages.jsx";
import CreateQuiz from "../components/E-Learning/Tutor/CreateQuiz.jsx";
import AllCourses from "../components/E-Learning/Tutor/AllCourses.jsx";
import CourseDetails from "../components/E-Learning/Tutor/CourseDetails.jsx";
import EditCourse from "../components/E-Learning/Tutor/AddSectionsToCourse.jsx";
import AirtimePurchase from "../components/Bills/Airtime/AirtimePurchase.jsx";
import DataPurchase from '../components/Bills/Data/Data.jsx'
import TvSub from "../components/Bills/TV/TvSub.jsx";
import Electricity from "../components/Bills/Electricity/Electricity.jsx";
// const Verification = React.lazy(() =>
//   import("../components/AuthenticationPage/password-issues/Verification.jsx")
// );
const Regsiter = React.lazy(() => import('../components/AuthenticationPage/Auth-section/Register.jsx'))
const Login = React.lazy(() => import('../components/AuthenticationPage/Auth-section/Login.jsx'))
const ForgotPswd = React.lazy(() => import('../components/AuthenticationPage/password-issues/ForgotPswd.jsx'))
const ResetPswd = React.lazy(() => import('../components/AuthenticationPage/password-issues/ResetPswd.jsx'))
const Success = React.lazy(() => import("../components/AuthenticationPage/password-issues/SuccessPage.jsx"))


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Regsiter />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<Loader />}>
        <ForgotPswd />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/Verification",
  //   element: (
  //     <Suspense fallback={<Loader />}>
  //       <Verification />
  //     </Suspense>
  //   ),
  //   errorElement: <ErrorPage />,
  // },

  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<Loader />}>
        <ResetPswd />
      </Suspense>),
    errorElement: <ErrorPage />,
  },
  {
    path: "/success",
    element: (
      <Suspense fallback={<Loader />}>
        <Success />
      </Suspense>)
    ,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <DashboardHome />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/airtime",
    element: (
      <Suspense fallback={<Loader />}>
        <AirtimePurchase />
      </Suspense>),
    errorElement: <ErrorPage />,
  },
  {
    path: "/data",
    element: (
      <Suspense fallback={<Loader />}>
        <DataPurchase />
      </Suspense>),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tv-sub",
    element: (
      <Suspense fallback={<Loader />}>
        <TvSub />
      </Suspense>),
    errorElement: <ErrorPage />,
  },
  {
    path: "/electricity",
    element: (
      <Suspense fallback={<Loader />}>
        <Electricity />
      </Suspense>),
    errorElement: <ErrorPage />,
  },

  {
    path: "/settings",
    element: (
      <Suspense fallback={<Loader />}>
        <Settings />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },

  // E leanring routes
  // Tutor Routes
  {
    path: "/e-learning/tutor/dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <TutorDashboard />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/complete-profile",
    element: (
      <Suspense fallback={<Loader />}>
        <CompleteProfile />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/courses",
    element: (
      <Suspense fallback={<Loader />}>
        <Courses />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/all-courses",
    element: (
      <Suspense fallback={<Loader />}>
        <AllCourses />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/course/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <CourseDetails />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/create-course",
    element: (
      <Suspense fallback={<Loader />}>
        <CreateCourse />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/messages",
    element: (
      <Suspense fallback={<Loader />}>
        <Messages />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/create-quiz",
    element: (
      <Suspense fallback={<Loader />}>
        <CreateQuiz />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/e-learning/tutor/course/edit-course/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <EditCourse />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },

  // Student Routes
  {
    path: "/e-learning/student/dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <StudentDashboard />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);
