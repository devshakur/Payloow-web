// import React, { useState } from 'react';  
// import './auth.css';  
// import { ArrowLeft } from 'iconsax-react';  
// import Register from './Auth-section/Register';  
// import Login from './Auth-section/Login';  
// import { goBack } from '../../Utils/customHooks';  

// function Auth() {  
//   const [isLogin, setIsLogin] = useState(true);  

//   const handleToggle = (isLogin) => {  
//     setIsLogin(isLogin);  
//   };  

//   return (  
//     <div className='bg overflow-y-auto h-screen'>  
//       <section className='w-[100vw] text-center flex justify-center items-center font-plus-jakarta '>  
//         <div className='w-[100%] max-w-xl h-[100vh]'>  
//           <div className='flex justify-center'>  
//             {/* Form container */}  
//             <div className='w-[100%]'>  
//               {isLogin ? (  
//                 <h2 className='text-[24px] text-white text-center font-bold leading-[7rem] font-plus-jakarta'>  
//                  LOGIN
//                 </h2>  
//               ) : (  
//                 <h2 className='text-[24px] text-center text-white font-bold leading-[7rem] font-plus-jakarta'>  
//                      SIGN_UP  
//                 </h2>  
//               )}  

//               <div className='w-[100%] flex justify-center relative'>  
//                 <ul className='w-[60%] -mt-3 flex justify-between py-2 rounded-2xl border-[#3b82f6] border-2'>  
//                   <span  
//                     className={`absolute top-[-10px] transition-all duration-300 bg-custom-gradient rounded-2xl h-10 
//                       ${isLogin ? 'left-[20%]' : 'right-[20%]'}`}  
//                     style={{ width: '23%' }} 
//                   />  
//                   <input  
//                     type='radio'  
//                     id='Login'  
//                     name='auth'  
//                     checked={isLogin}  
//                     onChange={() => handleToggle(true)}  
//                     className='hidden'  
//                   />  
//                   <label  
//                     className={`ml-3 font-bold cursor-pointer z-10 ${isLogin ? 'text-white' : 'text-black'}`}  
//                     htmlFor='Login'  
//                   >  
//                     LOGIN  
//                   </label>  
//                   <input  
//                     type='radio'  
//                     id='SignUp'  
//                     name='auth'  
//                     checked={!isLogin}  
//                     onChange={() => handleToggle(false)}  
//                     className='hidden'  
//                   />  
//                   <label  
//                     className={`mr-3 font-bold cursor-pointer z-10 ${isLogin ? 'text-black' : 'text-white'}`}  
//                     htmlFor='SignUp'  
//                   >  
//                     SIGNUP  
//                   </label>  
//                 </ul>  
//               </div>  
//               {isLogin ?  <Login /> : <Register /> }  
//             </div>  
//           </div>  
//         </div>  
//       </section>  
//     </div>  
//   );  
// }  

// export default Auth;



