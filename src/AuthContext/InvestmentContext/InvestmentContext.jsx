import { createContext, useReducer } from "react"
import axiosInstance from "../axiosInterceptor"
import { InvestmentHandler } from "./InvestmentHandler"
import { EasyBuyEndpoints, InvestmentEndpoints } from "../../api/Endpoint"


const initial = {
    user: null
}

const reducer = (state, action) => {
    return InvestmentHandler[action.type] ? InvestmentHandler[action.type](state, action) : state
}

const InvestmentContext = createContext()
const InvestmentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial)

    const CreateDebtorAccount = async (data) => {
        try {
            // Make the POST request with FormData (data will be a FormData object)
            const response = await axiosInstance.post(InvestmentEndpoints.createDebtor, data);

            const result = response.data;
            dispatch({ type: 'CREATEDEBTOR', payload: { user: result } });

            return response; // Return the response for further handling
        } catch (error) {
            console.error(error);
            throw error; // Propagate the error to handle it elsewhere if needed
        }
    };


    const CreateInvestorAccount = async (data) => {
        try {
            const response = await axiosInstance.post(InvestmentEndpoints.createInvestor, data)

            const result = response.data
            dispatch({ type: 'CREATEINVESTOR', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const CreateBusiness = async (data) => {
        try {
            const formData = new FormData();

            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {

                    data[key].forEach(file => {
                        formData.append(key, file);
                    });
                } else {

                    formData.append(key, data[key]);
                }
            });

            // Sending data as a multipart/form-data
            const response = await axiosInstance.post(InvestmentEndpoints.createBusiness, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const result = response.data;
            dispatch({ type: 'CREATEBUSINESS', payload: { user: result } });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


   

    const ViewBusiness = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.viewBusiness)
            const result = response.data
            dispatch({ type: 'VIEWBUSINESS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getBusinessInfo = async (business_id) => {
        try {
            const url = InvestmentEndpoints.getBusinessInfo(business_id)
            const response = await axiosInstance.get(url)

            const result = response.data
            dispatch({ type: 'GETBUSINESSINFO', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const getUserDetails = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.getUser)

            const result = response.data
            dispatch({ type: 'GETUSER', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

  const AddLoan = async (formData) => {
  try {
    const url = InvestmentEndpoints.addLoan; // remove businessId from here since it's in formData
    const response = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = response.data;
    dispatch({ type: 'ADDLOAN', payload: { user: result } });

    return response;
  } catch (error) {
    console.error("AddLoan error:", error);
    throw error;
  }
};


    const InvestInBusiness = async (data) => {
        try {
            const response = await axiosInstance.post(InvestmentEndpoints.investInBusiness, data)
            const result = response.data
            dispatch({ type: 'INVEST', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetInvestmentRequest = async () => {
        try {
            const url = InvestmentEndpoints.getInvestorsRequest
            const response = await axiosInstance.get(url)

            const result = response.data
            dispatch({ type: 'GETLOANREQUEST', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    const GetLoanBusiness = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.getLoanBusiness)

            const result = response.data
            dispatch({ type: 'GETLOANBUSINESS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const GetFilteredLoanBusiness = async (industry) => {
        try {

            const response = await axiosInstance.get(`${InvestmentEndpoints.getLoanBusiness}?industry=${industry}`);

            const result = response.data;

            dispatch({ type: 'GETLOANBUSINESS', payload: { user: result } });

            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const InvestorsInvestment = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.getInvestorsInvestment)
            const result = response.data
            dispatch({ type: 'INVESTORINVESTMENT', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // const AcceptInvestmentRequest = async (investment_id) => {
    //     try {
    //         const url = InvestmentEndpoints.acceptRequest(investment_id)
    //         const response = await axiosInstance.patch(url)

    //         const result = response.data
    //         dispatch({ type: 'ACCEPTREQUEST', payload: { user: result } })
    //         return response;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }


    // const DeclineInvestmentRequest = async (investment_id) => {
    //     try {
    //         const url = InvestmentEndpoints.declineRequest(investment_id)
    //         const response = await axiosInstance.patch(url)

    //         const result = response.data
    //         dispatch({ type: 'DECLINEREQUEST', payload: { user: result } })
    //         return response;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }

  const AcceptOrDeclineInvestment = async (investmentId, status) => {
  try {
    const url = InvestmentEndpoints.acceptOrDecline(investmentId);
    const response = await axiosInstance.post(url, { status }); // status: 'accept' or 'decline'

    const result = response.data;
    dispatch({ type: 'UPDATE_REQUEST_STATUS', payload: { user: result } });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const RepayInvestmentRequest = async (investmentId, payload) => {
  const url = InvestmentEndpoints.repayInvestment(investmentId);

  return await axiosInstance.post(url, payload);
};







  
    const CreateBuyerProfile = async (data) => {
        try {
            const response = await axiosInstance.post(EasyBuyEndpoints.createProfile, data)
            const result = response.data
            dispatch({ type: 'BUYERPROFILE', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const AddToCart = async (data) => {
        try {
            const response = await axiosInstance.post(EasyBuyEndpoints.addToCart, data)
            const result = response.data
            dispatch({ type: 'ADDTOCART', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const DeleteCart = async (data) => {
        try {
            const response = await axiosInstance.delete(EasyBuyEndpoints.deleteFromCart, {data})
            const result = response.data
            dispatch({ type: 'ADDTOCART', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const GetCart = async ()=> {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getCart)
            const result = response.data
            dispatch({ type: 'GETCART', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const FetchAllProduct = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.fetchAllProduct)
            const result = response.data
            dispatch({ type: 'FETCHPRODUCTS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetEasyBuyCatgories = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getEasyBuyCategories)
            const result = response.data
            dispatch({ type: 'GETCATEGORY', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const ValidateCoupon = async (data) => {
        try {
            const response = await axiosInstance.post(EasyBuyEndpoints.checkCoupon, data)
            const result = response.data
            dispatch({ type: 'VALIDATECOUPON', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const CreateProduct = async (data) => {
        try {
            const formData = new FormData();

            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {

                    data[key].forEach(file => {
                        formData.append(key, file);
                    });
                } else {

                    formData.append(key, data[key]);
                }
            });

            // Sending data as a multipart/form-data
            const response = await axiosInstance.post(EasyBuyEndpoints.createProduct, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const result = response.data;
            dispatch({ type: 'CREATEPRODUCT', payload: { user: result } });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const GetDeliveryInfo = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.GetDeliveryInfo)
            const result = response.data
            dispatch({ type: 'GETCATEGORY', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const checkOut = async (data) => {
        try {
            console.log(data);
            const response = await axiosInstance.post(EasyBuyEndpoints.checkOut, data)
            const result = response.data
            console.log(result);
            dispatch({ type: 'CHECKOUT', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const swapProduct = async (data) => {
        try {
            const formData = new FormData();

            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {

                    data[key].forEach(file => {
                        formData.append(key, file);
                    });
                } else {

                    formData.append(key, data[key]);
                }
            });

            // Sending data as a multipart/form-data
            const response = await axiosInstance.post(EasyBuyEndpoints.swapProduct, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const result = response.data;
            dispatch({ type: 'SWAPPRODUCT', payload: { user: result } });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const GetUserOrders = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getUserOrders)
            const result = response.data
            dispatch({ type: 'GETORDERS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetUInstallmentOrders = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getInstallmentOrders)
            const result = response.data
            dispatch({ type: 'GETINSTALLMENTORDERS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetSolarStock = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getTotalSolarStock)
            const result = response.data
            dispatch({ type: 'GETSOLARSTOCK', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetInventoryOrders = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getInventoryOrders)
            const result = response.data
            dispatch({ type: 'GETORDER', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetProductInventory = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getProductInventory)
            const result = response.data
            dispatch({ type: 'GETPRODUCTINVENTORY', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetActiveCustomers = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getActiveCustomer)
            const result = response.data
            dispatch({ type: 'GETACTIVECUSTOMER', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const CreateServiceCenter = async (data) => {
        try {
            const response = await axiosInstance.post(EasyBuyEndpoints.createServiceCenter, data)
            const result = response.data
            dispatch({ type: 'CREATESERVICECENTER', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetServiceCenter = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getServiceCenter)
            const result = response.data
            dispatch({ type: 'GETCENTER', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetPartnerCustomers = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getPartnerCustomers)
            const result = response.data
            dispatch({ type: 'GETCUSTOMERS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetPercentage = async () => {
        try {
            const response = await axiosInstance.get(EasyBuyEndpoints.getPercentages)
            const result = response.data
            dispatch({ type: 'GETPERCENTAGE', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const DeleteEasyBuyCart = async () => {
        try {
            const response = await axiosInstance.delete(EasyBuyEndpoints.deleteAllCartItem)
            const result = response.data
            dispatch({ type: 'DELETECART', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const SubmitInstallmentPlanRequest = async ({ totalAmount, installmentPlan, numberOfInstallments }) => {
  try {
    const payload = {
      totalAmount,
      installmentPlan,
      numberOfInstallments,
    };

    const response = await axiosInstance.post(EasyBuyEndpoints.getInstallmentPlans, payload);

    const result = response.data;
    dispatch({ type: 'INSTALLMENT_PLAN_SUBMITTED', payload: { data: result } });

    return response;
  } catch (error) {
    console.error("Installment plan submission failed:", error);
    throw error;
  }
};

    const object = {
        ...state, dispatch, CreateDebtorAccount, CreateInvestorAccount, CreateBusiness,  getBusinessInfo,
        ViewBusiness, AddLoan, 
        InvestInBusiness, GetInvestmentRequest, GetLoanBusiness, getUserDetails, GetFilteredLoanBusiness, InvestorsInvestment,
        AcceptOrDeclineInvestment, RepayInvestmentRequest, CreateBuyerProfile, AddToCart,
        FetchAllProduct, ValidateCoupon, DeleteCart, GetCart, GetEasyBuyCatgories, CreateProduct, GetDeliveryInfo, checkOut, swapProduct, GetPercentage, DeleteEasyBuyCart,
        GetUserOrders, GetUInstallmentOrders, GetSolarStock, GetInventoryOrders, SubmitInstallmentPlanRequest,  GetProductInventory,GetActiveCustomers, CreateServiceCenter, GetServiceCenter, GetPartnerCustomers,
    }

    return <InvestmentContext.Provider value={object}>{children}</InvestmentContext.Provider>

}
export { InvestmentProvider, InvestmentContext }