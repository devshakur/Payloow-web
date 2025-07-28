import React, { useState, useEffect } from "react";
import useInvestment from "../../../../hooks/useInvetment";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BusinessStep2 = ({ stepThree, stepFour, formik }) => {
  const navigate = useNavigate();

  const businessStages = [
    { key: "Idea/Concept Stage", value: "idea" },
    { key: "Startup Stage", value: "startup" },
    { key: "Growth Stage", value: "growth" },
    { key: "Matured Stage", value: "mature" },
  ];

  const models = [
    "b2b",
    "b2b2b",
    "b2b2c",
    "b2b2g",
    "b2c",
    "c2c",
    "b2g",
    "non-profit",
  ];

  const industries = [
    "Agriculture",
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Real Estate",
    "Manufacturing",
    "Retail",
    "Logistics & Transportation",
    "Media & Entertainment",
    "Energy",
    "Hospitality",
    "Construction",
    "Telecommunications",
    "Non-Profit",
  ];

  const handleStageClick = (stage) => {
    formik.setFieldValue("businessStage", stage);
  };

  const isStageSelected = (stage) => {
    return formik.values.businessStage === stage;
  };

  const handleModelClick = (models) => {
    formik.setFieldValue("customerModel", models);
  };

  const isModelSelected = (models) => {
    return formik.values.customerModel === models;
  };

  return (
    <div>
      <header className="flex justify-between items-center mx-8 mt-8 border-b-4">
        <div className="flex shrink-0 items-center">
          <img
            alt="Paylow Logo"
            src="/images/logo.svg"
            className="h-14 w-auto"
          />
        </div>
        <div className="mt-2">
          <p
            onClick={() => navigate(-1)}
            className="font-poppins font-medium text-2xl text-blue-600 cursor-pointer"
          >
            Exit
          </p>
        </div>
      </header>
      <main className="w-[100vw] bg-blue-50">
        <div className="flex justify-center">
          <ul className="flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4">
            <li className="font-plus-jakarta text-[16px] lg:text-xl font-medium text-blue-600 cursor-pointer">
              Account Information
            </li>
            <li
              onClick={stepThree}
              className="font-plus-jakarta text-[16px] lg:text-xl cursor-pointer  font-medium"
            >
              Online
            </li>
            <li
              onClick={stepFour}
              className="font-plus-jakarta text-[16px] lg:text-xl cursor-pointer font-medium"
            >
              Business Details
            </li>
          </ul>
        </div>
        <section className="flex justify-center">
          <div className="bg-white w-full lg:max-w-[45rem] rounded-lg shadow-lg">
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <label
                htmlFor="businessName"
                className="mt-4  mx-6 font-medium font-plus-jakarta text-md"
              >
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                id="businessName"
                className="py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-1 px-2 focus:outline-none"
                placeholder="Business Name"
                onChange={formik.handleChange}
                value={formik.values.businessName}
              />
              {formik.touched.businessName && formik.errors.businessName ? (
                <div className="text-red-500">{formik.errors.businessName}</div>
              ) : null}

              <div className="flex flex-col mt-4">
                <label
                  htmlFor="foundingDate"
                  className=" mx-6 font-medium font-plus-jakarta text-md"
                >
                  Founding Date
                </label>
                <input
                  type="date"
                  name="foundingDate"
                  id="foundingDate"
                  className="py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-1 px-2 focus:outline-none"
                  placeholder="Founding Date"
                  onChange={formik.handleChange}
                  value={formik.values.foundingDate}
                />
                {formik.touched.foundingDate && formik.errors.foundingDate ? (
                  <div className="text-red-500">
                    {formik.errors.foundingDate}
                  </div>
                ) : null}
              </div>

              <label
                htmlFor="businessDescription"
                className="mt-4  mx-6 font-medium font-plus-jakarta text-md"
              >
                Description
              </label>
              <textarea
                className="py-1 mx-6 border-2 border-[#D0D5DD] rounded-md mb-4 px-2 focus:outline-none"
                id="businessDescription"
                name="businessDescription"
                onChange={formik.handleChange}
                value={formik.values.businessDescription}
              />
              {formik.touched.businessDescription &&
              formik.errors.businessDescription ? (
                <div className="text-red-500">
                  {formik.errors.businessDescription}
                </div>
              ) : null}

              {/* <div className="my-3 mx-5">
                <h4 className="mx-4 font-medium font-plus-jakarta text-md">Stage</h4>
                <div className="flex flex-col lg:flex-row gap-4 my-3">
                  {businessStages && businessStages.length > 0 ? (
                    businessStages.map((stage) => {
                      const selected = isStageSelected(stage);
                      return (
                        <div
                          key={stage}
                          className={`flex items-center cursor-pointer transition-colors duration-200 py-4 px-5 rounded-lg 
            ${selected ? "bg-blue-500 text-white" : "bg-[#F8F9FC] text-black"}`}
                          onClick={() => handleStageClick(stage)}
                        >
                          <div
                            className={`h-7 w-7 rounded-full border-2 ${
                              selected ? "border-none" : "border-none"
                            } flex justify-center items-center`}
                          >
                            <input
                              type="radio"
                              className="w-4 h-4 accent-white"
                              name="businessStage"
                              id={stage}
                              checked={selected}
                              readOnly
                            />
                          </div>
                          <span className="ml-2 capitalize font-medium">
                            {stage}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <>
                    </>
                  )}
                </div>

                {formik.touched.businessStage &&
                formik.errors.businessStage ? (
                  <div className="text-red-500">
                    {formik.errors.businessStage}
                  </div>
                ) : null}
              </div> */}
              <div className="my-3 mx-5">
                <h4 className="mx-4 font-medium font-plus-jakarta text-md">
                  Stage
                </h4>
                <div className="flex flex-col lg:flex-row gap-4 my-3">
                  {businessStages.length > 0 &&
                    businessStages.map((stage) => {
                      const selected = isStageSelected(stage.value);
                      return (
                        <div
                          key={stage.value}
                          className={`flex items-center cursor-pointer transition-colors duration-200 py-4 px-5 rounded-lg 
              ${
                selected ? "bg-blue-500 text-white" : "bg-[#F8F9FC] text-black"
              }`}
                          onClick={() => handleStageClick(stage.value)}
                        >
                          <div
                            className={`h-7 w-7 rounded-full border-2 flex justify-center items-center`}
                          >
                            <input
                              type="radio"
                              className="w-4 h-4 accent-white"
                              name="businessStage"
                              checked={selected}
                              readOnly
                            />
                          </div>
                          <span className="ml-2 capitalize font-medium">
                            {stage.key}
                          </span>
                        </div>
                      );
                    })}
                </div>

                {formik.touched.businessStage &&
                  formik.errors.businessStage && (
                    <div className="text-red-500">
                      {formik.errors.businessStage}
                    </div>
                  )}
              </div>

              <h4 className=" mx-4 font-medium font-plus-jakarta text-md">
                Customer Model
              </h4>
              <div className="mx-5 flex flex-col lg:flex-row gap-4 flex-wrap">
                {models && models.length > 0 ? (
                  models.map((model) => (
                    <div
                      key={model}
                      className={`flex bg-[#F8F9FC] py-4 px-2 rounded-md ${
                        isModelSelected(model) ? "bg-blue-500 rounded-lg" : ""
                      }`}
                      onClick={() => handleModelClick(model)}
                    >
                      <div className="h-7 w-7 rounded-full border-1 px-3 flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-[50%]"
                          name="customerModel"
                          id={model}
                          checked={isModelSelected(model)}
                          readOnly
                        />
                      </div>
                      <label
                        htmlFor={model}
                        className="text-[#1D2433] font-poppins font-medium text-lg mx-3"
                      >
                        {model.toUpperCase()}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-poppins text-green-500 font-bold">
                    Loading Business Models
                  </p>
                )}
              </div>
              {formik.touched.customerModel && formik.errors.customerModel ? (
                <div className="text-red-500">
                  {formik.errors.customerModel}
                </div>
              ) : null}

              <div className="relative inline-block w-full mt-5">
                <label
                  htmlFor="industry"
                  className="mt-4 mx-6 font-medium font-plus-jakarta text-md"
                >
                  Industries
                </label>
                {/* <select
                  id="industry"
                  name="industry"
                  className="block appearance-none w-[90%] lg:w-[95%] mb-8 bg-white rounded-lg py-4 mx-6 px-4 pr-8 border-2 border-[#D0D5DD] text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                   onChange={(e) => formik.setFieldValue('industry', [e.target.value])} // 👈 wrap in array
  value={formik.values.industry[0] || ""} 
                >
                  {industries && industries.length > 0 ? (
                    industries.map((industry, index) => (
                      <option
                        key={index}
                        value={industry}
                        className="text-xl text-green-500"
                      >
                        {industry}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading industries...</option>
                  )}
                </select> */}
                <div className="my-4 mx-5">
                  <h4 className="mx-6 font-medium font-plus-jakarta text-md">
                    Select Industries (Choose at least 3)
                  </h4>

                  <select
                    id="industry"
                    name="industry"
                    multiple
                    className="block w-[90%] lg:w-[95%] h-48 bg-white rounded-lg py-3 px-4 mx-6 mb-4 border-2 border-[#D0D5DD] text-gray-800 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 scrollbar-thin scrollbar-thumb-blue-300"
                    onChange={(e) => {
                      const selectedOptions = Array.from(
                        e.target.selectedOptions
                      ).map((option) => option.value);
                      formik.setFieldValue("industry", selectedOptions);
                    }}
                    value={formik.values.industry}
                  >
                    {industries && industries.length > 0 ? (
                      industries.map((industry, index) => (
                        <option
                          key={index}
                          value={industry}
                          className="py-2 px-3 hover:bg-blue-50 cursor-pointer"
                        >
                          {industry}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading industries...</option>
                    )}
                  </select>

                  {/* ✅ Show selected industries as tags */}
                  <div className="mx-6 mt-2">
                    {formik.values.industry &&
                    formik.values.industry.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {formik.values.industry.map((ind, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm italic">
                        No industries selected.
                      </p>
                    )}
                  </div>

                  {/* ✅ Validation error */}
                  {formik.touched.industry && formik.errors.industry ? (
                    <div className="text-red-500 mx-6 mt-1 text-sm">
                      {formik.errors.industry}
                    </div>
                  ) : null}
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.664l3.71-3.453a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 010-1.08z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={stepThree}
                  className="w-[40%] py-2 mx-8 mb-5 bg-blue-600 text-white rounded-lg"
                >
                  NEXT
                </button>
              </div>
            </form>
            <Toaster />
          </div>
        </section>
      </main>
    </div>
  );
};

export default BusinessStep2;
