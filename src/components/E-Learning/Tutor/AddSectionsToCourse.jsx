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
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);

  console.log('getting courses');
  const getAllCourses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      console.log(token);
      const response = await axios.get(endpoints.getAllCourses, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
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

    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.put(endpoints.editCourse, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        toast.success('Course updated successfully');
        navigate(`/course/${course._id}`);
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
      <div className="container mx-auto px-4 py-8">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={course.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
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
                transition={{ duration: 0.3 }}
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
                    <div className="mb-4">
                      <label htmlFor={`section-${sectionIndex}-title`} className="block text-sm font-medium text-gray-700">Section Title</label>
                      <input
                        type="text"
                        id={`section-${sectionIndex}-title`}
                        name="title"
                        value={section.title}
                        onChange={(e) => handleChange(e, sectionIndex)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      ></textarea>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Lessons</h4>
                    {section.lessons.map((lesson, lessonIndex) => (
                      <motion.div
                        key={lesson._id || lessonIndex}
                        className="border rounded p-3 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
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
                          <>
                            <div className="mb-2">
                              <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-title`} className="block text-sm font-medium text-gray-700">Lesson Title</label>
                              <input
                                type="text"
                                id={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                name="title"
                                value={lesson.title}
                                onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                              />
                            </div>
                            <div className="mb-2">
                              <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`} className="block text-sm font-medium text-gray-700">Video URL</label>
                              <input
                                type="text"
                                id={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                name="videoUrl"
                                value={lesson.videoUrl}
                                onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                              />
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
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  required
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLesson(sectionIndex)}
                      className="flex items-center text-blue-600 mt-2"
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