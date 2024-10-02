// import React from 'react'
// import { Button, TextField } from '@mui/material'
// import { ArrangeHorizontal } from 'iconsax-react';
// import ForgetPassWord from '../../../Utils/customHooks';
// import ResetPswd from '../../../Raw/ResetPswd';
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import useAuth from '../../../hooks/useAuth';
// import { useRouter } from '../../../Routes/router';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ForgetPswd() {
// const [isForget, setIsForget] = ForgetPassWord();
// const router = useRouter();
//   const handleChange = ()=>{
//     setIsForget(!isForget);
//   } 
//   const {ForgetPswd} = useAuth();

//   const formik = useFormik({
//     initialValues: {
//         email: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Required'), 
//     }),

//     onSubmit:  async (values, { setSubmitting }) => {    
//         try {  
//           const response = await ForgetPswd(values)
//           if (response) {
//             toast.success('Password Generated Check your Email')
//             setTimeout(() => {
//                 router.reload();

//             }, 6000);
//         }
//         } catch (error) {  
//           if(error.response.status === 400){
//             toast.error('Email not Found')
//           }
//         }  
//         setSubmitting(false);  
//       },
//   })
    

//   return (
//     <div>
//       {isForget ? (
//       <section className='w-[100vw] h-screen'>
//         <div className='w-full h-screen '>
//           <div className='text-center -mt-10 flex items-start flex-col md:justify-center'>
//             <h3 className='w-[100%] flex justify-center font-plus-jakarta font-extrabold text-[2rem] leading-tight my-4 -mx-5'>Forgot Password ?</h3>
//             <form onSubmit={formik.handleSubmit} className='w-[100%] flex flex-col justify-center gap-6'>
//               <div>
//                 <TextField type='email' autoComplete='username'  {...formik.getFieldProps('email')} id="standard-basic" sx={{ width: "60%" }} label="Your Email" variant="standard" />
//                 {formik.touched.email && formik.errors.email ? (
//             <div>{formik.errors.email}</div>
//           ) : null}
//               </div>
//               <div>
//                 <Button variant="contained" type='submit' sx={{ width: "60%" }}>Get Password</Button>
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
        
//       ): <ResetPswd /> }
//     </div>
//   )
// }

// export default ForgetPswd
