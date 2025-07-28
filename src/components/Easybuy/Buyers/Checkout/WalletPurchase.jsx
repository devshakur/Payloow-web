import React, {startTransition, useEffect, useState} from 'react'
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from '../../../../hooks/useBills';
import { toast } from 'react-toastify';
import { useRouter } from '../../../../Routes/router';

const WalletPurchase = ({ handleModalWallet, fullPayment, walletLoading, SubmitCheckOutWallet}) => {
  const router = useRouter();
  const {GetUserBalance} = useBills();
   const [walletBalance, setWalletBalance] = useState('');
  const handleCheck = ()=>{
    if(fullPayment === 'full'){
       SubmitCheckOutWallet()
    
    }else {
      handleModalWallet()
    }
  }

  const GetWalletBalance = async () => {
   try {
     const resp = await GetUserBalance();
     const balanceString = resp?.data?.data?.balance?.["$numberDecimal"];
     if (balanceString !== undefined) {
       const balanceNumber = Number(balanceString);
       startTransition(()=>{
        setWalletBalance(balanceNumber);
       })
     } else {
       toast.error("Unable to retrieve wallet balance.");
     }
   } catch (error) {
     toast.error("Failed to fetch wallet balance");
   }
 };
  //fetch user balance
  useEffect(() => {

   GetWalletBalance();
   
  }, [])
  

  const formattedBalance =
    typeof walletBalance === "number"
      ? new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(walletBalance)
      : "₦0.00";
  return (
    <div className="">
    <div className="my-3">
     <div className="h-[70px] w-[95%] flex justify-between items-center">
       <div className="flex mx-1 gap-1">
         <div className="bg-[#F1F3F9] rounded-[50%] p-4">
           <Wallet size="24" color="#1D2433CC" />
         </div>
         <p className="mt-5 font-poppins font-normal text-sm leading-5">
           Wallet ({formattedBalance})
         </p>
       </div>
       <div onClick={()=>router.push('/dashboard')} className="mt-1 flex cursor-pointer items-center gap-1">
         <p className="font-plus-jakarta font-normal text-[#1E3DD7] text-sm leading-5">
           Fund wallet
         </p>
         <ArrowRight2 size="18" color="#1E3DD7" />
       </div>
     </div>
   </div>
   <div>
       <p className='font-plus-jakarta font-medium text-md text-[#1D2433]'>Your payment is secure. We use industry-standard SSL encryption to protect your personal information.</p>
   </div>
   <div className="flex gap-2 mt-4">
       <input type="checkbox" name="check" id="check" />
       <p className='font-plus-jakarta font-medium text-md text-[#1D2433]'>I have read and agree to the website terms and conditions *</p>
   </div>
   <div className='w-full flex justify-center my-5'>
       <button  onClick={handleCheck} className='w-[90%] bg-blue-700 py-2 rounded-md text-white'>{walletLoading ? 'Processing...' : 'Complete Checkout'}</button>
   </div>
 </div>
  )
}

export default WalletPurchase
