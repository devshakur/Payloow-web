import { createContext, useReducer } from "react"
import axiosInstance from "../axiosInterceptor"
import { InvestmentHandler } from "./InvestmentHandler"
import { InvestmentEndpoints } from "../../api/Endpoint"


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


    const GetIndustries = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.getIndustries)

            const result = response.data
            dispatch({ type: 'GETINDUSTRIES', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const GetBusinessStages = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.getBusinessStages)

            const result = response.data
            dispatch({ type: 'GETSTAGES', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const GetModels = async () => {
        try {
            const response = await axiosInstance.get(InvestmentEndpoints.getModels)

            const result = response.data
            dispatch({ type: 'GETMODELS', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

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

    const AddLoan = async (businessId, data) => {
        try {
            const url = InvestmentEndpoints.addLoan(businessId)
            const response = await axiosInstance.post(url, data)

            const result = response.data
            dispatch({ type: 'ADDLOAN', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

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
    const GetInvestmentRequest = async (business_id, data) => {
        try {
            const url = InvestmentEndpoints.getInvestmentRequest(business_id)
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

    const AcceptInvestmentRequest = async (investment_id) => {
        try {
            const url = InvestmentEndpoints.acceptRequest(investment_id)
            const response = await axiosInstance.patch(url)

            const result = response.data
            dispatch({ type: 'ACCEPTREQUEST', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    const DeclineInvestmentRequest = async (investment_id) => {
        try {
            const url = InvestmentEndpoints.declineRequest(investment_id)
            const response = await axiosInstance.patch(url)

            const result = response.data
            dispatch({ type: 'DECLINEREQUEST', payload: { user: result } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const object = { ...state, dispatch, CreateDebtorAccount, CreateInvestorAccount, CreateBusiness, GetIndustries, getBusinessInfo, ViewBusiness, AddLoan, GetBusinessStages, GetModels, InvestInBusiness, GetInvestmentRequest, GetLoanBusiness, getUserDetails, GetFilteredLoanBusiness, InvestorsInvestment, AcceptInvestmentRequest, DeclineInvestmentRequest, }

    return <InvestmentContext.Provider value={object}>{children}</InvestmentContext.Provider>

}
export { InvestmentProvider, InvestmentContext }