import React from 'react'
import { RotatingLines } from 'react-loader-spinner'


export const Loader = () => {

  return (
    <div className='bg-[#0B1D33] h-screen flex justify-center items-center'>
      <RotatingLines
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

// import { RotatingLines } from "react-loader-spinner";

// function Loader() {
//   return (
//     <RotatingLines
//       strokeColor="grey"
//       strokeWidth="5"
//       animationDuration="0.75"
//       width="96"
//       visible={true}
//     />
//   )
// }
