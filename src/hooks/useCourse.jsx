import { useState, useEffect } from 'react'
import axios from 'axios'
import { endpoints } from '../api/Endpoint'

export const useCourse = (courseId) => {
  const [course, setCourse] = useState({})
  const [tutor, setTutor] = useState({})
  const [courseQuiz, setCourseQuiz] = useState([])
  const [courseMessages, setCourseMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [announcements, setAnnouncements] = useState({})

  const token = JSON.parse(localStorage.getItem('auth') || '{}').auth

  const getCourseById = async (courseId) => {
    try {
      const response = await axios.get(endpoints.getCourseById(courseId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCourse(response.data.data)
      await getTutorProfileById(response.data.data.tutor_id)
    } catch (error) {
      console.error("Error fetching course:", error)
    }
  }

  const getCourseAnnouncements = async (courseId) => {
    try {
      const response = await axios.get(endpoints.getCourseAnnouncements(courseId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Announcements:", response.data.data)
      setAnnouncements(response.data.data)
    } catch (error) {
      console.error("Error fetching course:", error)
    }
  }



  const getTutorProfileById = async (id) => {
    try {
      const response = await axios.get(endpoints.getTutorProfileById(id), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTutor(response.data.data)
    } catch (error) {
      console.error("Error fetching tutor:", error)
    }
  }

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(endpoints.getCourseQuiz(courseId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCourseQuiz(response.data.data)
    } catch (error) {
      console.error("Error fetching quiz:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(endpoints.getMessages, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Filter messages for the specific course
      const filteredMessages = response.data.data.filter((message) => message.course_id === courseId)
      setCourseMessages(filteredMessages)
      console.log("Filtered messages for course:", filteredMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCourseReplies = async (messageId) => {
    try {
      const response = await axios.get(endpoints.getReplies(messageId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.data.replies || []
    } catch (error) {
      console.error("Error fetching replies:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchQuiz()
    getCourseById(courseId)
    getCourseAnnouncements(courseId)
    fetchMessages()
  }, [courseId])

  return { course, tutor, courseQuiz, courseMessages, loading, fetchCourseReplies, announcements }
}