import { CloseCircle } from "iconsax-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { BsCopy } from "react-icons/bs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { endpoints } from "../../../api/Endpoint";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoLink, setVideoLink] = useState('');
  const inputRef = useRef(null);

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const lessonVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const [formData, setFormData] = useState({
    courseTitle: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    priceDiscount: "",
    courseVideo: "",
    courseThumbnail: "",
    sections: [
      {
        title: "",
        description: "",
        lessons: [],
        collapsed: false,
      },
    ],
  });

  const handleChange = (e, sectionIndex = null, lessonIndex = null) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (sectionIndex === null) {
        return { ...prevData, [name]: value };
      }

      const updatedSections = [...prevData.sections];

      if (lessonIndex === null) {
        updatedSections[sectionIndex][name] = value;
      } else {
        updatedSections[sectionIndex].lessons[lessonIndex][name] = value;
      }

      return { ...prevData, sections: updatedSections };
    });
  };

  const addSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [
        ...prevData.sections,
        {
          title: "",
          description: "",
          lessons: [],
          collapsed: false,
        },
      ],
    }));
  };

  const removeSection = (sectionIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      sections: prevData.sections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const addLesson = (sectionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons.push({
        title: "",
        videoUrl: "",
        duration: "",
        order: "",
        collapsed: false,
      });
      return { ...prevData, sections: updatedSections };
    });
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons = updatedSections[sectionIndex].lessons.filter(
        (_, index) => index !== lessonIndex
      );
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleCollapse = (sectionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].collapsed = !updatedSections[sectionIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleLessonCollapse = (sectionIndex, lessonIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons[lessonIndex].collapsed = !updatedSections[sectionIndex].lessons[lessonIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('video', file);

    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.post(endpoints.uploadCourseVideo, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      toast.success('Video uploaded successfully');
      setVideoLink(response.data.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value).then(() => {
        toast.success('Copied to clipboard');
      }).catch(err => {
        toast.error('Failed to copy');
      });
      setUploadProgress(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <>
      <Toaster />
      <section className="relative">
        <div className="bg-white w-full flex items-center justify-between py-5 md:px-10 px-5">
          <div className="w-full flex items-center justify-start">
            <img src="/images/logo.svg" alt="logo" className="h-14" />
          </div>
          <p className="w-full text-center">Step {step} of 3</p>
          <button
            type="button"
            onClick={() => {
              navigate("/e-learning/tutor/courses");
            }}
            className="w-full text-right flex items-center justify-end"
          >
            <span className="md:hidden">
              <CloseCircle />
            </span>
            <span className="md:block hidden">Exit</span>
          </button>
        </div>

        <div className="bg-white my-20 mx-2 md:max-w-3xl md:mx-auto md:py-10 py-3 md:px-12 px-3 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="courseTitle" className="form-label">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="courseTitle"
                    id="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Course Title"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Description"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <div className="form-input">
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                      required
                    >
                      <option value="">Category</option>
                      <option value="category1">Category1</option>
                      <option value="category2">Category2</option>
                      <option value="category3">Category3</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Duration"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="priceDiscount" className="form-label">
                    Price Discount
                  </label>
                  <input
                    type="text"
                    name="priceDiscount"
                    id="priceDiscount"
                    value={formData.priceDiscount}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Discount"
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
                {formData.sections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    className="border rounded-lg md:p-5 p-3 mt-5"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={sectionVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold">
                        Section {sectionIndex + 1}
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleCollapse(sectionIndex)}
                        >
                          <IoIosArrowDown />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(sectionIndex)}
                          className="text-red-500"
                        >
                          <MdClose />
                        </button>
                      </div>
                    </div>

                    {!section.collapsed && (
                      <>
                        <div className="mt-10 space-y-5">
                          <div className="flex flex-col space-y-2">
                            <label htmlFor={`section-${sectionIndex}-title`} className="form-label">
                              Title
                            </label>
                            <input
                              name="title"
                              id={`section-${sectionIndex}-title`}
                              value={section.title}
                              onChange={(e) => handleChange(e, sectionIndex)}
                              className="form-input"
                              placeholder="Section title"
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label htmlFor={`section-${sectionIndex}-description`} className="form-label">
                              Description
                            </label>
                            <textarea
                              name="description"
                              id={`section-${sectionIndex}-description`}
                              cols="5"
                              rows="5"
                              className="form-input"
                              placeholder="Section Description"
                              value={section.description}
                              onChange={(e) => handleChange(e, sectionIndex)}
                              required
                            ></textarea>
                          </div>
                        </div>
                        {section.lessons.map((lesson, lessonIndex) => (
                          <motion.div
                            key={lessonIndex}
                            className="border rounded-lg md:p-5 p-3 mt-5"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={lessonVariants}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg">
                                Lesson {lessonIndex + 1}
                              </h4>
                              <div className="flex space-x-2">
                                <button
                                  type="button"
                                  onClick={() => toggleLessonCollapse(sectionIndex, lessonIndex)}
                                >
                                  <IoIosArrowDown />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeLesson(sectionIndex, lessonIndex)}
                                  className="text-red-500"
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </div>

                            {!lesson.collapsed && (
                              <div className="mt-10 space-y-8">
                                <div className="flex flex-col space-y-2">
                                  <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-title`} className="form-label">
                                    Title
                                  </label>
                                  <input
                                    name="title"
                                    id={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                    value={lesson.title}
                                    onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                    className="form-input"
                                    placeholder="Lesson title"
                                    required
                                  />
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`} className="form-label">
                                    Video URL
                                  </label>
                                  <input
                                    name="videoUrl"
                                    id={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                    value={lesson.videoUrl}
                                    onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                    className="form-input"
                                    placeholder="Video URL"
                                    required
                                  />
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-5 gap-8">
                                  <div className="flex flex-col space-y-2">
                                    <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-duration`} className="form-label">
                                      Duration
                                    </label>
                                    <input
                                      name="duration"
                                      id={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                      value={lesson.duration}
                                      onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                      className="form-input"
                                      placeholder="Duration"
                                      required
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-2">
                                    <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-order`} className="form-label">
                                      Order
                                    </label>
                                    <input
                                      name="order"
                                      id={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                      value={lesson.order}
                                      onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                      className="form-input"
                                      placeholder="Order"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}

                        <div className="flex md:flex-row flex-col md:space-x-5 mt-5 md:space-y-0 space-y-3">
                          <button
                            type="button"
                            className="flex items-center justify-center space-x-3 bg-[#DBE7FE] border-2 border-[#DBE7FE] text-primary px-10 py-2 rounded-lg"
                            onClick={() => addLesson(sectionIndex)}
                          >
                            <GoPlus />
                            <span>Add Lesson</span>
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}

                <button
                  type="button"
                  className="flex items-center justify-center space-x-3 bg-white border-2 border-primary text-primary px-5 py-3 mt-5 rounded-lg md:w-auto w-full"
                  onClick={addSection}
                >
                  <GoPlus />
                  <span>Add Section</span>
                </button>
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
        <div className="fixed bottom-10 right-10 h-60 w-80 bg-primary/50 rounded-xl flex items-center justify-center">
          <div className="w-full">
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              id="fileInput"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="cursor-pointer flex items-center justify-center">
              <RiUploadCloud2Fill size={70} />
            </label>
            <h3 className="text-center text-sm">Upload Course video</h3>
            <div className="w-full mx-5 mt-3 flex items-center space-x-2">
              <input
                type="text"
                name="video-link"
                id="video-link"
                className="bg-white p-3 rounded outline-none w-[80%] text-sm"
                value={videoLink}
                disabled
                ref={inputRef}
              />
              <div onClick={handleCopy} className="cursor-pointer">
                <BsCopy className="shrink-0" />
              </div>
            </div>
            <p className="text-xs text-center px-10">Click to copy link and paste into the field for video link</p>
            <div className="relative w-[80%] bg-white rounded-full h-3 mx-5 flex items-center justify-center mt-5">
              <p className="text-[8px] z-10">Uploading {uploadProgress}%</p>
              <div
                className="absolute h-3 rounded-full bg-primary/70 left-0 top-0"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCourse;