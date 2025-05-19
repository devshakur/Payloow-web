export const BaseUrl = "https://api-dev.payloow.com/api/v1";
const investmentApiBaseUrl = "https://api-dev-investment.payloow.com/";

//registration
export const AuthEndPoints = {
  login: `${BaseUrl}/login`,
  register: `${BaseUrl}/register`,
  forget: `${BaseUrl}/forget-password`,
  reset: `${BaseUrl}/reset-password`,
  getUser: `${BaseUrl}/get-current-user`,
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
    `${BaseUrl}/delete-all-course-in-cart/${courseId}`,

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
  addCourseRating: `${BaseUrl}/add-course-rating`,
  purchaseCourse: `${BaseUrl}/course/payment`,
  deleteCart: `${BaseUrl}/delete-all-course-in-cart`,
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
//Bills
export const BillsEndpoints = {
  airtime: `${BaseUrl}/buy-airtime-vtu`,
  data: `${BaseUrl}/buy-data-vtu`,
  electricity: `${BaseUrl}/buy-electricity-vtu`,
  subscription: `${BaseUrl}/buy-cable-subscription-vtu`,
  balance: `${BaseUrl}/get-vtu-providers-wallet-balance`,
  setPin: `${BaseUrl}/set-transaction-pin`,
  confirm: `${BaseUrl}/verify-transaction-pin`,
  getUserDetails: `${BaseUrl}/get-current-user`,
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
  getBusinessInfo: (business_id) =>
    `${investmentApiBaseUrl}debtor/business/${business_id}/`,
  addLoan: (businessId) =>
    `${investmentApiBaseUrl}debtor/business/${businessId}/loan/`,
  investInBusiness: `${investmentApiBaseUrl}investor/invest/`,
  getInvestmentRequest: (business_id) =>
    `${investmentApiBaseUrl}debtor/business/${business_id}/investment/`,
  getInvestorsInvestment: `${investmentApiBaseUrl}investor/investments/`,
  getBusinessStages: `${investmentApiBaseUrl}debtor/business-stages/`,
  getModels: `${investmentApiBaseUrl}debtor/models/`,
  getUser: `${investmentApiBaseUrl}user/`,
  acceptRequest: (investment_id) =>
    `${investmentApiBaseUrl}debtor/investment/${investment_id}/accept/`,
  declineRequest: (investment_id) =>
    `${investmentApiBaseUrl}debtor/investment/${investment_id}/decline/`,
  repayInvestment: (investment_id) =>
    `${investmentApiBaseUrl}debtor/investment/${investment_id}/repayment/`,
};

//EasyBuy
export const EasyBuyEndpoints = {
  createProfile: `${BaseUrl}/easybuy/profile`,
  getCart: `${BaseUrl}/easybuy/buyer/cart/`,
  createProduct: `${BaseUrl}/easybuy/partner/products/`,
  getEasyBuyCategories: `${BaseUrl}/easybuy/categories/`,
  addToCart: `${BaseUrl}/easybuy/buyer/cart/`,
  deleteFromCart: `${BaseUrl}/easybuy/buyer/cart/`,
  fetchAllProduct: `${BaseUrl}/easybuy/buyer/products/`,
  checkCoupon: `${BaseUrl}/easybuy/buyer/check-coupon/`,
  GetDeliveryInfo: `${BaseUrl}/easybuy/buyer/delivery-information/`,
  checkOut: `${BaseUrl}/easybuy/buyer/checkout/`,
  swapProduct: `${BaseUrl}/swap/product`,
  getUserOrders: `${BaseUrl}/easybuy/buyer/orders/`,
  getInstallmentOrders: `${BaseUrl}/easybuy/buyer/installment-orders/`,
  getTotalSolarStock: `${BaseUrl}/easybuy/partner/inventory/solar-inverter-stock`,
  getInventoryOrders: `${BaseUrl}/easybuy/partner/inventory/orders`,
  getProductInventory: `${BaseUrl}/easybuy/partner/inventory/products`,
  getActiveCustomer: `${BaseUrl}/easybuy/partner/inventory/number-of-active-customers`,
  createServiceCenter: `${BaseUrl}/easybuy/partner/service-center`,
  getServiceCenter: `${BaseUrl}/easybuy/partner/service-center`,
  getPartnerCustomers: `${BaseUrl}/easybuy/partner/customers`,
  getPercentages: `${BaseUrl}/easybuy/partner/inventory/percentage-paid`,
  deleteAllCartItem: `${BaseUrl}/easybuy/buyer/orders/delete`,
};

//admin
export const AdminEndpoints = {
  getAllDebtors: `${BaseUrl}/investment/admin/debtors`,
  getAllInvestors: `${BaseUrl}/investment/admin/investors`,
  getAllBusinesses: `${BaseUrl}/investment/admin/businesses`,
  //E-learning
  getAllTutors: `${BaseUrl}/tutors`,
  getAllCourses: `${BaseUrl}/all/courses`,
  getEnrolledStudents: `${BaseUrl}/students`,
  getVtuBalance: `${BaseUrl}/get-vtu-providers-wallet-balance`,
};
