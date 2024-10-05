import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    facebookHandle: "",
    twitterHandle: "",
    linkedInHandle: "",
    instagramHandle: "",
    qualifications: "",
    experience: "",
    achievements: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <section>
      <div className="bg-white w-full flex items-center justify-between py-5 md:px-10 px-5">
        <div className="w-full flex items-center justify-start">
          <img src="/images/logo.svg" alt="logo" className="h-14" />
        </div>
        <p className="w-full text-center">Step {step} of 3</p>
        <button
          onClick={() => {
            navigate("/e-learning/tutor/dashboard");
          }}
          className="w-full text-right flex items-center justify-end"
        >
          <span className="md:hidden">
            <CloseCircle />
          </span>
          <span className="md:block hidden">Exit</span>
        </button>
      </div>

      <div className="bg-white mt-20 mx-5 md:max-w-3xl md:mx-auto py-10 md:px-12 px-5 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="facebookHandle" className="form-label">
                  Facebook Handle
                </label>
                <input
                  type="text"
                  name="facebookHandle"
                  id="facebookHandle"
                  value={formData.facebookHandle}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Facebook Handle"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="twitterHandle" className="form-label">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  name="twitterHandle"
                  id="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Twitter Handle"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="linkedInHandle" className="form-label">
                  Linkedin Handle
                </label>
                <input
                  type="text"
                  name="linkedInHandle"
                  id="linkedInHandle"
                  value={formData.linkedInHandle}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Linkedin Handle"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="instagramHandle" className="form-label">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  name="instagramHandle"
                  id="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Instagram Handle"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="qualifications" className="form-label">
                  Qualifications
                </label>
                <div className="form-input">
                  <select
                    name="qualifications"
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full"
                    required
                  >
                    <option value={""}>Qualifications</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="experience" className="form-label">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Experience"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="achievements" className="form-label">
                  Achievements
                </label>
                <input
                  type="text"
                  name="achievements"
                  id="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Achievements"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="instagramHandle" className="form-label">
                  Upload Certificates
                </label>
                <div className="bg-primary/20 h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                  Drop files here to upload…
                </div>
              </div>
              <div className="flex items-center justify-between space-x-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm text-primary border border-primary"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="achievements" className="form-label">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-8">
                  {/* <input type="file" name="profilePicture" id="profilePicture" /> */}
                  <button className="md:py-4 px-10 py-3 rounded-lg md:text-base text-sm bg-primary text-white border border-primary">
                    Upload
                  </button>
                  <button className="md:py-4 px-10 py-3 rounded-lg md:text-base text-sm text-primary border border-primary">
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="about" className="form-label">
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Write a short about"
                  required
                />
              </div>
              <div className="flex items-center justify-between space-x-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm text-primary border border-primary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default CompleteProfile;
