// import React, { useState, useEffect } from "react";
// import { Wallet, ArrowRight2 } from "iconsax-react";
// import useBills from "../../../hooks/useBills";
// import { Toaster, toast } from 'react-hot-toast';
// import "react-toastify/dist/ReactToastify.css";

// const ConfirmPurchase = ({ active, setActive, formik }) => {
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [pin, setPin] = useState('');
//   const [balances, setBalances] = useState(0)
//   const [userBalance, setUserBalance] = useState(0)
//   const { BuyAirtime, UserBalance, ConfirmPin, UserDetails, } = useBills();

//   const { phone, network_id, amount, pin } = formik.values;
//   useEffect(() => {
//     const fetchBalance = async () => {
//         const response = await UserBalance();
//         const fetchedBalance = parseFloat(response.data.data.balance.$numberDecimal);
//         setUserBalance(fetchedBalance);  
//     };

//     fetchBalance();
// }, []); 

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const cleanedAmount = amount.replace("₦", "").replace(",", "");
//   const variation = network_id.toLowerCase(); 

//   const data = {
//     request_id: Date.now().toString(),
//     phone,
//     amount: Number(cleanedAmount),
//     pin: pin,
//   };

//   try {
//     const response = await UserBalance();
//     const balance = parseFloat(response.data.data.balance.$numberDecimal);

//     setBalances(balance);

//     const amountValue = parseFloat(data.amount);

//     if (balance >= amountValue) {
//       const pinValue = { pin };

//       try {
//         const pinResponse = await ConfirmPin(pinValue);

//         if (pinResponse?.data?.success) {
//           try {
//             const airtimeResponse = await BuyAirtime(data, variation);

//             if (airtimeResponse?.data?.success) {
//               setActive("page3");
//             } else {
//               toast.error("Airtime purchase failed. Please try again.");
//               setLoading(false);
//               setTimeout(() => {
//                 setActive("page4");
//               }, 2000);
//             }
//           } catch (airtimeError) {
//             console.error("Airtime purchase error:", airtimeError);
//             toast.error("Airtime purchase failed. Please try again.");
//             setLoading(false);
//             setTimeout(() => {
//               setActive("page4");
//             }, 2000);
//           }
//         } else {
//           toast.error("Invalid PIN. Please try again.");
//           setLoading(false);
//         }
//       } catch (pinError) {
//         console.error("PIN confirmation error:", pinError);
//         toast.error("Unable to confirm PIN. Please try again.");
//         setLoading(false);
//       }
//     } else {
//       toast.error("Insufficient balance. Kindly fund your wallet.");
//       setLoading(false);
//     }
//   } catch (error) {
//     toast.error("An error occurred. Please try again.");
//     setLoading(false);
//     setTimeout(() => {
//       setActive("page4");
//     }, 2000);
//   }
// };




//   const switchImage = () => {
//     if (network_id === "MTN") {
//       setImage("./images/mtn.jpg");
//     } else if (network_id === "Airtel") {
//       setImage("./images/airtel.jpg");
//     } else if (network_id === "Glo") {
//       setImage("./images/usedglo.png");
//     } else if (network_id === "etisalat") {
//       setImage("./images/9mobile.png");
//     } else {
//       setImage(null);
//     }
//   };

//   useEffect(() => {
//     switchImage();
//   }, [network_id]);

