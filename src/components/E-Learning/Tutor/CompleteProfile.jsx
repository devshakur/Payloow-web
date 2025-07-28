import { CloseCircle } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../api/Endpoint";
import toast, { Toaster } from "react-hot-toast";
import { BsCameraFill } from "react-icons/bs";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tutorName: "",
    tutorEmail: "",
    tutorPhone: "",
    tutorFacebook: "",
    tutorTwitter: "",
    tutorLinkedin: "",
    tutorInstagram: "",
    tutorQualification: "",
    tutorExperience: "",
    tutorAchievements: "",
    tutorAbout: "",
    tutorImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      const response = await axios.post(endpoints.addTutorImage, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
    

      if (response.status === 200) {
        toast.success("Image uploaded successfully");
        await getUser();
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0); // Reset progress after upload
    }
  };

  const getUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      const response = await axios.get(endpoints.getCurrentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      const currentUser = response.data.data;
      if (currentUser.profilePicture) {
        setFormData((prevState) => ({
          ...prevState,
          tutorImage: currentUser.profilePicture,
        }));
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    }
  };

  const handleRemove = () => {
    setFormData((prevState) => ({
      ...prevState,
      tutorImage: "",
    }));
    setSelectedFile(null);
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0); // Reset progress at the beginning

    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        endpoints.createTutorProfile,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            const percentage = Math.floor((current / total) * 100);
            setUploadProgress(percentage); // Update the upload progress
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/e-learning/tutor/dashboard");
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0); // Reset progress after submission
    }
  };

  return (
    <>
      <Toaster />
      <section>
        <div className="bg-white w-full flex items-center justify-between py-5 md:px-10 px-5">
          <div className="w-full flex items-center justify-start">
            <img src="/images/logo.svg" alt="logo" className="h-14" />
          </div>
          <p className="w-full text-center">Step {step} of 3</p>
          <button
            onClick={() => {
              navigate("/e-learning/register");
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
                  <label htmlFor="tutorName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="tutorName"
                    id="tutorName"
                    value={formData.tutorName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="tutorEmail"
                    name="tutorEmail"
                    id="tutorEmail"
                    value={formData.tutorEmail}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="tutorPhone"
                    id="tutorPhone"
                    value={formData.tutorPhone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorFacebook" className="form-label">
                    Facebook Handle
                  </label>
                  <input
                    type="text"
                    name="tutorFacebook"
                    id="tutorFacebook"
                    value={formData.tutorFacebook}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Facebook Handle"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorTwitter" className="form-label">
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    name="tutorTwitter"
                    id="tutorTwitter"
                    value={formData.tutorTwitter}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Twitter Handle"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorLinkedin" className="form-label">
                    Linkedin Handle
                  </label>
                  <input
                    type="text"
                    name="tutorLinkedin"
                    id="tutorLinkedin"
                    value={formData.tutorLinkedin}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Linkedin Handle"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorInstagram" className="form-label">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    name="tutorInstagram"
                    id="tutorInstagram"
                    value={formData.tutorInstagram}
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
                  <label htmlFor="tutorQualification" className="form-label">
                    Qualification
                  </label>
                  <div className="form-input">
                    <select
                      name="tutorQualification"
                      id="tutorQualification"
                      value={formData.tutorQualification}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                      required
                    >
                      <option value={""}>Qualification</option>
                      <option value={"Bachelors"}>Bachelors</option>
                      <option value={"Masters"}>Masters</option>
                      <option value={"PhD"}>PhD</option>
                      <option value={"Diploma"}>Diploma</option>
                      <option value={"Certificate"}>Certificate</option>
                      <option value={"Associate Degree"}>
                        Associate Degree
                      </option>
                      <option value={"Professional License"}>
                        Professional License
                      </option>
                      <option value={"Teaching Credential"}>
                        Teaching Credential
                      </option>
                      <option value={"Industry Certification"}>
                        Industry Certification
                      </option>
                      <option value={"Postgraduate"}>Postgraduate</option>
                      <option value={"Training Course"}>Training Course</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorExperience" className="form-label">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="tutorExperience"
                    id="tutorExperience"
                    value={formData.tutorExperience}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Experience"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorAchievements" className="form-label">
                    Achievements
                  </label>
                  <input
                    type="text"
                    name="tutorAchievements"
                    id="tutorAchievements"
                    value={formData.tutorAchievements}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Achievements"
                    required
                  />
                </div>
                {/* <div className="flex flex-col space-y-2">
                <label htmlFor="tutorInstagram" className="form-label">
                  Upload Certificates
                </label>
                <div className="bg-primary/20 h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                  Drop files here to upload…
                </div>
              </div> */}
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
                  <label htmlFor="tutorImage" className="form-label">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-8">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden">
                      <img
                        src={formData.tutorImage || "/images/user.png"}
                        alt="user image"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <label
                        htmlFor="fileInput"
                        className="absolute bottom-0 flex items-center justify-center w-full h-10 bg-black/50 cursor-pointer"
                      >
                        <BsCameraFill color="#ffffff" />
                      </label>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                    <button
                      onClick={handleUpload}
                      disabled={isUploading}
                      type="button"
                      className={`md:py-4 px-10 py-3 rounded-lg md:text-base text-sm bg-primary text-white border border-primary ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUploading
                        ? `Uploading... ${uploadProgress}%`
                        : "Upload"}
                    </button>
                    <button
                      onClick={handleRemove}
                      className="md:py-4 px-10 py-3 rounded-lg md:text-base text-sm text-primary border border-primary"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tutorAbout" className="form-label">
                    About
                  </label>
                  <textarea
                    cols="5"
                    rows="5"
                    name="tutorAbout"
                    id="tutorAbout"
                    value={formData.tutorAbout}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Write a short about"
                    required
                  ></textarea>
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
                    disabled={isSubmitting}
                    className={`w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting
                      ? `Submitting... ${uploadProgress}%`
                      : "Submit"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default CompleteProfile;
