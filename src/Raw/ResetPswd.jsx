// import React from 'react'
// import { Button, TextField, Link } from '@mui/material'
// import { ArrangeHorizontal } from 'iconsax-react';
// import ForgetPassWord from '../../../Utils/customHooks';
// import ForgetPswd from './ForgetPswd';
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import useAuth from '../../../hooks/useAuth';

// function ResetPswd() {
// const [isForget, setIsForget] = ForgetPassWord();
//    const handleChange = ()=>{
//      setIsForget(!isForget);
//    } 
//  const {ResetPswd} = useAuth();
//    const formik = useFormik({
//     initialValues: {
//       email: '',
//       token: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Required'),
//       token: Yup.string()
//       .required('Required'),
//       password: Yup.string()
//       .required('Required')
//       .min(8, 'Password must be at least 8 characters')
//       .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//       .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//       .matches(/[0-9]/, 'Password must contain at least one number'),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const resp = await ResetPswd(values)
//         if(resp){
//          alert('reset successful')
//         }
//       } catch (error) {
//         console.error("Registration Error: ", error);
//         alert(error)
//       }
//       setSubmitting(false);
//     },
//   });


//   return (
//     <div>
//       {isForget ? (

//       <section className='w-[100vw] h-screen'>
//         <div className='w-full h-screen grid grid-cols-[1fr, 2fr] md:grid-flow-col'>
//           <div className='flex justify-start items-center'>
//             <img src="/images/forget.jpeg" style={{ width: "100%" }} alt="forget-pswd" />
//           </div>
//           <div className='text-center -mt-10 flex items-start flex-col md:justify-center'>
//             <h3 className='w-[100%] flex justify-center font-plus-jakarta font-extrabold text-[2rem] leading-tight my-4 -mx-2'>Reset Password</h3>
//             <form onSubmit={formik.handleSubmit}  className='w-[100%] flex flex-col justify-center gap-8'>
//               <div>
//                 <TextField id="standard-basic-1" type='text' name='email' sx={{ width: "60%" }} autoComplete='email' label="Email" variant="standard" {...formik.getFieldProps('email')} />
//               </div>
//               <div>
//                 <TextField id="standard-basic-2" sx={{ width: "60%" }} type='text' name='token' label="Token" variant="standard"  {...formik.getFieldProps('token')} />
//               </div>
//               <div>
//                 <TextField id="standard-basic-3" sx={{ width: "60%" }} type='password' autoComplete='current-password' name='password' label="New password" variant="standard"  {...formik.getFieldProps('password')} />
//               </div>
//               <div>
//                 <Button variant="contained" type='submit' sx={{ width: "60%" }}>Reset Password</Button>
//                 <div className='w-[100%] flex justify-center'>
//                   <div className=' h-9 w-9 rounded-lg border-2 border-[#FF8A65] mt-5'>
//                     <ArrangeHorizontal size="32" onClick={handleChange} color="#FF8A65" />
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//       ): <ForgetPswd />}

//     </div>
//   )
// }

// export default ResetPswd

