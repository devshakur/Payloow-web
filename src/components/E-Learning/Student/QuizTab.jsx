import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion } from 'framer-motion'
import toast from "react-hot-toast";
import { endpoints } from "../../../api/Endpoint";
import axiosInstance from "../../../AuthContext/axiosInstance";
import QuizResultModal from "./QuizResultModal";
import { useRouter } from "../../../Routes/router";



  const token = JSON.parse(localStorage.getItem("auth") || "{}").auth;

export default function QuizTab({ quizData }) {
  
  const [answers, setAnswers] = useState([]);
  const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizResult, setQuizResult] = useState({})
  const [collapsedLessons, setCollapsedLessons] = useState(
   quizData.reduce((acc, quiz) => {
  acc[quiz.lesson_id] = true; // lesson_id is a string
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

  

 





const handleSubmit = async () => {
  try {
    for (const quiz of quizData) {
      const quizAnswers = answers
        .filter((ans) => quiz.questions.some((q) => q._id === ans.question_id))
        .map((ans) => {
          const question = quiz.questions.find((q) => q._id === ans.question_id);
          const selectedOptionText = question?.options?.find(
            (opt) => opt._id === ans.selected_option
          )?.option; // 🔁 FIXED HERE

          return {
            question_id: ans.question_id,
            selected_option: selectedOptionText || "",
          };
        });

      const payload = { answers: quizAnswers };

      if (quizAnswers.length > 0) {
        const response = await axiosInstance.post(
          endpoints.submitQuiz(quiz._id),
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = response?.data;
        if (result) {
          setQuizResult(result);
          setIsModalOpen(true);
        }
      }
    }

    toast.success("All quizzes submitted successfully!");
  } catch (error) {
    console.error("Quiz submission failed:", error);
    toast.error("Failed to submit quiz. Please try again.");
  }
};



const handleRetake = () => {
  setAnswers([]); // clear previous answers
  setIsModalOpen(false);
  toast("You can retake the quiz now!");
  setTimeout(() => {
    router.reload();
  }, 300);
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
              onClick={() => toggleCollapse(quiz.lesson_id)}

            >
             {collapsedLessons[quiz.lesson_id] ? <IoIosArrowForward /> : <IoIosArrowDown />}

              <span className="ml-2">{quiz.title}</span>
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
     {isModalOpen && quizResult && (
  <QuizResultModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onRetake={handleRetake}
    result={quizResult}
  />
)}

    </div>
  );
}