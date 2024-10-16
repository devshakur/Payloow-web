import React, {  Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "../AuthContext/Loader.jsx";
import App from "../components/App.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import DashboardHome from "../components/Dashboard/DashboardHome.jsx";
import AirtimePurchase from "../components/Bills/Airtime/AirtimePurchase.jsx";
import DataPurchase from '../components/Bills/Data/Data.jsx'
import TvSub from "../components/Bills/TV/TvSub.jsx";
import Electricity from "../components/Bills/Electricity/Electricity.jsx";
const Regsiter = React.lazy(()=> import('../components/AuthenticationPage/Auth-section/Register.jsx'))
const Login = React.lazy(()=> import('../components/AuthenticationPage/Auth-section/Login.jsx'))
const ForgotPswd = React.lazy(()=>import('../components/AuthenticationPage/password-issues/ForgotPswd.jsx'))
const ResetPswd = React.lazy(()=>import('../components/AuthenticationPage/password-issues/ResetPswd.jsx'))
const Success = React.lazy(()=>import("../components/AuthenticationPage/password-issues/SuccessPage.jsx"))


export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/register",
      element: 
        <Suspense fallback={<Loader />}>
        <Regsiter />
        </Suspense>, 
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: 
        <Suspense fallback={<Loader />}>
        <Login />
        </Suspense>, 
      errorElement: <ErrorPage />,
    },
    {
      path: "/forgot-password",
      element: 
      <Suspense fallback={<Loader />}>
        <ForgotPswd />
      </Suspense>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/reset-password",
      element: 
      <Suspense fallback={<Loader />}>
        <ResetPswd />
      </Suspense>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/success",
      element: 
      <Suspense fallback={<Loader />}>
        <Success />
      </Suspense>,
      errorElement: <ErrorPage />,
    },
     {
    path: "/dashboard",
    element: 
      <Suspense fallback={<Loader />}>
        <DashboardHome />
      </Suspense>,
      errorElement: <ErrorPage />,
  },
  {
    path: "/airtime",
    element: 
      <Suspense fallback={<Loader />}>
        <AirtimePurchase />
      </Suspense>,
      errorElement: <ErrorPage />,
  },
  {
    path: "/data",
    element: 
      <Suspense fallback={<Loader />}>
        <DataPurchase />
      </Suspense>,
      errorElement: <ErrorPage />,
  },
  {
    path: "/tv-sub",
    element: 
      <Suspense fallback={<Loader />}>
        <TvSub />
      </Suspense>,
      errorElement: <ErrorPage />,
  },
  {
    path: "/electricity",
    element: 
      <Suspense fallback={<Loader />}>
        <Electricity />
      </Suspense>,
      errorElement: <ErrorPage />,
  },
  ]);