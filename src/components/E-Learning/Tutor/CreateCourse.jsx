import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { endpoints } from "../../../api/Endpoint";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useNavigate();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const goToCourses = () => {
    router("/e-learning/tutor/courses");
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const lessonVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    discount_price: "",
    course_thumbnail: "",
    sections: [
      {
        title: "",
        description: "",
        lessons: [],
        collapsed: false,
      },
    ],
    tags: [],
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

  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prevData) => ({
      ...prevData,
      tags,
    }));
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
        duration: 0,
        order: updatedSections[sectionIndex].lessons.length + 1,
        collapsed: false,
        uploadProgress: 0,
      });
      return { ...prevData, sections: updatedSections };
    });
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons = updatedSections[
        sectionIndex
      ].lessons.filter((_, index) => index !== lessonIndex);
      // Update order for remaining lessons
      updatedSections[sectionIndex].lessons.forEach((lesson, index) => {
        lesson.order = index + 1;
      });
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleCollapse = (sectionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].collapsed =
        !updatedSections[sectionIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleLessonCollapse = (sectionIndex, lessonIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons[lessonIndex].collapsed =
        !updatedSections[sectionIndex].lessons[lessonIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileChange = async (event, sectionIndex, lessonIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      const response = await axios.post(endpoints.uploadCourseVideo, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setFormData((prevData) => {
            const updatedSections = [...prevData.sections];
            updatedSections[sectionIndex].lessons[lessonIndex].uploadProgress =
              percentCompleted;
            return { ...prevData, sections: updatedSections };
          });
        },
      });
      toast.success("Video uploaded successfully");
      setFormData((prevData) => {
        const updatedSections = [...prevData.sections];
        updatedSections[sectionIndex].lessons[lessonIndex].videoUrl =
          response.data.data;
        return { ...prevData, sections: updatedSections };
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video");
    }
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      setIsUploading(true)
      const response = await axios.post(
        endpoints.uploadCourseThumbnail,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Thumbnail uploaded successfully");
      console.log(response)
      setFormData((prevData) => ({
        ...prevData,
        course_thumbnail: response.data.data,
      }));
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      toast.error("Failed to upload thumbnail");
    } finally {
      setIsUploading(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      price: formData.price,
      discount_price: formData.discount_price,
      category: formData.category,
      course_thumbnail: formData.course_thumbnail,
      sections: formData.sections.map((section) => ({
        title: section.title,
        description: section.description,
        lessons: section.lessons.map((lesson) => ({
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: parseInt(lesson.duration),
          order: lesson.order,
        })),
      })),
      tags: formData.tags,
    };
    console.log("Form Submitted: ", payload);
    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        endpoints.createCourseContent,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        setIsOpen(true);
      } else {
        toast.error("Failed to create course. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
                  <label htmlFor="title" className="form-label">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
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
                  <textarea
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
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Category"
                    required
                  />
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
                  <label htmlFor="discount_price" className="form-label">
                    Discount Price
                  </label>
                  <input
                    type="text"
                    name="discount_price"
                    id="discount_price"
                    value={formData.discount_price}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Discount Price"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="course_thumbnail" className="form-label">
                    Course Thumbnail
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="course_thumbnail"
                      id="course_thumbnail"
                      value={formData.course_thumbnail}
                      onChange={handleChange}
                      className="form-input flex-grow"
                      placeholder="Thumbnail URL"
                      required
                      disabled
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="thumbnailInput"
                      onChange={handleThumbnailUpload}
                    />
                    <label
                      htmlFor="thumbnailInput"
                      className={`cursor-pointer bg-primary text-white px-5 py-4 rounded-lg ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isUploading ? <div className="loader"></div> : "Upload"}
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tags" className="form-label">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleTagChange}
                    className="form-input"
                    placeholder="e.g. programming, coding, development"
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
                            <label
                              htmlFor={`section-${sectionIndex}-title`}
                              className="form-label"
                            >
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
                            <label
                              htmlFor={`section-${sectionIndex}-description`}
                              className="form-label"
                            >
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
                                  onClick={() =>
                                    toggleLessonCollapse(
                                      sectionIndex,
                                      lessonIndex
                                    )
                                  }
                                >
                                  <IoIosArrowDown />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeLesson(sectionIndex, lessonIndex)
                                  }
                                  className="text-red-500"
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </div>

                            {!lesson.collapsed && (
                              <div className="mt-10 space-y-8">
                                <div className="flex flex-col space-y-2">
                                  <label
                                    htmlFor={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                    className="form-label"
                                  >
                                    Title
                                  </label>
                                  <input
                                    name="title"
                                    id={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                    value={lesson.title}
                                    onChange={(e) =>
                                      handleChange(e, sectionIndex, lessonIndex)
                                    }
                                    className="form-input"
                                    placeholder="Lesson title"
                                    required
                                  />
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <label
                                    htmlFor={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                    className="form-label"
                                  >
                                    Video URL
                                  </label>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      name="videoUrl"
                                      id={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                      value={lesson.videoUrl}
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          sectionIndex,
                                          lessonIndex
                                        )
                                      }
                                      className="form-input flex-grow text-sm"
                                      placeholder="Video URL"
                                      required
                                      disabled
                                    />
                                    <input
                                      type="file"
                                      accept="video/*"
                                      style={{ display: "none" }}
                                      id={`fileInput-${sectionIndex}-${lessonIndex}`}
                                      onChange={(e) =>
                                        handleFileChange(
                                          e,
                                          sectionIndex,
                                          lessonIndex
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={`fileInput-${sectionIndex}-${lessonIndex}`}
                                      className="cursor-pointer bg-primary text-white px-5 py-4 rounded-lg"
                                    >
                                      Upload
                                    </label>
                                  </div>
                                  {lesson.uploadProgress > 0 &&
                                    lesson.uploadProgress < 100 && (
                                      <>
                                        <div className="relative w-full bg-white rounded-full h-3 flex items-center justify-center mt-5">
                                          <p className="text-[8px] z-10">
                                            Uploading {lesson.uploadProgress}%
                                          </p>
                                          <div
                                            className="absolute h-3 rounded-full bg-primary/70 left-0 top-0"
                                            style={{
                                              width: `${lesson.uploadProgress}%`,
                                            }}
                                          ></div>
                                        </div>
                                      </>
                                    )}
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-5 gap-8">
                                  <div className="flex flex-col space-y-2">
                                    <label
                                      htmlFor={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                      className="form-label"
                                    >
                                      Duration
                                    </label>
                                    <input
                                      name="duration"
                                      id={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                      value={lesson.duration}
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          sectionIndex,
                                          lessonIndex
                                        )
                                      }
                                      className="form-input"
                                      placeholder="Duration"
                                      required
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-2">
                                    <label
                                      htmlFor={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                      className="form-label"
                                    >
                                      Order
                                    </label>
                                    <input
                                      name="order"
                                      id={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                      value={lesson.order}
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          sectionIndex,
                                          lessonIndex
                                        )
                                      }
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
                    disabled={isSubmitting}
                    className={`w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {isSubmitting ? <div className="loader"></div> : "Submit"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Modal */}

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
              className="w-full max-w-2xl rounded-xl bg-white py-20 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex items-center justify-end text-primary"></div>
              <div className="text-center">
                <img
                  src="/images/success-svg.svg"
                  alt="success"
                  className="mx-auto py-5"
                />
                <h3 className="md:text-3xl text-xl mt-4 md:px-20 px-3">
                  Congratulations! Your course,{" "}
                  <span className="font-semibold">"{formData.title}"</span> is
                  now live!
                </h3>
              </div>
              <div className="mt-10 flex items-center justify-end">
                <Button
                  className="bg-primary border border-primary py-3 rounded-md text-white w-full md:mx-20 mx-5"
                  onClick={goToCourses}
                >
                  Go To Course
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateCourse;