//   return (
//     <div className="grid items-center justify-center w-full">
//       <div className="w-screen flex justify-center lg:justify-center lg:-ml-[-10vw] 2xl:ml-[8vw]">
//         <div className="w-full mx-4 h-[500px] md:w-[530px] lg:h-[490px] lg:w-[600px] 2xl:w-[700px] bg-[#FFFFFF] pb-[20px] shadow-lg rounded-lg">
//           <h4 className="flex justify-center text-lg leading-7 font-plus-jakarta font-bold my-4">
//             Confirm Airtime Purchase
//           </h4>
//           <h6 className="flex justify-center font-semibold text-[20px] font-plus-jakarta leading-5 -mt-3">
//             {amount}
//           </h6>
//           <section className="h-[97px] w-[95%] mx-2 mt-9">
//             <div className="flex">
//               <h6 className="text-md w-[83%] font-plus-jakarta font-semibold text-[#1D2433CC]">
//                Airtime
//               </h6>
//               <div className="w-[70%] flex justify-end  ml-6">
//                 <img src={image} className="w-6 h-6" alt="" />
//                 <p className="text-[13px] font-medium font-poppins leading-5 mt-1 text-[#1D2433CC]">
//                   {network_id} Airtime.
//                 </p>
//               </div>
//             </div>
//             <div className="flex justify-between my-1">
//               <p className="text-md font-plus-jakarta font-semibold leading-5 mt-1 text-[#1D2433CC]">
//                 Amount
//               </p>
//               <p className="font-normal text-sm font-poppins leading-5 mr-8 text-[#1D2433CC]">
//                 {amount}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <p className=" text-md font-plus-jakarta font-semibold leading-5 text-[#1D2433CC]">
//                 Beneficiary
//               </p>
//               <p className="font-normal text-sm font-poppins leading-5  text-[#1D2433CC]">
//                 {phone}
//               </p>
//             </div>
//             <div className="flex justify-center">
//               <p className="w-[99%] border-2 mt-6 border-dashed"></p>
//             </div>
//             <div className="my-5">
//               <div className=" w-[99%] flex justify-between items-center">
//                 <div className="flex mx-1 gap-1">
//                   <div className="bg-[#F1F3F9] shadow-md rounded-[50%] p-4">
//                     <Wallet size="24" color="#1D2433CC" />
//                   </div>
//                   <p className="mt-5 font-poppins font-normal text-sm leading-5">
//                   Wallet (₦{userBalance || 0})
//                   </p>
//                 </div>
//                 <div className="mt-1 flex items-center gap-1">
//                   <p className="font-poppins font-normal text-[#1E3DD7] text-sm leading-5">
//                     Fund wallet
//                   </p>
//                   <ArrowRight2 size="18" color="#1E3DD7" />
//                 </div>
//               </div>
//             </div>
//             <form className="mx-3 flex flex-col" onSubmit={handleSubmit}>
//               <label
//                 htmlFor="pin"
//                 className="text-[#101928] text-[14px] font-semibold -pb-8"
//               >
//                Enter Your Pin<span className='text-red-700'>*</span>
//               </label>
//               <input
//                 id="outlined-required-5"
//                 placeholder="Enter pin"
//                 type="password"
//                 name="pin"
//                 required
//                 autoComplete="off"
//                 {...formik.getFieldProps("pin")}
//                 className="border-2 border-gray-300 shadow-md focus:outline-none p-3 w-[95%] rounded-lg text-[16px] pl-2"
//               />
//               <div className="flex justify-center w-[100%] my-5">
//                 <button
//                   type="submit"
//                   className="p-2 w-[45%] font-plus-jakarta my-3 rounded-lg bg-blue-500 text-white text-md"
//                 >
//                   {loading ? "Processing..." : "Confirm & pay"}
//                 </button>
//               </div>
//             </form>
//             <Toaster
//             />
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmPurchase;


// import React, { useState, useEffect } from "react";
// import { Wallet, ArrowRight2 } from "iconsax-react";
// import useBills from "../../../hooks/useBills";
// import { Toaster, toast } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";

// const ConfirmPurchase = ({ active, setActive, formik }) => {
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userBalance, setUserBalance] = useState(0);

//   const { BuyAirtime, UserBalance } = useBills();
//   const { phone, network, amount, transactionPin } = formik.values;

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const response = await UserBalance();
//       const fetchedBalance = parseFloat(response.data.data.balance.$numberDecimal);
//       setUserBalance(fetchedBalance);
//     };
//     fetchBalance();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const cleanedAmount = amount.replace("₦", "").replace(",", "");
//     const variation = network.toLowerCase();
//     const data = {
//       network,  
//       phone,
//       amount: Number(cleanedAmount),
//       transactionPin,
//     };

//     try {
//       const response = await UserBalance();
//       const balance = parseFloat(response.data.data.balance.$numberDecimal);
//       const amountValue = parseFloat(data.amount);

