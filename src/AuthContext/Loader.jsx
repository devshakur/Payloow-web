import React from 'react'
import { BallTriangle } from 'react-loader-spinner'


export const Loader = () => {

  return (
    <div className='bg-[#0B1D33] h-screen flex justify-center items-center'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true} />
    </div>
  )
}

