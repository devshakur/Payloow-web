import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "../../../Routes/router";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/fira-sans";
import "../auth.css";
import RegisterOne from "./RegisterOne";
import RegisterTwo from "./RegisterTwo";
import useAuth from "../../../hooks/useAuth";

function Register() {
  const { RegisterUser } = useAuth();

  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    address: "",
    role: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextPage = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: formInput,
    validationSchema: Yup.object({
      firstName: Yup.string("field must be a text").required("required***"),
      lastName: Yup.string().required("required***"),
      password: Yup.string()
        .required("required***")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits")
        .required("required***"),
      email: Yup.string()
        .email("Invalid email address")
        .required("required***"),
      country: Yup.string().required("required*"),
      state: Yup.string().required("required***"),
      address: Yup.string().required("required***"),
      role: Yup.string().required("required***"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { ...payload } = values;
        let resp;
        resp = await RegisterUser(payload);
        if (resp) {
          toast.success("Registration done! Login to access your dashboard.");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error?.response.data.message);
          } else {
            toast.error("An unexpected error occurred: " + error.message);
          }
        } else if (error.request) {
          toast.error("Network error. Check your internet connection.");
        } else {
          toast.error(
            "Error: " + "An unexpected error occurred please try again"
          );
        }
      }
      setSubmitting(false);
    },
  });
  return (
    <main className="bg h-screen w-screen overflow-y-auto">
      <div className="vector">
        <div className="flex justify-center  p-5 items-center">
          <span>
            <img src="images/pay.png" alt="" />
          </span>
          <span className="relative right-8">
            <img src="images/curve.png" className="h-9" alt="curve" />
          </span>
          <span>
            <img
              src="images/angle.png"
              className="h-5 relative right-10 -top-8"
              alt="arrow"
            />
          </span>
          <span className="font-sans font-bold text-[32px] text-[#3369F4] mt-3 relative right-12">
            ayloow
          </span>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {currentIndex === 0 ? (
            <RegisterOne formik={formik} handleNextPage={handleNextPage} />
          ) : (
            <RegisterTwo formik={formik} />
          )}
        </form>
        <Toaster />
      </div>
    </main>
  );
}

export default Register;
