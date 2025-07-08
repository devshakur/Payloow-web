import { createContext, useReducer } from "react"
import { AuthHandler } from "./authHandler"
import axios from 'axios'
import { AuthEndPoints } from "../api/Endpoint"


const initial = {
    user: null
}

const reducer = (state, action) => {
    return AuthHandler[action.type] ? AuthHandler[action.type](state, action) : state
}

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial)
    const LoginUser = async (data) => {
        try {
            const response = await axios.post(AuthEndPoints.login, data)

            const user = response.data
            dispatch({ type: 'LOGIN', payload: { user } })
             return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const RegisterUser = async (data) => {
        try {
            const response = await axios.post(AuthEndPoints.register, data)

            const user = response.data
            dispatch({ type: 'REGISTER', payload: { user } })
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const GetUser = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('auth')).auth;
			
			
			const response = await axios.get(AuthEndPoints.getUser, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			
			localStorage.setItem('currentUser', JSON.stringify(response.data.data));
			return response.data.data

		} catch (error) {
			toast.error('An error occured while fetching user data')
		}
	}

   

     const ForgetPswd = async (data)=> {
        try {
            const response = await axios.post(AuthEndPoints.forget, data)

           const user = response.data
           dispatch({type: 'FORGET_PSWD', payload: { user }}) 
           return response;
        }catch (error) {
            console.error(error);
            throw error;
        } 
    }

    const ResetPswd = async (email, code, password)=> {
        try {
            const data = {email, code, password}
            console.log(data);
            const response = await axios.post(AuthEndPoints.reset, data)

           const user = response.data
           dispatch({type: 'RESET_PSWD', payload: { user }}) 
           return response;
        }catch (error) {
            console.error(error);
            throw error;
        } 
    }
    const object = { ...state, dispatch, LoginUser, RegisterUser, ForgetPswd, ResetPswd, GetUser }

    return <AuthContext.Provider value={object}>{children}</AuthContext.Provider>
}
export {AuthProvider, AuthContext}