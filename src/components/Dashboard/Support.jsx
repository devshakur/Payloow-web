
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import FAQ from "./Support/FAQ";
import ContactUs from "./Support/ContactUs";
import { CloseCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();


  return (
    <>
      <Toaster />
      <section>
        <div className="bg-white w-full flex items-center justify-between py-5 md:px-10 px-5">
          <div className="w-full flex items-center justify-start">
            <img src="/images/logo.svg" alt="logo" className="h-14" />
          </div>
          <p className="w-full text-center">Support</p>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="w-full text-right flex items-center justify-end"
          >
            <span className="md:hidden">
              <CloseCircle />
            </span>
            <span className="md:block hidden">Exit</span>
          </button>
        </div>
        <div className="md:px-20 px-5 md:py-10 py-5 space-y-10">
          <FAQ />
          <ContactUs />
        </div>
      </section>
    </>
  );
};

export default Support;
