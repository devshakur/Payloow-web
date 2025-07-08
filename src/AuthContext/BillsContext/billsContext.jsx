import { createContext, useReducer } from "react"
import {  BillsHandler } from "../BillsContext/billsHandler"
import axios from 'axios'
import axiosInstance from "../axiosInstance"
import { BillsEndpoints, WalletEndpoints } from "../../api/Endpoint"


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

       const SetPins = async (data) => {
        try {
            const response = await axiosInstance.post(BillsEndpoints.setPin, data)
            const result = response.data
            return response;
        } catch (error) {
            console.error(error);
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

       const UserDetails = async()=>{
        try {
            const response = await axiosInstance.get(BillsEndpoints.getUserDetails)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }

          const DepositFund = async(data)=>{
        try {
            const response = await axiosInstance.post(WalletEndpoints.depositFund, data)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }
        const WithdrawFund = async(data)=>{
        try {
            const response = await axiosInstance.post(WalletEndpoints.withdrawFund, data)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }

          const GetUserBalance = async()=>{
        try {
            const response = await axiosInstance.get(WalletEndpoints.getWalletBalance)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }

       const GetDva = async()=>{
        try {
            const response = await axiosInstance.get(WalletEndpoints.getDva)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }
       const VerifyBvn = async(data)=>{
        try {
            const response = await axiosInstance.post(WalletEndpoints.verifyBvn, data)
            const result = response.data
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
       }
   


    const object = { ...state, dispatch, BuyAirtime, BuyData, BuyElectricity, VerifyBvn, BuyTvSubscription, GetUserBalance, UserBalance, DepositFund, WithdrawFund, SetPins, ConfirmPin, UserDetails, GetDva,  }

    return <BillsContext.Provider value={object}>{children}</BillsContext.Provider>
}
export {BillsProvider, BillsContext}