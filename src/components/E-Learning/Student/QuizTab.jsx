import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion } from 'framer-motion'
import toast from "react-hot-toast";

export default function QuizTab({ quizData }) {
  const [answers, setAnswers] = useState([]);
  const [collapsedLessons, setCollapsedLessons] = useState(
    quizData.reduce((acc, quiz) => {
      acc[quiz.lesson_id._id] = true; // All lessons collapsed by default
      return acc;
    }, {})
  );



  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((ans) => ans.question_id !== questionId);
      return [...updatedAnswers, { question_id: questionId, selected_option: optionId }];
    });
  };

  const quizVariant = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  }

  const handleSubmit = () => {
    const payload = {
      course_id: quizData.course_id,
      quiz_id: quizData._id,
      answers,
    };
    console.log("Quiz submission payload:", payload);
    toast.success("Quiz submitted successfully!");
  };

  const toggleCollapse = (lessonId) => {
    setCollapsedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  return (
    <div className="quiz-container">
      {
        quizData.map((quiz) => (
          <motion.div key={quiz._id}
            className="quiz-block"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={quizVariant}>
            <h2
              className="lesson-title font-bold text-lg py-3 cursor-pointer flex items-center"
              onClick={() => toggleCollapse(quiz.lesson_id._id)}
            >
              {collapsedLessons[quiz.lesson_id._id] ? <IoIosArrowForward /> : <IoIosArrowDown />}
              <span className="ml-2">{quiz.lesson_id.title}</span>
            </h2>
            {
              !collapsedLessons[quiz.lesson_id._id] && (
                quiz?.questions?.map((question, index) => (
                  <motion.div key={question?._id} className="question-block" initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={quizVariant}>
                    <p className="question-text font-semibold">{index + 1}. {question?.question_text}</p>
                    <div className="options flex flex-col space-y-1 py-2">
                      {question?.options?.map((option) => (
                        <label key={option?._id} className="option-label">
                          <input
                            type="radio"
                            className="mr-2"
                            name={question?._id}
                            value={option?._id}
                            onChange={() => handleOptionChange(question?._id, option?._id)}
                          />
                          {option?.option}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))
              )
            }
          </motion.div>
        ))
      }
      <button onClick={handleSubmit} className="submit-button bg-primary w-full py-3 rounded text-white mt-5">
        Submit Quiz
      </button>
    </div>
  );
}