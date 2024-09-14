import React, { useState } from "react";

 const ForgetPassWord = ()=> { //custom hooks
   const [isForget, setIsForget] = useState(true);  
   return [isForget, setIsForget];  
} 

export const goBack = ()=>{
  history.back();
}

export default ForgetPassWord;

