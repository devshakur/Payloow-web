import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosReturnLeft, IoIosArrowDown } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { endpoints } from '../../../api/Endpoint';
import Layout from './Layout';
import { Loader } from '../../../AuthContext/Loader';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);

  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data.data);
    } catch (error) {
      toast.error('An error occurred while fetching user data');
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    if (courses) {
      const currentCourse = courses.find(c => c._id === id);
      setCourse(currentCourse);
    }
  }, [courses, id]);

  const handleChange = (e, sectionIndex = null, lessonIndex = null) => {
    const { name, value } = e.target;
    setCourse(prevCourse => {
      if (sectionIndex === null) {
        return { ...prevCourse, [name]: value };
      }

      const updatedSections = [...prevCourse.sections];
      if (lessonIndex === null) {
        updatedSections[sectionIndex][name] = value;
      } else {
        updatedSections[sectionIndex].lessons[lessonIndex][name] = value;
      }

      return { ...prevCourse, sections: updatedSections };
    });
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
          setCourse((prevData) => {
            const updatedSections = [...prevData.sections];
            updatedSections[sectionIndex].lessons[lessonIndex].uploadProgress =
              percentCompleted;
            return { ...prevData, sections: updatedSections };
          });
        },
      });
      toast.success("Video uploaded successfully");
      setCourse((prevData) => {
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
    setCourse(prevCourse => ({
      ...prevCourse,
      sections: [
        ...prevCourse.sections,
        {
          title: '',
          description: '',
          lessons: [],
          collapsed: false,
        },
      ],
    }));
  };

  const removeSection = (sectionIndex) => {
    setCourse(prevCourse => ({
      ...prevCourse,
      sections: prevCourse.sections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const addLesson = (sectionIndex) => {
    setCourse(prevCourse => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].lessons.push({
        title: '',
        videoUrl: '',
        duration: 0,
        order: updatedSections[sectionIndex].lessons.length + 1,
        collapsed: false,
      });
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setCourse(prevCourse => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].lessons = updatedSections[sectionIndex].lessons.filter(
        (_, index) => index !== lessonIndex
      );
      updatedSections[sectionIndex].lessons.forEach((lesson, index) => {
        lesson.order = index + 1;
      });
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const toggleSectionCollapse = (sectionIndex) => {
    setCourse(prevCourse => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].collapsed = !updatedSections[sectionIndex].collapsed;
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const toggleLessonCollapse = (sectionIndex, lessonIndex) => {
    setCourse(prevCourse => {
      const updatedSections = [...prevCourse.sections];
      updatedSections[sectionIndex].lessons[lessonIndex].collapsed = !updatedSections[sectionIndex].lessons[lessonIndex].collapsed;
      return { ...prevCourse, sections: updatedSections };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      courseId: course._id,
      sections: course.sections.map(section => ({
        sectionId: section._id,
        title: section.title,
        description: section.description,
        lessons: section.lessons.map(lesson => ({
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: parseInt(lesson.duration),
          order: lesson.order,
        })),
      })),
    };

    console.log(payload);
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.patch(endpoints.editCourse, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        toast.success('Course updated successfully');
        navigate(`/e-learning/tutor/course/${course._id}`);
      } else {
        toast.error('Failed to update course. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
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
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
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
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
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
              <label htmlFor="discount_price" className="block text-sm font-medium text-gray-700">Discount Price</label>
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
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (hours)</label>
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
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
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
                  className={`cursor-pointer bg-primary text-white px-5 py-4 rounded-lg md:text-base text-sm ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isUploading ? <div className="loader"></div> : "Upload"}
                </label>
              </div>
            </div>
          </div>

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
                  <h3 className="text-xl font-semibold">Section {sectionIndex + 1}</h3>
                  <div>
                    <button type="button" onClick={() => toggleSectionCollapse(sectionIndex)} className="mr-2">
                      <IoIosArrowDown />
                    </button>
                    <button type="button" onClick={() => removeSection(sectionIndex)} className="text-red-500">
                      <MdClose />
                    </button>
                  </div>
                </div>
                {!section.collapsed && (
                  <>
                    <div className="my-5">
                      <label htmlFor={`section-${sectionIndex}-title`} className="block text-sm font-medium text-gray-700">Section Title</label>
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
                      <label htmlFor={`section-${sectionIndex}-description`} className="block text-sm font-medium text-gray-700">Section Description</label>
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
                          <h5 className="font-medium">Lesson {lessonIndex + 1}</h5>
                          <div>
                            <button type="button" onClick={() => toggleLessonCollapse(sectionIndex, lessonIndex)} className="mr-2">
                              <IoIosArrowDown />
                            </button>
                            <button type="button" onClick={() => removeLesson(sectionIndex, lessonIndex)} className="text-red-500">
                              <MdClose />
                            </button>
                          </div>
                        </div>
                        {!lesson.collapsed && (
                          <div className='space-y-5 mt-5'>
                            <div className="mb-2">
                              <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-title`} className="block text-sm font-medium text-gray-700">Lesson Title</label>
                              <input
                                type="text"
                                id={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                name="title"
                                value={lesson.title}
                                onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="mb-2">
                              <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`} className="block text-sm font-medium text-gray-700">Video URL</label>
                              <div className="flex items-center space-x-5">
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
                                  id={`${sectionIndex}-${lessonIndex}-videoUrl`}
                                  name="lesson videoUrl"
                                  onChange={(e) => handleFileChange(e, sectionIndex, lessonIndex)}
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
                                <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-duration`} className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                                <input
                                  type="number"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                  name="duration"
                                  value={lesson.duration}
                                  onChange={((e) => handleChange(e, sectionIndex, lessonIndex))}
                                  className="form-input"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-order`} className="block text-sm font-medium text-gray-700">Order</label>
                                <input
                                  type="number"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                  name="order"
                                  value={lesson.order}
                                  onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
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
              className={`px-6 py-2 rounded-md text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditCourse;