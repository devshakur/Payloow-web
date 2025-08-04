import { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../api/Endpoint";

export const useCourse = (courseId) => {
  const [course, setCourse] = useState({});
  const [tutor, setTutor] = useState({});
  const [courseQuiz, setCourseQuiz] = useState([]);
  const [courseMessages, setCourseMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  const token = JSON.parse(localStorage.getItem("auth") || "{}").auth;

  const getMyCourses = async (courseId) => {
    try {
      const response = await axios.get(endpoints.getPurchasedCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allCourses = response.data.courses;
      const selectedCourse = allCourses.find((c) => c._id === courseId);

      if (selectedCourse) {
        setCourse(selectedCourse);
        // await getTutorProfileById(selectedCourse.tutor_id);
      } else {
        console.warn(`Course with ID ${courseId} not found`);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // const getTutorProfileById = async (id) => {
  //   try {
  //     const response = await axios.get(endpoints.getTutorProfileById(id), {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setTutor(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching tutor:", error);
  //   }
  // };

  const fetchQuiz = async (lessonId) => {
    try {
      const response = await axios.get(endpoints.getCourseQuiz(lessonId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response?.data?.quizzes;

      setCourseQuiz(result);

      return result; // ✅ Add this line
    } catch (error) {
      console.error("Error fetching quiz:", error);
      return null; // Optional: return null on error for safe handling
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(endpoints.getMessages, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter messages for the specific course
      const filteredMessages = response.data.data.filter(
        (message) => message.course_id === courseId
      );
      setCourseMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseReplies = async (messageId) => {
    try {
      const response = await axios.get(endpoints.getReplies(messageId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.replies || [];
    } catch (error) {
      console.error("Error fetching replies:", error);
      throw error;
    }
  };

  const getCourseAnnouncements = async (courseId) => {
    try {
      const response = await axios.get(endpoints.getAnnouncements(courseId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getMyCourses(courseId);
      await getCourseAnnouncements(courseId);
      //  await fetchMessages();
      setLoading(false); // ✅ ensure loading ends here
    };
    init();
  }, [courseId]);

  return {
    course,
    tutor,
    courseQuiz,
    courseMessages,
    loading,
    fetchCourseReplies,
    announcements,
    fetchQuiz,
    setCourseQuiz,
  };
};
