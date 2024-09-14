import React, { useState } from 'react'
import './auth.css'
import { ArrowLeft } from 'iconsax-react';
import Register from './Auth-section/Register';
import Login from './Auth-section/Login';
import { goBack } from '../../Utils/hooks';



function Auth() {
 const [isLogin, setIsLogin] = useState(true);
  
  const handleToggle = () => {  
    setIsLogin(!isLogin);   
  } 
  return (
    <div>
      <section className='w-[100vw] text-center flex justify-center font-plus-jakarta '>
        <div className='w-[100%] max-w-xl h-[100vh] overflow-y-auto'>
          <div className='bg'>
            <div className=' h-9 w-9 rounded-lg border-2 border-white my-11 mx-3'>
              <ArrowLeft onClick={goBack} size="32" color="#FFF" />
            </div>
            <div className='flex justify-center items-center'>
              <header className='h-[7.5rem] w-[7.5rem] bg-[#fff] rounded-3xl flex justify-center items-center'>
                <img src="/images/logo.png" alt="logo" />
              </header>
            </div>
            <div className='flex justify-center mt-9'>
              {/* form container */}
            <div className='w-[80%] h-fit pb-7 bg-[#FFF] rounded-[24px] shadow-md'>
              {isLogin ? <h2 className='text-[24px] text-center font-bold leading-[7rem] font-plus-jakarta'>Sign_Up</h2>  
              : 
              <h2 className='text-[24px] text-center font-bold leading-[7rem] font-plus-jakarta'>LOGIN</h2>}
            
            <div className='w-[100%] flex justify-center'>
            <ul className='w-[60%] -mt-3 flex justify-between py-2 rounded-2xl border-black border-2'>
            <span  
          className={`absolute bottom-[-2.9rem] transition-all duration-300 bg-custom-gradient rounded-2xl h-[10.4%]  
           ${isLogin ? 'right-[26%]'  : 'left-[26%]'}`}   
          style={{ width: '25%' }}  
        /> 
                  <input  
          type='radio'  
          id="Login"  
          name="auth"  
          onChange={() => handleToggle()}  
          className="hidden"  
        />  
        <label className={`ml-3 font-bold cursor-pointer z-10 ${isLogin ? 'text-black' : 'text-white'}`} htmlFor="Login">LOGIN</label>
        <input  
          type='radio'  
          id="SignUp"  
          name="auth"
          onChange={() => handleToggle()}  
          className="hidden" 
        />  
        <label className={`mr-3 font-bold cursor-pointer z-10 ${isLogin ? 'text-white' : 'text-black'}`} htmlFor="SignUp">SIGNUP</label>
            </ul>

            </div>
            {isLogin ? <Register /> : <Login /> }  
              

            </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Auth

