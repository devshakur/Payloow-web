import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const lessonVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const quizVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const [formData, setFormData] = useState({
    courseTitle: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    priceDiscount: "",
    courseVideo: "",
    courseThumbnail: "",
    sections: [
      {
        title: "",
        description: "",
        lessons: [],
        quizzes: [],
        collapsed: false,
      },
    ],
  });

  const handleChange = (e, sectionIndex = null, lessonIndex = null, quizIndex = null, questionIndex = null) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (sectionIndex === null) {
        return { ...prevData, [name]: value };
      }

      const updatedSections = [...prevData.sections];

      if (lessonIndex === null && quizIndex === null) {
        updatedSections[sectionIndex][name] = value;
      } else if (quizIndex === null) {
        updatedSections[sectionIndex].lessons[lessonIndex][name] = value;
      } else if (questionIndex === null) {
        updatedSections[sectionIndex].quizzes[quizIndex][name] = value;
      } else {
        updatedSections[sectionIndex].quizzes[quizIndex].questions[questionIndex][name] = value;
      }

      return { ...prevData, sections: updatedSections };
    });
  };

  const addSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [
        ...prevData.sections,
        {
          title: "",
          description: "",
          lessons: [],
          quizzes: [],
          collapsed: false,
        },
      ],
    }));
  };

  const removeSection = (sectionIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      sections: prevData.sections.filter((_, index) => index !== sectionIndex),
    }));
  };

  const addLesson = (sectionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons.push({
        title: "",
        videoUrl: "",
        duration: "",
        order: "",
        collapsed: false,
      });
      return { ...prevData, sections: updatedSections };
    });
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons = updatedSections[sectionIndex].lessons.filter(
        (_, index) => index !== lessonIndex
      );
      return { ...prevData, sections: updatedSections };
    });
  };

  const addQuiz = (sectionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].quizzes.push({
        questions: [],
        collapsed: false,
      });
      return { ...prevData, sections: updatedSections };
    });
  };

  const removeQuiz = (sectionIndex, quizIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].quizzes = updatedSections[sectionIndex].quizzes.filter(
        (_, index) => index !== quizIndex
      );
      return { ...prevData, sections: updatedSections };
    });
  };

  const addQuestionToQuiz = (sectionIndex, quizIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].quizzes[quizIndex].questions.push({
        question: "",
        options: ["", "", "", ""],
        correctOption: null,
      });
      return { ...prevData, sections: updatedSections };
    });
  };

  const removeQuestionFromQuiz = (sectionIndex, quizIndex, questionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].quizzes[quizIndex].questions = updatedSections[sectionIndex].quizzes[quizIndex].questions.filter(
        (_, index) => index !== questionIndex
      );
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleCollapse = (sectionIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].collapsed = !updatedSections[sectionIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleLessonCollapse = (sectionIndex, lessonIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].lessons[lessonIndex].collapsed = !updatedSections[sectionIndex].lessons[lessonIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const toggleQuizCollapse = (sectionIndex, quizIndex) => {
    setFormData((prevData) => {
      const updatedSections = [...prevData.sections];
      updatedSections[sectionIndex].quizzes[quizIndex].collapsed = !updatedSections[sectionIndex].quizzes[quizIndex].collapsed;
      return { ...prevData, sections: updatedSections };
    });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <section className="">
      <div className="bg-white w-full flex items-center justify-between py-5 md:px-10 px-5">
        <div className="w-full flex items-center justify-start">
          <img src="/images/logo.svg" alt="logo" className="h-14" />
        </div>
        <p className="w-full text-center">Step {step} of 3</p>
        <button
          type="button"
          onClick={() => {
            navigate("/e-learning/tutor/courses");
          }}
          className="w-full text-right flex items-center justify-end"
        >
          <span className="md:hidden">
            <CloseCircle />
          </span>
          <span className="md:block hidden">Exit</span>
        </button>
      </div>

      <div className="bg-white my-20 mx-2 md:max-w-3xl md:mx-auto md:py-10 py-3 md:px-12 px-3 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="courseTitle" className="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  name="courseTitle"
                  id="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Course Title"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Description"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <div className="form-input">
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full"
                    required
                  >
                    <option value="">Category</option>
                    <option value="category1">Category1</option>
                    <option value="category2">Category2</option>
                    <option value="category3">Category3</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="duration" className="form-label">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Duration"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Price"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="priceDiscount" className="form-label">
                  Price Discount
                </label>
                <input
                  type="text"
                  name="priceDiscount"
                  id="priceDiscount"
                  value={formData.priceDiscount}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Discount"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="courseVideo" className="form-label">
                  Upload Course Video
                </label>
                <div className="bg-primary/20 h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                  Drop file here to upload…
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="courseThumbnail" className="form-label">
                  Upload Course Thumbnail
                </label>
                <div className="bg-primary/20 h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                  Drop file here to upload…
                </div>
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {formData.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  className="border rounded-lg md:p-5 p-3 mt-5"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={sectionVariants}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">
                      Section {sectionIndex + 1}
                    </h4>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => toggleCollapse(sectionIndex)}
                      >
                        <IoIosArrowDown />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="text-red-500"
                      >
                        <MdClose />
                      </button>
                    </div>
                  </div>

                  {!section.collapsed && (
                    <>
                      <div className="mt-10 space-y-5">
                        <div className="flex flex-col space-y-2">
                          <label htmlFor={`section-${sectionIndex}-title`} className="form-label">
                            Title
                          </label>
                          <input
                            name="title"
                            id={`section-${sectionIndex}-title`}
                            value={section.title}
                            onChange={(e) => handleChange(e, sectionIndex)}
                            className="form-input"
                            placeholder="Section title"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor={`section-${sectionIndex}-description`} className="form-label">
                            Description
                          </label>
                          <textarea
                            name="description"
                            id={`section-${sectionIndex}-description`}
                            cols="5"
                            rows="5"
                            className="form-input"
                            placeholder="Section Description"
                            value={section.description}
                            onChange={(e) => handleChange(e, sectionIndex)}
                            required
                          ></textarea>
                        </div>
                      </div>
                      {section.lessons.map((lesson, lessonIndex) => (
                        <motion.div
                          key={lessonIndex}
                          className="border rounded-lg md:p-5 p-3 mt-5"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={lessonVariants}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg">
                              Lesson {lessonIndex + 1}
                            </h4>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => toggleLessonCollapse(sectionIndex, lessonIndex)}
                              >
                                <IoIosArrowDown />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeLesson(sectionIndex, lessonIndex)}
                                className="text-red-500"
                              >
                                <MdClose />
                              </button>
                            </div>
                          </div>

                          {!lesson.collapsed && (
                            <div className="mt-10 space-y-8">
                              <div className="flex flex-col space-y-2">
                                <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-title`} className="form-label">
                                  Title
                                </label>
                                <input
                                  name="title"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-title`}
                                  value={lesson.title}
                                  onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                  className="form-input"
                                  placeholder="Lesson title"
                                  required
                                />
                              </div>
                              <div className="flex flex-col space-y-2">
                                <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`} className="form-label">
                                  Video URL
                                </label>
                                <input
                                  name="videoUrl"
                                  id={`lesson-${sectionIndex}-${lessonIndex}-videoUrl`}
                                  value={lesson.videoUrl}
                                  onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                  className="form-input"
                                  placeholder="Video URL"
                                  required
                                />
                              </div>
                              <div className="grid md:grid-cols-2 md:gap-5 gap-8">
                                <div className="flex flex-col space-y-2">
                                  <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-duration`} className="form-label">
                                    Duration
                                  </label>
                                  <input
                                    name="duration"
                                    id={`lesson-${sectionIndex}-${lessonIndex}-duration`}
                                    value={lesson.duration}
                                    onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                    className="form-input"
                                    placeholder="Duration"
                                    required
                                  />
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <label htmlFor={`lesson-${sectionIndex}-${lessonIndex}-order`} className="form-label">
                                    Order
                                  </label>
                                  <input
                                    name="order"
                                    id={`lesson-${sectionIndex}-${lessonIndex}-order`}
                                    value={lesson.order}
                                    onChange={(e) => handleChange(e, sectionIndex, lessonIndex)}
                                    className="form-input"
                                    placeholder="Order"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}

                      {section.quizzes.map((quiz, quizIndex) => (
                        <motion.div
                          key={quizIndex}
                          className="border rounded-lg md:p-5 p-3 mt-5"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={quizVariants}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg">Quiz {quizIndex + 1}</h4>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => toggleQuizCollapse(sectionIndex, quizIndex)}
                              >
                                <IoIosArrowDown />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeQuiz(sectionIndex, quizIndex)}
                                className="text-red-500"
                              >
                                <MdClose />
                              </button>
                            </div>
                          </div>

                          {!quiz.collapsed && (
                            <>
                              {quiz.questions.map((question, questionIndex) => (
                                <motion.div
                                  key={questionIndex}
                                  className="mt-10 space-y-8"
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  variants={quizVariants}
                                  transition={{ duration: 0.5 }}
                                >
                                  <div className="flex flex-col space-y-2">
                                    <div className="flex items-center justify-between">
                                      <label htmlFor={`question-${sectionIndex}-${quizIndex}-${questionIndex}`} className="form-label">
                                        Question {questionIndex + 1}
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => removeQuestionFromQuiz(sectionIndex, quizIndex, questionIndex)}
                                        className="text-red-500"
                                      >
                                        <MdClose />
                                      </button>
                                    </div>
                                    <input
                                      name="question"
                                      id={`question-${sectionIndex}-${quizIndex}-${questionIndex}`}
                                      value={question.question}
                                      onChange={(e) => handleChange(e, sectionIndex, null, quizIndex, questionIndex)}
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
                                            name={`correctOption-${sectionIndex}-${quizIndex}-${questionIndex}`}
                                            id={`correctOption-${sectionIndex}-${quizIndex}-${questionIndex}-${optionIndex}`}
                                            checked={question.correctOption === optionIndex}
                                            onChange={() => handleChange({ target: { name: 'correctOption', value: optionIndex } }, sectionIndex, null, quizIndex, questionIndex)}
                                            className="w-5 h-5"
                                          />
                                          <input
                                            type="text"
                                            name={`options`}
                                            value={option}
                                            onChange={(e) => {
                                              const newOptions = [...question.options];
                                              newOptions[optionIndex] = e.target.value;
                                              handleChange({ target: { name: 'options', value: newOptions } }, sectionIndex, null, quizIndex, questionIndex);
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
                                onClick={() => addQuestionToQuiz(sectionIndex, quizIndex)}
                              >
                                <GoPlus />
                                <span>Add Question</span>
                              </button>
                            </>
                          )}
                        </motion.div>
                      ))}

                      <div className="flex md:flex-row flex-col md:space-x-5 mt-5 md:space-y-0 space-y-3">
                        <button
                          type="button"
                          className="flex items-center justify-center space-x-3 bg-[#DBE7FE] border-2 border-[#DBE7FE] text-primary px-10 py-2 rounded-lg"
                          onClick={() => addLesson(sectionIndex)}
                        >
                          <GoPlus />
                          <span>Add Lesson</span>
                        </button>

                        <button
                          type="button"
                          className="flex items-center justify-center space-x-3 bg-[#DBE7FE] border-2 border-[#DBE7FE] text-primary px-10 py-2 rounded-lg"
                          onClick={() => addQuiz(sectionIndex)}
                        >
                          <GoPlus />
                          <span>Add Quiz</span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}

              <button
                type="button"
                className="flex items-center justify-center space-x-3 bg-white border-2 border-primary text-primary px-5 py-3 mt-5 rounded-lg md:w-auto w-full"
                onClick={addSection}
              >
                <GoPlus />
                <span>Add Section</span>
              </button>
              <div className="flex items-center justify-between space-x-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm text-primary border border-primary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default CreateCourse;