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
};
