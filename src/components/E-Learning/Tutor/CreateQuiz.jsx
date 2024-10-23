import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router-dom";
import { endpoints } from "../../../api/Endpoint";
import axios from "axios";
import toast from "react-hot-toast";

const CreateQuiz = ({ onClose, onSubmit }) => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchCourseById();
  }, []);

  const fetchCourseById = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await fetch(import.meta.env.VITE_BASEURL + `${`/get-course-by-id/${id}`}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCourseData(data.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  // Get sections from course data
  const sections = courseData?.sections || [];

  // Get lessons from selected section
  const lessons = sections.find(section => section._id === selectedSectionId)?.lessons || [];

  const handleSectionSelect = (sectionId) => {
    setSelectedSectionId(sectionId);
    setSelectedLessonId(""); // Reset lesson selection when section changes
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: "",
        options: [
          { option: "", is_correct: false },
          { option: "", is_correct: false },
          { option: "", is_correct: false },
          { option: "", is_correct: false }
        ]
      }
    ]);
  };

  const handleRemoveQuestion = (questionIndex) => {
    setQuestions(questions.filter((_, index) => index !== questionIndex));
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question_text") {
      updatedQuestions[questionIndex].question_text = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].option = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.map(
      (option, index) => ({
        ...option,
        is_correct: index === optionIndex
      })
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      course_id: courseData?._id,
      section_id: selectedSectionId,
      lesson_id: selectedLessonId,
      quiz_title: quizTitle,
      questions: questions
    };
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      const response = await axios.post(endpoints.addQuiz, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('quiz uploaded successfully')
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching course:", error);

    }
    console.log(payload)
    onSubmit(payload);
  };

  if (!courseData) {
    return <div className="text-center p-4">Loading course data...</div>;
  }

  return (
    <div className="bg-white my-5 mx-2 md:max-w-3xl md:mx-auto md:py-10 py-3 md:px-12 px-3 rounded-lg max-h-[40rem] overflow-hidden overflow-y-scroll">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">{courseData.title}</h2>
          <p className="text-gray-600 mb-4">{courseData.description}</p>
        </div>

        <div>
          <label htmlFor="section-select" className="form-label">Select Section</label>
          <select
            id="section-select"
            value={selectedSectionId}
            onChange={(e) => handleSectionSelect(e.target.value)}
            className="form-select w-full"
            required
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {selectedSectionId && (
          <div>
            <label htmlFor="lesson-select" className="form-label">Select Lesson</label>
            <select
              id="lesson-select"
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="form-select w-full"
              required
            >
              <option value="">Select a lesson</option>
              {lessons.map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedLessonId && (
          <div>
            <label htmlFor="quiz-title" className="form-label">Quiz Title</label>
            <input
              id="quiz-title"
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="form-input w-full"
              placeholder="Enter quiz title"
              required
            />
          </div>
        )}

        {selectedLessonId && questions.map((question, questionIndex) => (
          <div key={questionIndex} className="border rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg">Question {questionIndex + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(questionIndex)}
                className="text-red-500"
              >
                <MdClose />
              </button>
            </div>

            <div>
              <input
                type="text"
                value={question.question_text}
                onChange={(e) => handleQuestionChange(questionIndex, "question_text", e.target.value)}
                className="form-input w-full"
                placeholder="Enter question"
                required
              />
            </div>

            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct-option-${questionIndex}`}
                    checked={option.is_correct}
                    onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                    className="w-5 h-5"
                    required
                  />
                  <input
                    type="text"
                    value={option.option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    className="form-input flex-1"
                    placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedLessonId && (
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center justify-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg w-full"
          >
            <GoPlus />
            <span>Add Question</span>
          </button>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
            disabled={!selectedLessonId || questions.length === 0}
          >
            Create Quiz
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;