//       if (balance >= amountValue) {
//         try {
//           const airtimeResponse = await BuyAirtime(data, variation);
//           if (airtimeResponse?.data?.success) {
//             setActive("page3");
//           } else {
//             toast.error("Airtime purchase failed. Please try again.");
//             setTimeout(() => setActive("page4"), 2000);
//           }
//         } catch (error) {
//           console.error("Airtime purchase error:", error);
//           toast.error("Airtime purchase failed. Please try again.");
//           setTimeout(() => setActive("page4"), 2000);
//         }
//       } else {
//         toast.error("Insufficient balance. Kindly fund your wallet.");
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.");
//       setTimeout(() => setActive("page4"), 2000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const switchImage = () => {
//     switch (network) {
//       case "MTN":
//         setImage("./images/mtn.jpg");
//         break;
//       case "Airtel":
//         setImage("./images/airtel.jpg");
//         break;
//       case "Glo":
//         setImage("./images/usedglo.png");
//         break;
//       case "etisalat":
//         setImage("./images/9mobile.png");
//         break;
//       default:
//         setImage(null);
//     }
//   };

//   useEffect(() => {
//     switchImage();
//   }, [network_id]);

//   return (
//     <div className="grid items-center justify-center w-full">
//       <div className="w-screen flex justify-center lg:justify-center lg:-ml-[-10vw] 2xl:ml-[8vw]">
//         <div className="w-full mx-4 h-[500px] md:w-[530px] lg:h-[490px] lg:w-[600px] 2xl:w-[700px] bg-[#FFFFFF] pb-[20px] shadow-lg rounded-lg">
//           <h4 className="flex justify-center text-lg leading-7 font-plus-jakarta font-bold my-4">
//             Confirm Airtime Purchase
//           </h4>
//           <h6 className="flex justify-center font-semibold text-[20px] font-plus-jakarta leading-5 -mt-3">
//             {amount}
//           </h6>

//           <section className="h-[97px] w-[95%] mx-2 mt-9">
//             <div className="flex">
//               <h6 className="text-md w-[83%] font-plus-jakarta font-semibold text-[#1D2433CC]">Airtime</h6>
//               <div className="w-[70%] flex justify-end ml-6">
//                 <img src={image} className="w-6 h-6" alt="" />
//                 <p className="text-[13px] font-medium font-poppins leading-5 mt-1 text-[#1D2433CC]">
//                   {network_id} Airtime.
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-between my-1">
//               <p className="text-md font-plus-jakarta font-semibold leading-5 mt-1 text-[#1D2433CC]">Amount</p>
//               <p className="font-normal text-sm font-poppins leading-5 mr-8 text-[#1D2433CC]">{amount}</p>
//             </div>

//             <div className="flex justify-between">
//               <p className="text-md font-plus-jakarta font-semibold leading-5 text-[#1D2433CC]">Beneficiary</p>
//               <p className="font-normal text-sm font-poppins leading-5 text-[#1D2433CC]">{phone}</p>
//             </div>

//             <div className="flex justify-center">
//               <p className="w-[99%] border-2 mt-6 border-dashed"></p>
//             </div>

//             <div className="my-5">
//               <div className="w-[99%] flex justify-between items-center">
//                 <div className="flex mx-1 gap-1">
//                   <div className="bg-[#F1F3F9] shadow-md rounded-[50%] p-4">
//                     <Wallet size="24" color="#1D2433CC" />
//                   </div>
//                   <p className="mt-5 font-poppins font-normal text-sm leading-5">
//                     Wallet (₦{userBalance || 0})
//                   </p>
//                 </div>
//                 <div className="mt-1 flex items-center gap-1">
//                   <p className="font-poppins font-normal text-[#1E3DD7] text-sm leading-5">Fund wallet</p>
//                   <ArrowRight2 size="18" color="#1E3DD7" />
//                 </div>
//               </div>
//             </div>

//             <form className="mx-3 flex flex-col" onSubmit={handleSubmit}>
//               <label htmlFor="pin" className="text-[#101928] text-[14px] font-semibold -pb-8">
//                 Enter Your Pin<span className="text-red-700">*</span>
//               </label>
//               <input
//                 placeholder="Enter pin"
//                 type="password"
//                 name="pin"
//                 required
//                 autoComplete="off"
//                 {...formik.getFieldProps("transactionPin")}
//                 className="border-2 border-gray-300 shadow-md focus:outline-none p-3 w-[95%] rounded-lg text-[16px] pl-2"
//               />
//               <div className="flex justify-center w-[100%] my-5">
//                 <button
//                   type="submit"
//                   className="p-2 w-[45%] font-plus-jakarta my-3 rounded-lg bg-blue-500 text-white text-md"
//                 >
//                   {loading ? "Processing..." : "Confirm & pay"}
//                 </button>
//               </div>
//             </form>
//             <Toaster />
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmPurchase;

