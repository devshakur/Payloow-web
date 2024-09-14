import React, { useState } from 'react';  
import ForgetPswd from './ForgetPswd'; 
import ResetPswd from './ResetPswd'; 
import ForgetPassWord from '../../../Utils/hooks';

function PasswordIssue() {  
  const [isForget, setIsForget] = ForgetPassWord()
  return (   
      <div>  
        {isForget ? <ForgetPswd /> : <ResetPswd />}  
      </div>  
  );  
}  

export default PasswordIssue;