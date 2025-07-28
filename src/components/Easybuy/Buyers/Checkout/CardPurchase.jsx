import React from 'react'

const CardPurchase = ({handleModal, fullPayment, loading, SubmitCheckOutFlutter}) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const handleCheck = (e)=>{
      e.preventDefault();
      if(fullPayment === 'full'){
        SubmitCheckOutFlutter()
      
      }else {
        handleModal()
      }
    }
  return (
    <form action="" className="w-full p-3 flex flex-col gap-3">
                             <div className="w-[97%] flex flex-col">
                                 <label htmlFor="name" className='font-medium pb-2 font-plus-jakarta text-lg'>Mobile Number</label>
                                 <input required type="text" placeholder='Mobile Number' className='pl-2 border shadow-lg py-5 bg-blue-100 rounded-md focus:outline-none' />
                             </div>
                           
                             <div>
                 <p className='font-plus-jakarta font-medium text-md text-[#1D2433]'>Your payment is secure. We use industry-standard SSL encryption to protect your personal information.</p>
             </div>
             <div className="flex gap-2 mt-4">
                 <input type="checkbox" name="check" id="check" />
                 <p className='font-plus-jakarta font-medium text-md text-[#1D2433]'>I have read and agree to the website terms and conditions *</p>
             </div>
             <div className='w-full flex justify-center my-5'>
                 <button  onClick={handleCheck} className='w-[90%] bg-yellow-500 py-4 rounded-md  text-white'>{loading ? 'Processing...' : 'Pay With PayStack...'}</button>
             </div>
                         </form>
  )
}

export default CardPurchase
