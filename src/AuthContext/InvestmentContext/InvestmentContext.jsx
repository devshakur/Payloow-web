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
            const response = await axiosInstance.post(InvestmentEndpoints.createDebtor, data)

            const result = response.data
            dispatch({ type: 'CREATEDEBTOR', payload: { user: result } })
             return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
         }

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
                    const response = await axiosInstance.post(InvestmentEndpoints.createBusiness, data)
        
                    const result = response.data
                    dispatch({ type: 'CREATEBUSINESS', payload: { user: result } })
                     return response;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                 }
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

         const object = { ...state, dispatch, CreateDebtorAccount, CreateInvestorAccount, CreateBusiness, GetIndustries, ViewBusiness  }

         return <InvestmentContext.Provider value={object}>{children}</InvestmentContext.Provider>

}
export {InvestmentProvider, InvestmentContext}