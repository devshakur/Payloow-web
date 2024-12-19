// components/RatingModal.jsx
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import { endpoints } from '../../../api/Endpoint'
import toast from 'react-hot-toast'

const RatingModal = ({ isOpen, onClose, courseId }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth
      await axios.post(endpoints.addCourseRating, {
        course_id: courseId,
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('Rating submitted successfully')
      onClose()
    } catch (error) {
      toast.error('Failed to submit rating')
      console.error('Error submitting rating:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Rate this Course</h2>

        <div className="flex justify-center space-x-2 mb-6">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1
            return (
              <FaStar
                key={ratingValue}
                className="cursor-pointer"
                size={32}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(rating)}
              />
            )
          })}
        </div>

        <textarea
          className="w-full p-2 border rounded-lg mb-4 h-32"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!rating}
            className={`px-4 py-2 text-white rounded-lg ${rating ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            {isLoading ? <div className="loader"></div> : "Submit Review"}
          </button>

        </div>
      </div>
    </div >
  )
}

export default RatingModal