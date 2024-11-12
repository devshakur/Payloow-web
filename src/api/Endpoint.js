
export const BaseUrl = "https://revo-xbt9.onrender.com/api/v1";
const investmentApiBaseUrl = "https://revo-backend.onrender.com/"

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
  addToCart: `${BaseUrl}/enroll-course`,
  getCartCourses: `${BaseUrl}/get-course-in-cart`,
  removeCourseFromCart: (courseId) =>
    `${BaseUrl}/delete-course-in-cart/${courseId}`,
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
 investInBusiness:`${investmentApiBaseUrl}investor/invest/`,
  getInvestmentRequest: (business_id)=> `${investmentApiBaseUrl}debtor/business/${business_id}/investment/`,
  getBusinessStages: `${investmentApiBaseUrl}debtor/business-stages/`,
  getModels: `${investmentApiBaseUrl}debtor/models/`,
  getUser: `${investmentApiBaseUrl}user/`,
}