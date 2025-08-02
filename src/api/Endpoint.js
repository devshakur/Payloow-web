export const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const investmentApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!BaseUrl) {
  throw new Error("API_BASE_URL is not defined in your .env file");
}

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
  createTutorProfile: `${BaseUrl}/tutors/profile`,
  getTutorProfileById: (id) =>
    `${BaseUrl}/get-course-tutor-profile-by-id/${id}`,
  addTutorImage: `${BaseUrl}/add-tutor-image`,

  // cart
  addToCart: (id) => `${BaseUrl}/students/courses/${id}/cart`,
  getCartCourses: `${BaseUrl}/students/cart`,
  removeCourseFromCart: (id) => `${BaseUrl}/students/courses/${id}/cart`,

  // course
  getAllCourses: `${BaseUrl}/tutors/courses`,
  getAllStdCourses: `${BaseUrl}/students/courses`,
  getPurchasedCourse: `${BaseUrl}/students/my-courses`,
  getEnrolledCourses: `${BaseUrl}/get-all-enrolled-courses`,
  uploadVideoToCloud: `${BaseUrl}/elearning-uploads/courses/intro-video-upload-url`,
  editCourse: `${BaseUrl}/tutors/courses/sections`,
  updateCourse: (id) => `${BaseUrl}/tutors/courses/${id}`,
  updateSection: (id) => `${BaseUrl}/tutors/sections/${id}`,
  getCourseQuiz: (id) => `${BaseUrl}/students/lessons/${id}/quizzes`,
  getCourseById: (id) => `${BaseUrl}/get-course-by-id/${id}`,
  addQuiz: `${BaseUrl}/tutors/quiz`,
  submitQuiz: (id) => `${BaseUrl}/students/quiz/${id}/attempt`,
  getAllQuizzes: (id) => `${BaseUrl}/tutors/quiz/${id}`,
  getCourseContent: `${BaseUrl}/get-course-content`,
  uploadCourseVideo: `${BaseUrl}/elearning-uploads/courses/lesson-video-upload-url`,
  createCourseContent: `${BaseUrl}/tutors/courses`,
  addCourseRating: (id) => `${BaseUrl}/students/courses/${id}/reviews`,
  purchaseCourse: (id) => `${BaseUrl}/students/courses/${id}/enroll`,
  purchaseCourseInCart: `${BaseUrl}/students/cart/enroll`,
  deleteCart: `${BaseUrl}/delete-all-course-in-cart`,
  // General
  getCurrentUser: `${BaseUrl}/get-current-user`,
  changeEmail: `${BaseUrl}/change-email`,
  changePassword: `${BaseUrl}/update-transaction-pin`,
  changeProfilePicture: `${BaseUrl}/add-profile-picture`,
  getUserById: (id) => `${BaseUrl}/get-user-by-id/${id}`,

  // message
  sendMessage: `${BaseUrl}/send-message`,
  replyMessage: `${BaseUrl}/reply-to-message`,
  getReplies: (messageId) =>
    `${BaseUrl}/e-learning/live-messaging/messages/${messageId}`,
  getMessages: `${BaseUrl}/get-messages`,
  updateMessage: `${BaseUrl}/update-messages`,
  getSingleMessage: (messageId) => `${BaseUrl}/get-single-message/${messageId}`,
  deleteMessage: (messageId) => `${BaseUrl}/delete-message/${messageId}`,
  getMessageForCourse: (courseId) =>
    `${BaseUrl}/get-messages-for-course/${courseId}`,

  // announcement
  createAnnouncement: `${BaseUrl}/tutors/announcements`,
  getAnnouncements: (courseId) =>
    `${BaseUrl}/get-all-course-announcements/${courseId}`,
  getCourseAnnouncements: (courseId) =>
    `${BaseUrl}/students/announcement/${courseId}`,
};
//Bills
export const BillsEndpoints = {
  airtime: `${BaseUrl}/payloow-bills/airtime`,
  data: `${BaseUrl}/payloow-bills/data`,

  electricityVariation: `${BaseUrl}/payloow-bills/electricity/discos`,
  validateMeterNumber: `${BaseUrl}/payloow-bills/electricity/validate-meter`,
  electricity: `${BaseUrl}/payloow-bills/electricity`,
  cableVariation: `${BaseUrl}/payloow-bills/cable-tv/list`,
  validateCableNumber: `${BaseUrl}/payloow-bills/cable-tv/validate`,
  buyCableSubscription: `${BaseUrl}/payloow-bills/cable-tv`,
  getAllTransactions: `${BaseUrl}/transactions/list`,
  balance: `${BaseUrl}/wallet/get-wallet-balance`,
  setPin: `${BaseUrl}/set-transaction-pin`,
  getUserDetails: `${BaseUrl}/get-current-user`,
};

//Investment Endpoints
export const InvestmentEndpoints = {
  createDebtor: `${BaseUrl}/debtors-users/profile`,
  createInvestor: `${investmentApiBaseUrl}/investors-users/profile`,
  createBusiness: `${investmentApiBaseUrl}/debtors-users/business`,
  viewBusiness: `${investmentApiBaseUrl}/debtors-users/business`,
  getLoanBusiness: `${investmentApiBaseUrl}/debtors-users/business`,
  getInvestorsRequest: `${investmentApiBaseUrl}/debtors-users/business/investment`,
  getFilteredLoanBusiness: `${investmentApiBaseUrl}/browse`,
  getBusinessInfo: (business_id) =>
    `${investmentApiBaseUrl}debtor/business/${business_id}/`,
  addLoan: `${BaseUrl}/debtors-users/business/loan`,
  investInBusiness: `${investmentApiBaseUrl}/investors-users/invest`,
  getInvestmentRequest: (business_id) =>
    `${investmentApiBaseUrl}debtor/business/${business_id}/investment`,
  getInvestorsInvestment: `${investmentApiBaseUrl}/investors-users/investments`,
  getUser: `${BaseUrl}/debtors-users/profile`,
  acceptOrDecline: (investmentRequestId) =>
    `${investmentApiBaseUrl}/debtors-users/business/investment/${investmentRequestId}`,
  // this handles both accept & decline
  repayInvestment: (investmentId) =>
    `${investmentApiBaseUrl}/debtors-users/business/investment/${investmentId}/repay`,
};

//EasyBuy
export const EasyBuyEndpoints = {
  createProfile: `${BaseUrl}/easybuy/profile`,
  getCart: `${BaseUrl}/easybuy/buyer/cart/`,
  createProduct: `${BaseUrl}/easybuy/partner/products`,
  getEasyBuyCategories: `${BaseUrl}/easybuy/categories`,
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
  getInstallmentPlans: `${BaseUrl}/easybuy/buyer/calculate-installment`,
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

//Wallet

export const WalletEndpoints = {
  depositFund: `${BaseUrl}/wallet/deposit`,
  withdrawFund: `${BaseUrl}/wallet/transfer`,
  getWalletBalance: `${BaseUrl}/wallet/get-wallet-balance`,
  verifyBvn: `${BaseUrl}/wallet/verify-customer`,
  getDva: `${BaseUrl}/user/dva`,
  getbanklist: `${BaseUrl}/wallet/transfer/list-banks`,
  verifyCustomerAccount: `${BaseUrl}/wallet/transfer/resolve-account`,
  getRecipients: `${BaseUrl}/wallet/recipients`,
};
