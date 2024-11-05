import React from 'react'
import '../../auth.css'

const PinSuccess = () => {
	const goToDashboard = () => {
		window.location.href = '/dashboard'
	}
	return (
		<div className='bg h-[100vh] flex justify-center p-5'>
			<div className='vectors'>
				<div className='flex justify-center items-center'>
					<main className='w-full md:w-[600px] bg-[#FFFFFF] shadow-md rounded-lg'>
						<section className=' w-auto mx-5 my-5'>
							<div className='w-[100%] flex justify-center md:justify-center'>
								<img src="./images/success.png" alt="success-logo" />
							</div>
							<div className='flex justify-center my-5'>
								<p className='font-poppins text-lg font-[550] leading-6 text-[#1D2433] my-4 text-center'>Your transaction code has been successfully set up.</p>
							</div>
							<div className='flex justify-center flex-col lg:flex-row lg:gap-5 my-4'>
								<button onClick={goToDashboard} type='button' className="p-3  w-[95%]  font-poppins font-semibold text-lg my-3 rounded-lg bg-blue-500 text-white">
									Continue to Dashboard
								</button>
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	)
}

export default PinSuccess
