import React from 'react'

const RegisterHeaders = ({ currentIndex }) => {
    return (
        <div className='mt-6'>
            {!currentIndex ? <><h4 className='flex justify-center font-poppins text-2xl font-medium text-primary-text'>Let’s Get Started</h4>
                <h6 className='flex justify-center text-lg font-poppins font-medium text-primary-text'>Enter your basic Information</h6></> : 
                <>
                <h4 className='flex justify-center font-poppins text-2xl font-medium text-primary-text'>Create New Account</h4>
              <h6 className='flex justify-center text-lg font-poppins font-medium text-primary-text'>Address and Additional Information</h6>
                </>
                }
        </div>
    )
}

export default RegisterHeaders
