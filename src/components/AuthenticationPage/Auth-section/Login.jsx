import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../../hooks/useAuth'
import { useRouter } from '../../../Routes/router'
import 'react-toastify/dist/ReactToastify.css';
import '../auth.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { endpoints } from '../../../api/Endpoint'
import { toast, Toaster } from 'react-hot-toast'



function Login() {
	const { LoginUser } = useAuth()
	const router = useRouter();

	const getUser = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('auth')).auth;
			
			const response = await axios.get(endpoints.getCurrentUser, {
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

	const formik = useFormik({
		initialValues: {
			phone: '',
			password: ''
		},
		validationSchema: Yup.object({
			phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').required('Required'),
			password: Yup.string().required('Required')
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const response = await LoginUser(values)
				if (response) {
					toast.success('Login success! Your dashboard awaits.')
					const token = response.data.data.auth
					Cookies.set('authToken', token, { expires: 7 })
					localStorage.setItem('auth', JSON.stringify(response.data.data));
					localStorage.setItem('token', JSON.stringify(response.data.data.auth));
					const userData = await getUser(); 
					setTimeout(() => {
						const checkPin = userData.pin
						if(checkPin === false){ 
						 router.push('/set-pin'); 
						}else{
							router.push('/dashboard'); 
						}
					}, 2000);
				}
			} catch (error) {
				if (error.response) {
					if (error.response.status === 400) {
						toast.error('Wrong Password or Invalid Phone Number');
					} else {
						toast.error('An unexpected error occurred: ' + error.message);
					}
				} else if (error.request) {
					
					toast.error('Network error. Check your internet connection.');
				} else {
					
					toast.error('Error: ' + error.message);
				}
			}
			setSubmitting(false);
			}
		
	})


	return (
		<main className='bg h-screen w-screen overflow-y-auto'>
			<div className='vectors'>
				<div className='flex justify-center p-4 mt-9 items-center'>
					<span><img src="images/pay.png" alt="" /></span>
					<span ><img src="images/curve.png" className='h-9 relative right-8' alt="" /></span>
					<span><img src="images/angle.png" className='h-5 relative right-10 -top-8' alt="arrow" /></span>
					<span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3 relative right-12'>ayloow</span>
				</div>
				<div className='bg-white w-[90vw] h-[550px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col'>
					<h4 className='flex justify-center font-poppins text-2xl font-semibold text-primary-text'>Log in to your account </h4>
					<h6 className='flex justify-center text-lg font-poppins font-medium text-primary-text'>Welcome back to payloow</h6>
					<form onSubmit={formik.handleSubmit} className='grid gap-4 mt-8'>
						<div>
							<label htmlFor='phone' className='text-primary-text text-[14px] font-medium'>Phone Number</label>
							<input
								required
								id="outlined-required-3"
								placeholder='Mobile No.'
								type='phone'
								fullWidth
								{...formik.getFieldProps('phone')}
								className='input-field'
							/>
							{formik.touched.phone && formik.errors.phone ? (
								<div>{formik.errors.phone}</div>
							) : null}
						</div>

						<div>
							<label htmlFor='password' className='text-primary-text text-[14px] font-medium'>Password</label>
							<input
								required
								id="outlined-required-4"
								placeholder='password'
								type='password'
								fullWidth
								autoComplete='current-password'
								{...formik.getFieldProps('password')}
								className='input-field'
							/>
							{formik.touched.password && formik.errors.password ? (
								<div>{formik.errors.password}</div>
							) : null}
						</div>

						<button type="submit" disabled={formik.isSubmitting} className="h-[55px] bg-[#3369F4] rounded-lg p-4 text-white py-2">
							{formik.isSubmitting ? 'Verifying...' : 'Log in'}
						</button>
						<li className='flex justify-end font-poppins font-normal text-sm text-[#3369F4]'><a href="/forgot-password">forgot password</a></li>
					</form>
				
					<Toaster />
					<div className='mt-5'>
						<div className='flex justify-center items-center'>
							<span className='flex-grow h-px bg-[#e9ecef]'></span>
							<span className='mx-2 text-primary-text font-medium font-poppins text-lg leading-6'>OR</span>
							<span className='flex-grow h-px bg-[#e9ecef]'></span>
						</div>
					</div>
					<p className='flex justify-center mt-5'>Don’t have an account? <span className='ml-1 font-medium font-poppins text-[#3369F4]'><Link to={'/register'}> Register </Link></span></p>
				</div>
			</div>
		</main>
	)
}

export default Login
