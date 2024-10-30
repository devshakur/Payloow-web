import React, { useState } from "react";
import { endpoints } from "../api/Endpoint";
import axios from 'axios'

 const ForgetPassWord = ()=> { //custom hooks
   const [isForget, setIsForget] = useState(true);  
   return [isForget, setIsForget];  
} 

export const goBack = ()=>{
  history.back();
}

export default ForgetPassWord;

export const restrictInput = (e)=>{
    if (e.target.value.length > 1) {  
      e.target.value = e.target.value.slice(0, 1); 
    }  
 
}

export const getUser = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('auth')).auth;
    console.log(token);
    const response = await axios.get(endpoints.getCurrentUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data

  } catch (error) {
    console.error('Failed to fetch user data');
  }
}