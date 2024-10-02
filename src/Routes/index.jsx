import React, {  Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "../AuthContext/Loader.jsx";
import App from "../components/App.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
const Regsiter = React.lazy(()=> import('../components/AuthenticationPage/Auth-section/Register.jsx'))
const Login = React.lazy(()=> import('../components/AuthenticationPage/Auth-section/Login.jsx'))
const ForgotPswd = React.lazy(()=>import('../components/AuthenticationPage/password-issues/ForgotPswd.jsx'))
const Verification = React.lazy(()=>import('../components/AuthenticationPage/password-issues/Verification.jsx'))
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
      path: "/Verification",
      element: 
      <Suspense fallback={<Loader />}>
        <Verification />
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
  ]);