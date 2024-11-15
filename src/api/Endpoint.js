
export const BaseUrl = "https://revo-xbt9.onrender.com/api/v1";
const investmentApiBaseUrl = "https://revo-backend.onrender.com/"

export const AuthEndPoints = {
  login: `${BaseUrl}/login`,
  register: `${BaseUrl}/register`,
  forget: `${BaseUrl}/forget-password`,
  reset: `${BaseUrl}/reset-password`,
};

export const endpoints = {
  // tutor
  createTutorProfile: `${BaseUrl}/create-course-tutor-profile`,
  getTutorProfileById: (id) =>
    `${BaseUrl}/get-course-tutor-profile-by-id/${id}`,
  addTutorImage: `${BaseUrl}/add-tutor-image`,

  // cart
  addToCart: `${BaseUrl}/enroll-course`,
  getCartCourses: `${BaseUrl}/get-course-in-cart`,
  removeCourseFromCart: (courseId) =>
    `${BaseUrl}/delete-course-in-cart/${courseId}`,

  // course
  getAllCourses: `${BaseUrl}/get-all-courses`,
  getEnrolledCourses: `${BaseUrl}/get-all-enrolled-courses`,
  uploadCourseThumbnail: `${BaseUrl}/add-course-thumbnail-image`,
  editCourse: `${BaseUrl}/add-to-existing-lessons`,
  getCourseQuiz: (id) => `${BaseUrl}/get-course-quiz/${id}`,
  getCourseById: (id) => `${BaseUrl}/get-course-by-id/${id}`,
  addQuiz: `${BaseUrl}/add-course-question`,
  getCourseContent: `${BaseUrl}/get-course-content`,
  uploadCourseVideo: `${BaseUrl}/upload-course-video-document`,
  createCourseContent: `${BaseUrl}/create-course-content`,

  // General
  getCurrentUser: `${BaseUrl}/get-current-user`,
  changeEmail: `${BaseUrl}/change-email`,
  changePassword: `${BaseUrl}/change-password`,
  changeProfilePicture: `${BaseUrl}/add-profile-picture`,
  getUserById: (id) => `${BaseUrl}/get-user-by-id/${id}`,

  // message
  sendMessage: `${BaseUrl}/send-message`,
  replyMessage: `${BaseUrl}/reply-to-message`,
  getReplies: (messageId) => `${BaseUrl}/get-replies-message/${messageId}`,
  getMessages: `${BaseUrl}/get-messages`,
  updateMessage: `${BaseUrl}/update-messages`,
  getSingleMessage: (messageId) => `${BaseUrl}/get-single-message/${messageId}`,
  deleteMessage: (messageId) => `${BaseUrl}/delete-message/${messageId}`,
  getMessageForCourse: (courseId) =>
    `${BaseUrl}/get-messages-for-course/${courseId}`,

  // announcement
  createAnnouncement: `${BaseUrl}/make-course-announcement`,
  getAnnouncements: (courseId) =>
    `${BaseUrl}/get-all-course-announcements/${courseId}`,

  getCourseAnnouncements: (courseId) =>
    `${BaseUrl}/course-announcement/${courseId}`,
};

export const BillsEndpoints = {
  airtime: `${BaseUrl}/buy-airtime-vtu`,
  data: `${BaseUrl}/buy-data-vtu`,
  electricity: `${BaseUrl}/buy-electricity-vtu`,
  subscription: `${BaseUrl}/buy-cable-subscription-vtu`,
  balance: `${BaseUrl}/get-vtu-providers-wallet-balance`,
  setPin: `${BaseUrl}/set-transaction-pin`,
  confirm: `${BaseUrl}/confirm-pin`,
};

//Investment Endpoints
export const InvestmentEndpoints = {
  createDebtor: `${investmentApiBaseUrl}debtor/`,
  createInvestor: `${investmentApiBaseUrl}investor/`,
  createBusiness: `${investmentApiBaseUrl}debtor/business/`,
  getIndustries: `${investmentApiBaseUrl}user/business-industries`,
  viewBusiness: `${investmentApiBaseUrl}debtor/business/`,
  getLoanBusiness: `${investmentApiBaseUrl}browse/`,
  getFilteredLoanBusiness: `${investmentApiBaseUrl}browse/`,
  getBusinessInfo: (business_id)=> `${investmentApiBaseUrl}debtor/business/${business_id}/`,
  addLoan: (businessId)=> `${investmentApiBaseUrl}debtor/business/${businessId}/loan/`,
 investInBusiness: `${investmentApiBaseUrl}investor/invest/`,
  getInvestmentRequest: (business_id)=> `${investmentApiBaseUrl}debtor/business/${business_id}/investment/`,
  getInvestorsInvestment:`${investmentApiBaseUrl}investor/investments/`,
  getBusinessStages:`${investmentApiBaseUrl}debtor/business-stages/`,
  getModels: `${investmentApiBaseUrl}debtor/models/`,
  getUser: `${investmentApiBaseUrl}user/`,
  acceptRequest: (investment_id)=> `${investmentApiBaseUrl}debtor/investment/${investment_id}/accept/`,
  declineRequest: (investment_id)=> `${investmentApiBaseUrl}debtor/investment/${investment_id}/decline/`,
}