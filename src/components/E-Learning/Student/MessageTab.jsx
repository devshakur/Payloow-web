'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCourse } from '../../../hooks/useCourse'
import axios from 'axios'
import { endpoints } from '../../../api/Endpoint'
import toast from 'react-hot-toast'

export default function MessageTab({ courseMessages = [], courseId }) {
  const [expandedMessage, setExpandedMessage] = useState(null)
  const [replies, setReplies] = useState({})
  const { fetchCourseReplies } = useCourse(courseId)
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isRepliesLoading, setIsRepliesLoading] = useState(false)
  const [formData, setFormData] = useState({
    message_id: '',
    text: '',
  })
  const [payload, setPayload] = useState({
    text: '',
    course_id: courseId,
  })
  const [users, setUsers] = useState({})

  const messageVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  }

  const replyVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  }

  const getUserById = async (id) => {
    if (users[id]) return users[id]

    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth
      const response = await axios.get(endpoints.getUserById(id), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const userData = response.data.data
      setUsers(prevUsers => ({ ...prevUsers, [id]: userData }))
      // console.log('User data:', userData);

      return userData
    } catch (error) {
      console.error(error)
      return null
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      for (const message of courseMessages) {
        await getUserById(message.sender_id)
      }
    }
    fetchUsers()
  }, [courseMessages])

  const handleMessageClick = async (messageId) => {
    if (expandedMessage === messageId) {
      setExpandedMessage(null)
    } else {
      setExpandedMessage(messageId)
      if (!replies[messageId]) {
        setIsRepliesLoading(true)
        try {
          const fetchedReplies = await fetchCourseReplies(messageId)
          setReplies((prev) => ({ ...prev, [messageId]: fetchedReplies }))
          for (const reply of fetchedReplies) {
            await getUserById(reply.sender_id)
          }
        } catch (error) {
          console.error('Error fetching replies:', error)
          setReplies((prev) => ({ ...prev, [messageId]: [] }))
        } finally {
          setIsRepliesLoading(false)
        }
      }
    }
  }

  const handleTextChange = (e) => {
    setPayload({
      ...payload,
      text: e.target.value
    })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    setIsSending(true)
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth
      const response = await axios.post(endpoints.sendMessage, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('Message sent successfully')
    } catch (error) {
      console.error(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      setIsSending(false)
      setPayload({
        course_id: courseId,
        text: ''
      })
    }
  }

  const handleMessageChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      text: value,
    }))
  }

  const handleReplyMessage = async (e, messageId) => {
    e.preventDefault()
    setIsLoading(true)

    const updatedFormData = { ...formData, message_id: messageId }

    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth
      await axios.post(endpoints.replyMessage, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Reply sent successfully')

      const updatedReplies = await fetchCourseReplies(messageId)
      setReplies((prev) => ({ ...prev, [messageId]: updatedReplies }))
      for (const reply of updatedReplies) {
        await getUserById(reply.sender_id)
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Error sending message')
      toast.error(error.response?.data?.message || 'Error sending message')
    } finally {
      setIsLoading(false)
      setFormData({
        message_id: '',
        text: '',
      })
    }
  }

  return (
    <div className="message-container space-y-4">
      {courseMessages && courseMessages.length > 0 ? (
        <>
          {courseMessages.map((message) => (
            <motion.div
              key={message._id}
              className="message-block bg-white shadow-md rounded-lg p-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={messageVariant}
            >
              <div>
                <p
                  className="message-title font-semibold cursor-pointer flex items-center justify-between"
                  onClick={() => handleMessageClick(message._id)}
                >
                  <span className="ml-2 capitalize">
                    {users[message.sender_id] ? `${users[message.sender_id].firstName} ${users[message.sender_id].lastName} ` : ''}
                    <br />
                  </span>
                  <span className="text-sm text-gray-500">
                    {expandedMessage === message._id ? '▲' : '▼'}
                  </span>
                </p>
                <span className='flex-none pl-2'>
                  {message.text}
                </span>
              </div>
              <AnimatePresence>
                {expandedMessage === message._id && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={replyVariant}
                    className="mt-4 space-y-2"
                  >
                    {isRepliesLoading ? (
                      <div className='flex items-center justify-center'>
                        <div className="dots-5"></div>
                      </div>
                    ) : replies[message._id] && replies[message._id].length > 0 ? (
                      replies[message._id].map((reply) => (
                        <motion.div
                          key={reply._id}
                          className="bg-gray-100 p-3 rounded-md"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={messageVariant}
                        >
                          <p className="font-bold">
                            {users[reply.sender_id] ? `${users[reply.sender_id].firstName} ${users[reply.sender_id].lastName}` : 'Unknown User'}
                          </p>
                          <p className="text-sm">{reply.text}</p>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No replies for this message.</p>
                    )}

                    <form onSubmit={(e) => handleReplyMessage(e, message._id)} className="space-y-4">
                      <div className="flex space-x-2 mt-5">
                        <input
                          type="text"
                          className='form-input rounded-full'
                          placeholder="Type reply here ..."
                          value={formData.text}
                          onChange={handleMessageChange}
                          name="text"
                          required
                        />
                        <button
                          type="submit"
                          className={`bg-primary py-3 px-5 rounded-md text-white ${isLoading ? 'opacity-50' : ''}`}
                          disabled={isLoading}
                        >
                          {isLoading ? <div className="loader"></div> : 'Reply'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <div className='pt-10'>
            <p>Send message</p>
            <div className="flex space-x-2 mt-5">
              <input
                type="text"
                className='form-input rounded-full'
                placeholder="Type message here ..."
                value={payload.text}
                onChange={handleTextChange}
                name="text"
                required
              />
              <div className="">
                <button
                  className={`w-full bg-primary py-4 px-5 rounded-md text-white whitespace-nowrap ${isSending ? 'opacity-50' : ''}`}
                  onClick={handleSendMessage}
                  disabled={isSending}
                >
                  {isSending ? <div className="loader"></div> : "Send message"}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600">No Messages for this course yet ....</p>
          <div className='pt-10'>
            <p>Send message</p>
            <div className="flex space-x-2 mt-5">
              <input
                type="text"
                className='form-input rounded-full'
                placeholder="Type message here ..."
                value={payload.text}
                onChange={handleTextChange}
                name="text"
                required
              />
              <div className="">
                <button
                  className={`w-full bg-primary py-4 px-5 rounded-md text-white whitespace-nowrap ${isSending ? 'opacity-50' : ''}`}
                  onClick={handleSendMessage}
                  disabled={isSending}
                >
                  {isSending ? <div className="loader"></div> : "Send message"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}