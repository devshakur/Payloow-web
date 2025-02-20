import React from 'react'

const DefaultProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const DefaultValue = `${currentUser.firstName[0] + '' + '' + currentUser.lastName[0]}`
    const result = DefaultValue.toLocaleUpperCase()
  return (
    <div className='h-8 w-8 rounded-full bg-gray-400 flex justify-center items-center'>
      <h3 className='font-plus-jakarta font-medium text-sm '>{result}</h3>
    </div>
  )
}

export default DefaultProfile
