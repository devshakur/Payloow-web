import { createContext, useReducer } from "react"
import {  BillsHandler } from "../BillsContext/billsHandler"
import axios from 'axios'
import axiosInstance from "../axiosInstance"
import { BillsEndpoints } from "../../api/Endpoint"


const initial = {
    user: null
}

const reducer = (state, action) => {
    return BillsHandler[action.type] ? BillsHandler[action.type](state, action) : state
}

const BillsContext = createContext()
const BillsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial)
    const BuyAirtime = async (data) => {
        try {
            const response = await axiosInstance.post(BillsEndpoints.airtime, data)

            const purchase = response.data
            dispatch({ type: 'AIRTIME', payload: { user: purchase } })
             return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
         }

    const BuyData = async (data) =>{
     try{
         const response = await axiosInstance.post(BillsEndpoints.data, data)
         const purchase = response.data
         dispatch({ type: 'DATA', payload: {user: purchase}})
         return response;
     } catch(error) {
         console.error(error)
         throw error;
     }
    }

    
    const BuyElectricity = async (data) =>{
        try{
            const response = await axiosInstance.post(BillsEndpoints.electricity, data)
            const purchase = response.data
            dispatch({ type: 'DATA', payload: {user: purchase}})
            return response;
        } catch(error) {
            console.error(error)
            throw error;
        }
       }

       const BuyTvSubscription = async (data) =>{
        try{
            const response = await axiosInstance.post(BillsEndpoints.subscription, data)
            const purchase = response.data
            dispatch({ type: 'DATA', payload: {user: purchase}})
            return response;
        } catch(error) {
            console.error(error)
            throw error;
        }
       }

       const UserBalance = async()=>{
        try {
            const response = await axiosInstance.get(BillsEndpoints.balance)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }
   
       const ConfirmPin = async (data) =>{
        try{
            const response = await axiosInstance.post(BillsEndpoints.confirm, data)
            const purchase = response.data
            return response;
        } catch(error) {
            console.error(error)
            throw error;
        }
       }
   


    const object = { ...state, dispatch, BuyAirtime, BuyData, BuyElectricity, BuyTvSubscription, UserBalance, ConfirmPin  }

    return <BillsContext.Provider value={object}>{children}</BillsContext.Provider>
}
export {BillsProvider, BillsContext}