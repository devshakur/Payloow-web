import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

const CreateQuiz = () => {
  const [quizzes, setQuizzes] = useState([
    {
      questions: [],
      collapsed: false,
    },
  ]);

  const quizVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const handleChange = (e, quizIndex, questionIndex) => {
    const { name, value } = e.target;
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      const updatedQuestions = [...updatedQuizzes[quizIndex].questions];

      if (questionIndex !== undefined) {
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          [name]: value,
        };
      }

      updatedQuizzes[quizIndex] = {
        ...updatedQuizzes[quizIndex],
        questions: updatedQuestions,
      };

      return updatedQuizzes;
    });
  };

  const addQuiz = () => {
    setQuizzes((prevQuizzes) => [
      ...prevQuizzes,
      {
        questions: [],
        collapsed: false,
      },
    ]);
  };

  const removeQuiz = (quizIndex) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((_, index) => index !== quizIndex));
  };

  const addQuestionToQuiz = (quizIndex) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[quizIndex].questions.push({
        question: "",
        options: ["", "", "", ""],
        correctOption: null,
      });
      return updatedQuizzes;
    });
  };

  const removeQuestionFromQuiz = (quizIndex, questionIndex) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[quizIndex].questions.splice(questionIndex, 1);
      return updatedQuizzes;
    });
  };

  const toggleQuizCollapse = (quizIndex) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[quizIndex].collapsed = !updatedQuizzes[quizIndex].collapsed;
      return updatedQuizzes;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quizzes Submitted: ", quizzes);
  };

  return (
    <div className="bg-white my-20 mx-2 md:max-w-3xl md:mx-auto md:py-10 py-3 md:px-12 px-3 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        {quizzes.map((quiz, quizIndex) => (
          <div key={quizIndex} className="border rounded-lg md:p-5 p-3 mt-5">
            <div className="flex items-center justify-between">
              <h4 className="text-lg">Quiz {quizIndex + 1}</h4>
              <div className="flex space-x-2">
                <button type="button" onClick={() => toggleQuizCollapse(quizIndex)}>
                  <IoIosArrowDown />
                </button>
                <button type="button" onClick={() => removeQuiz(quizIndex)} className="text-red-500">
                  <MdClose />
                </button>
              </div>
            </div>

            {!quiz.collapsed && (
              <>
                {quiz.questions.map((question, questionIndex) => (
                  <motion.div key={questionIndex} className="mt-10 space-y-8"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={quizVariants}
                    transition={{ duration: 0.5 }}>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor={`question-${quizIndex}-${questionIndex}`} className="form-label">
                          Question {questionIndex + 1}
                        </label>
                        <button
                          type="button"
                          onClick={() => removeQuestionFromQuiz(quizIndex, questionIndex)}
                          className="text-red-500"
                        >
                          <MdClose />
                        </button>
                      </div>
                      <input
                        name="question"
                        id={`question-${quizIndex}-${questionIndex}`}
                        value={question.question}
                        onChange={(e) => handleChange(e, quizIndex, questionIndex)}
                        className="form-input"
                        placeholder="Quiz question"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="form-label">Answer</label>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`correctOption-${quizIndex}-${questionIndex}`}
                              id={`correctOption-${quizIndex}-${questionIndex}-${optionIndex}`}
                              checked={question.correctOption === optionIndex}
                              onChange={() => handleChange({ target: { name: 'correctOption', value: optionIndex } }, quizIndex, questionIndex)}
                              className="w-5 h-5"
                            />
                            <input
                              type="text"
                              name={`options`}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options];
                                newOptions[optionIndex] = e.target.value;
                                handleChange({ target: { name: 'options', value: newOptions } }, quizIndex, questionIndex);
                              }}
                              className="form-input"
                              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <button
                  type="button"
                  className="flex items-center justify-center mt-5 space-x-3 bg-[#DBE7FE] border-2 border-[#DBE7FE] px-5 py-2 rounded-lg"
                  onClick={() => addQuestionToQuiz(quizIndex)}
                >
                  <GoPlus />
                  <span>Add Question</span>
                </button>
              </>
            )}
          </div>
        ))}

        <button
          type="button"
          className="flex items-center justify-center space-x-3 bg-[#DBE7FE] border-2 border-[#DBE7FE] text-primary px-10 py-2 rounded-lg mt-5"
          onClick={addQuiz}
        >
          <GoPlus />
          <span>Add Quiz</span>
        </button>

        <div className="flex items-center justify-between space-x-8">
          <button
            type="submit"
            className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;