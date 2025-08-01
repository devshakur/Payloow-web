import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosReturnLeft, IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { endpoints } from "../../../api/Endpoint";
import Layout from "./Layout";
import { Loader } from "../../../AuthContext/Loader";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
const [modifiedSections, setModifiedSections] = useState({});
  const [originalCourseInfo, setOriginalCourseInfo] = useState(null);

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.courses);
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    if (courses) {
      const currentCourse = courses.find((c) => c._id === id);
      setCourse(currentCourse);
      if (currentCourse) {
        setOriginalCourseInfo({
          title: currentCourse.title,
          category: currentCourse.category,
          description: currentCourse.description,
          price: currentCourse.price,
          discount_price: currentCourse.discount_price,
          duration: currentCourse.duration,
          thumbnailUrl: currentCourse.thumbnailUrl,
        });
      }
    }
  }, [courses, id]);

  useEffect(() => {
    if (courses) {
      const currentCourse = courses?.find((c) => c._id === id);
      setCourse(currentCourse);
    }
  }, [courses, id]);

  // const handleChange = (e, sectionIndex = null, lessonIndex = null) => {
  //   const { name, value } = e.target;

  //   setCourse((prevCourse) => {
  //     const updatedCourse = { ...prevCourse };

  //     if (sectionIndex === null) {
  //       updatedCourse[name] = value;

  //       // Only check if name is one of the tracked fields
  //       if (
  //         originalCourseInfo &&
  //         Object.keys(originalCourseInfo).includes(name)
  //       ) {
  //         const isModified = Object.keys(originalCourseInfo).some((key) => {
  //           return updatedCourse[key] !== originalCourseInfo[key];
  //         });
  //         setIsEdited(isModified);
  //       }

  //       return updatedCourse;
  //     }

  //     // For section/lesson changes
  //     const updatedSections = [...prevCourse.sections];
  //     if (lessonIndex === null) {
  //       updatedSections[sectionIndex][name] = value;
  //     } else {
  //       updatedSections[sectionIndex].lessons[lessonIndex][name] = value;
  //     }
  //     updatedCourse.sections = updatedSections;
  //     return updatedCourse;
  //   });
  // };


  const handleChange = (e, sectionIndex = null, lessonIndex = null) => {
  const { name, value } = e.target;

  setCourse((prevCourse) => {
    const updatedCourse = { ...prevCourse };

    // If it's course-level input, keep existing logic
    if (sectionIndex === null) {
      updatedCourse[name] = value;

      if (
        originalCourseInfo &&
        Object.keys(originalCourseInfo).includes(name)
      ) {
        const isModified = Object.keys(originalCourseInfo).some((key) => {
          return updatedCourse[key] !== originalCourseInfo[key];
        });
        setIsEdited(isModified);
      }

      return updatedCourse;
    }

    // Section or lesson update
    const updatedSections = [...prevCourse.sections];
    if (lessonIndex === null) {
      updatedSections[sectionIndex][name] = value;
    } else {
      updatedSections[sectionIndex].lessons[lessonIndex][name] = value;
    }
    updatedCourse.sections = updatedSections;

    // Mark this section as edited
    setModifiedSections((prev) => ({
      ...prev,
      [sectionIndex]: true,
    }));

    return updatedCourse;
  });
};

  const handleFileChange = async (event, sectionIndex, lessonIndex) => {
    const file = event.target.files[0];
    if (!file || !course?._id) return;

    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.auth;

      // 1. Get signed URL from backend
      const res = await axios.post(
        endpoints.uploadCourseVideo,
        {
          fileName: file.name,
          fileType: file.type,
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { uploadUrl, publicUrl } = res.data;

      // 2. Upload video to GCS
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setCourse((prev) => {
            const updatedSections = [...prev.sections];
            updatedSections[sectionIndex].lessons[lessonIndex].uploadProgress =
              percent;
            return { ...prev, sections: updatedSections };
          });
        },
      });

      // 3. Save video URL to state
      toast.success("Video uploaded successfully");
      setCourse((prev) => {
        const updatedSections = [...prev.sections];
        updatedSections[sectionIndex].lessons[lessonIndex].videoUrl = publicUrl;
        updatedSections[sectionIndex].lessons[lessonIndex].uploadProgress = 100;
        return { ...prev, sections: updatedSections };
      });
    } catch (err) {
      console.error("Video upload failed", err);
      toast.error("Video upload failed");
    }
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      setIsUploading(true);
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
      setIsEdited(true);
      setCourse((prevData) => ({
        ...prevData,
        thumbnailUrl: response.data.data,
      }));
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      toast.error("Failed to upload thumbnail");
    } finally {
      setIsUploading(false);
    }
  };

  const addSection = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: [
        ...prevCourse.sections,
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
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: prevCourse.sections.filter(
        (_, index) => index !== sectionIndex
      ),
    }));
  };

  const addLesson = (sectionIndex) => {
    setCourse((prevCourse) => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].lessons.push({
        title: "",
        videoUrl: "",
        duration: 0,
        order: updatedSections[sectionIndex].lessons.length + 1,
        collapsed: false,
      });
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setCourse((prevCourse) => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].lessons = updatedSections[
        sectionIndex
      ].lessons.filter((_, index) => index !== lessonIndex);
      updatedSections[sectionIndex].lessons.forEach((lesson, index) => {
        lesson.order = index + 1;
      });
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const toggleSectionCollapse = (sectionIndex) => {
    setCourse((prevCourse) => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].collapsed =
        !updatedSections[sectionIndex].collapsed;
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const toggleLessonCollapse = (sectionIndex, lessonIndex) => {
    setCourse((prevCourse) => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].lessons[lessonIndex].collapsed =
        !updatedSections[sectionIndex].lessons[lessonIndex].collapsed;
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;

      for (const section of course.sections) {
        const payload = {
          courseId: course._id,
          title: section.title,
          description: section.description,
          lessons: section.lessons.map((lesson) => ({
            title: lesson.title,
            videoUrl: lesson.videoUrl,
            duration: parseInt(lesson.duration),
            order: lesson.order,
          })),
        };

        // Submit each section
        await axios.post(endpoints.editCourse, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      toast.success("Course sections updated successfully");
      navigate(`/e-learning/tutor/course/${course._id}`);
    } catch (error) {
      console.error("Failed to update course sections", error);
      toast.error("An error occurred while updating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

const handleUpdateCourseInfo = async () => {
  const token = JSON.parse(localStorage.getItem("auth")).auth;

  const formData = new FormData();
  formData.append("title", course.title);
  formData.append("description", course.description);
  formData.append("category", course.category);
  formData.append("price", course.price);
  formData.append("discount_price", course.discount_price);
  formData.append("duration", course.duration);
  formData.append("thumbnailUrl", course.thumbnailUrl);

  try {
    setIsSubmitting(true);
    const response = await axios.patch(
      endpoints.updateCourse(course._id), // ✅ FIXED
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Course updated successfully");
    setIsEdited(false);
  } catch (err) {
    console.error("Update failed", err);
    toast.error("Failed to update course");
  } finally {
    setIsSubmitting(false);
  }
};

const saveSection = async (sectionIndex) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.auth;
  const section = course.sections[sectionIndex];

  if (!token || !section?._id) {
    toast.error("Missing auth token or section ID");
    return;
  }

  const payload = {
    courseId: course._id,
    title: section.sectionTitle,        // assuming your UI uses sectionTitle
    description: section.description || "", // optional
    lessons: section.lessons?.map((lesson, i) => ({
      ...lesson,
      order: i + 1, // optional, ensure order is numeric and sequential
    })),
  };

  try {
    setIsSubmitting(true);

    const response = await axios.patch(
      endpoints.updateSection(section._id),
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.status === 200) {
      toast.success("Section updated successfully");
      setModifiedSections((prev) => {
        const updated = { ...prev };
        delete updated[sectionIndex];
        return updated;
      });
    } else {
      toast.error("Failed to update section");
    }
  } catch (err) {
    console.error("Section update failed:", err);
    toast.error("Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};




  

  if (!course) return <Loader />;

  return (
    <Layout>
      <Toaster />
      <div className="bg-white mx-auto md:px-20 md:py-10 rounded px-4 py-8">
        <button
          onClick={() => navigate(`/e-learning/tutor/course/${id}`)}
          className="flex items-center text-blue-600 mb-6"
        >
          <IoIosReturnLeft className="mr-2" />
          Back to Course
        </button>

        <h1 className="text-3xl font-bold mb-8">Edit Course: {course.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={course.category}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              rows="4"
              className="form-input"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={course.price}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label
                htmlFor="discount_price"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Price
              </label>
              <input
                type="number"
                id="discount_price"
                name="discount_price"
                value={course.discount_price}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration (hours)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Course Thumbnail
              </label>
              <div className="flex items-center space-x-5">
                <input
                  type="text"
                  name="course_thumbnail"
                  id="course_thumbnail"
                  value={course.thumbnailUrl}
                  onChange={handleChange}
                  className="form-input flex-grow"
                  placeholder="Thumbnail URL"
                  required
                  disabled
                />
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="thumbnail"
                  className={`cursor-pointer bg-primary text-white px-5 py-4 rounded-lg md:text-base text-sm ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? <div className="loader"></div> : "Upload"}
                </label>
              </div>
            </div>
          </div>
          {isEdited && (
            <div className="text-right">
              <button
                type="button"
                onClick={handleUpdateCourseInfo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Course Info"}
              </button>
            </div>
          )}

          {/* {section content} */}

          <div>
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            {course.sections.map((section, sectionIndex) => (
              <motion.div
                key={section._id || sectionIndex}
                className="border rounded-lg p-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">
                    Section {sectionIndex + 1}
                  </h3>
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleSectionCollapse(sectionIndex)}
                      className="mr-2"
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
                    <div className="my-5">
                      <label
                        htmlFor={`section-${sectionIndex}-title`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Section Title
                      </label>
                      <input
                        type="text"
                        id={`section-${sectionIndex}-title`}
                        name="title"
                        value={section.title}
                        onChange={(e) => handleChange(e, sectionIndex)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor={`section-${sectionIndex}-description`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Section Description
                      </label>
                      <textarea
                        id={`section-${sectionIndex}-description`}
                        name="description"
                        value={section.description}
                        onChange={(e) => handleChange(e, sectionIndex)}
                        rows="3"
                        className="form-input"
                        required
                      ></textarea>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Lessons</h4>
                    {section.lessons.map((lesson, lessonIndex) => (
                      <motion.div
                        key={lesson._id || lessonIndex}
                        className="border rounded p-3 mb-5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">
                            Lesson {lessonIndex + 1}
                          </h5>
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                toggleLessonCollapse(sectionIndex, lessonIndex)
                              }
                              className="mr-2"
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
                          <div className="space-y-5 mt-5">
                            <div className="mb-2">
                              <label
                                htmlFor={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                id={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                name="title"
                                value={lesson.title}
                                onChange={(e) =>
                                  handleChange(e, sectionIndex, lessonIndex)
                                }
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="mb-2">
                              <label
                                htmlFor={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Video URL
                              </label>
                              <div className="flex items-center space-x-5">
                                <input
                                  name="videoUrl"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                  value={lesson.videoUrl}
                                  onChange={(e) =>
                                    handleChange(e, sectionIndex, lessonIndex)
                                  }
                                  className="form-input flex-grow text-sm"
                                  placeholder="Video URL"
                                  required
                                  disabled
                                />
                                <input
                                  type="file"
                                  accept="video/*"
                                  id={`${sectionIndex}-${lessonIndex}-videoUrl`}
                                  name="lesson videoUrl"
                                  onChange={(e) =>
                                    handleFileChange(
                                      e,
                                      sectionIndex,
                                      lessonIndex
                                    )
                                  }
                                  className="form-input"
                                  style={{ display: "none" }}
                                />
                                <label
                                  htmlFor={`${sectionIndex}-${lessonIndex}-videoUrl`}
                                  className="cursor-pointer bg-primary text-white px-5 py-4 rounded-lg"
                                >
                                  Upload
                                </label>
                              </div>
                              {lesson.uploadProgress && (
                                <>
                                  <div className="relative w-full bg-gray-400 rounded-full h-3 flex items-center justify-center mt-5">
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
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label
                                  htmlFor={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Duration (minutes)
                                </label>
                                <input
                                  type="number"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                  name="duration"
                                  value={lesson.duration}
                                  onChange={(e) =>
                                    handleChange(e, sectionIndex, lessonIndex)
                                  }
                                  className="form-input"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Order
                                </label>
                                <input
                                  type="number"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                  name="order"
                                  value={lesson.order}
                                  onChange={(e) =>
                                    handleChange(e, sectionIndex, lessonIndex)
                                  }
                                  className="form-input"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLesson(sectionIndex)}
                      className="flex items-center justify-center space-x-3 bg-[#DBE7FE] border-2 border-[#DBE7FE] text-primary px-10 py-2 rounded-lg"
                    >
                      <GoPlus className="mr-2" />
                      Add Lesson
                    </button>
                    {modifiedSections[sectionIndex] && (
  <div className="mt-4 flex justify-end">
    <button
      type="button"
      onClick={() => saveSection(sectionIndex)}
      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
    >
      Save Section
    </button>
  </div>
)}

                  </>
                )}
              </motion.div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="flex items-center text-blue-600 mt-4"
            >
              <GoPlus className="mr-2" />
              Add Section
            </button>
          </div>

   

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white ${
                isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditCourse;
