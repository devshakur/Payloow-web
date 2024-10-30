//Base-URL
export const BaseUrl = "https://revo-p3jw.onrender.com/api/v1";

export const AuthEndPoints = {
  login: `${BaseUrl}/login`,
  register: `${BaseUrl}/register`,
  forget: `${BaseUrl}/forget-password`,
  reset: `${BaseUrl}/reset-password`,
};

export const endpoints = {
  createTutorProfile: `${BaseUrl}/create-course-tutor-profile`,
  getCurrentUser: `${BaseUrl}/get-current-user`,
  addTutorImage: `${BaseUrl}/add-tutor-image`,
  uploadCourseVideo: `${BaseUrl}/upload-course-video-document`,
  createCourseContent: `${BaseUrl}/create-course-content`,
  changeEmail: `${BaseUrl}/change-email`,
  changePassword: `${BaseUrl}/change-password`,
  changeProfilePicture: `${BaseUrl}/add-profile-picture`,
  getAllCourses: `${BaseUrl}/get-all-courses`,
  uploadCourseThumbnail: `${BaseUrl}/add-course-thumbnail-image`,
  editCourse: `${BaseUrl}/add-to-existing-lessons`,
  addQuiz: `${BaseUrl}/add-course-question`,
};

export const BillsEndpoints = {
  airtime: `${BaseUrl}/buy-airtime-vtu`,
  data: `${BaseUrl}/buy-data-vtu`,
  electricity: `${BaseUrl}/buy-electricity-vtu`,
  subscription: `${BaseUrl}/buy-cable-subscription-vtu`,
  balance: `${BaseUrl}/get-vtu-providers-wallet-balance`,
  setPin:  `${BaseUrl}/set-transaction-pin`,
  confirm: `${BaseUrl}/confirm-pin`,
};
