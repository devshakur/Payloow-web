import React, { useState } from "react";

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