import React, { useState, useEffect } from "react";
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from "../../../hooks/useBills";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const ConfirmPurchase = ({ active, setActive, formik }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  const { BuyAirtime, UserBalance } = useBills();
  const { phone, network, amount, transactionPin } = formik.values;

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await UserBalance();
      const fetchedBalance = parseFloat(response.data.data.balance.$numberDecimal);
      setUserBalance(fetchedBalance);
    };
    fetchBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedAmount = amount.replace("₦", "").replace(",", "");
    const variation = network.toLowerCase();
    const data = {
      network,
      phone,
      amount: Number(cleanedAmount),
      transactionPin,
    };

    try {
      const response = await UserBalance();
      const balance = parseFloat(response.data.data.balance.$numberDecimal);
      const amountValue = parseFloat(data.amount);

      if (balance >= amountValue) {
        try {
          const airtimeResponse = await BuyAirtime(data, variation);
          if (airtimeResponse?.data?.success) {
            setActive("page3");
          } else {
            toast.error("Airtime purchase failed. Please try again.");
            setTimeout(() => setActive("page4"), 2000);
          }
        } catch (error) {
          console.error("Airtime purchase error:", error);
          toast.error("Airtime purchase failed. Please try again.");
          setTimeout(() => setActive("page4"), 2000);
        }
      } else {
        toast.error("Insufficient balance. Kindly fund your wallet.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setTimeout(() => setActive("page4"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const switchImage = () => {
    switch (network) {
      case "MTN":
        setImage("./images/mtn.jpg");
        break;
      case "Airtel":
        setImage("./images/airtel.jpg");
        break;
      case "Glo":
        setImage("./images/usedglo.png");
        break;
      case "etisalat":
        setImage("./images/9mobile.png");
        break;
      default:
        setImage(null);
    }
  };

  useEffect(() => {
    switchImage();
  }, [network]);

  return (
    <div className="grid items-center justify-center w-full">
      <div className="w-screen flex justify-center">
        <div className="w-full mx-4 h-auto md:w-[530px] lg:h-auto lg:w-[600px] 2xl:w-[700px] bg-white pb-6 shadow-lg rounded-lg">
          <h4 className="text-center text-lg font-bold font-plus-jakarta my-4">
            Confirm Airtime Purchase
          </h4>
          <h6 className="text-center font-semibold text-[20px] font-plus-jakarta -mt-3">
            {amount}
          </h6>

          <section className="w-[95%] mx-auto mt-6">
            <div className="flex justify-between items-center mb-2">
              <h6 className="font-semibold text-[#1D2433CC]">Airtime</h6>
              <div className="flex items-center gap-2">
                <img src={image} className="w-6 h-6" alt="" />
                <p className="text-sm font-medium text-[#1D2433CC]">{network} Airtime</p>
              </div>
            </div>

            <div className="flex justify-between mb-1">
              <p className="font-semibold text-[#1D2433CC]">Amount</p>
              <p className="text-sm text-[#1D2433CC]">{amount}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-semibold text-[#1D2433CC]">Beneficiary</p>
              <p className="text-sm text-[#1D2433CC]">{phone}</p>
            </div>

            <div className="flex justify-center my-5">
              <div className="w-full border-2 border-dashed"></div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#F1F3F9] rounded-full p-3">
                  <Wallet size="24" color="#1D2433CC" />
                </div>
                <p className="text-sm">Wallet (₦{userBalance || 0})</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#1E3DD7]">
                <p>Fund wallet</p>
                <ArrowRight2 size="18" color="#1E3DD7" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-sm font-semibold text-[#101928]">
                Enter Your Pin <span className="text-red-600">*</span>
              </label>
              <input
                placeholder="Enter pin"
                type="password"
                name="transactionPin"
                required
                autoComplete="off"
                {...formik.getFieldProps("transactionPin")}
                className="border border-gray-300 shadow-sm focus:outline-none p-3 rounded-lg text-[16px]"
              />

              <button
                type="submit"
                className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
            </form>
            <Toaster />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchase;
