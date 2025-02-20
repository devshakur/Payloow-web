import React from 'react'

const RegisterHeaders = ({ currentIndex }) => {
    return (
        <div className='mt-6'>
            {!currentIndex ? <><h4 className='flex justify-center font-sans text-2xl font-medium text-primary-text'>Create New Account</h4>
                <h6 className='flex justify-center text-lg font-plus-jakarta font-medium text-primary-text'>Enter your basic information</h6></> : 
                <>
                <h4 className='flex justify-center font-plus-jakarta text-xl font-medium text-primary-text'>Create New Account</h4>
              <h6 className='flex justify-center text-lg font-plus-jakarta font-medium text-primary-text'>Address and Additional Information</h6>
                </>
                }
        </div>
    )
}

export default RegisterHeaders
