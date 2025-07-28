

import React, { useState, useEffect } from "react";
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from "../../../hooks/useBills";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ConfirmPurchase = ({ active, setActive, formik }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
   const navigate = useNavigate();

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
    if (network === "MTN") {
      setImage("./images/mtn.jpg");
    } else if (network === "AIRTEL") {
      setImage("./images/airtel.jpg");
    } else if (network === "GLO") {
      setImage("./images/usedglo.png");
    } else if (network=== "9MOBILE") {
      setImage("./images/9mobile.png");
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    switchImage();
  }, [network]);

  return (
    <div className="grid items-center justify-center w-full">
      <div className="w-screen flex justify-center items-center lg:ml-[8rem]">
        <div className="w-full mx-4 md:w-[500px] lg:h-auto lg:-mt-10 bg-white space-y-3  pb-6 shadow-2xl rounded-lg">
          <h4 className="text-center text-lg font-bold font-plus-jakarta mt-2">
            Confirm Airtime Purchase
          </h4>
          <h6 className="text-center text-blue-600 font-semibold text-[20px] font-plus-jakarta">
            {amount}
          </h6>

          <section className="w-[95%] mx-auto mt-6">
            <div className="flex justify-between items-center mb-2">
              <h6 className="font-semibold text-[#1D2433CC]">Airtime</h6>
              <div className="flex items-center gap-2">
                <img src={image} className="w-6 h-6" alt="network-img" />
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
              <div className="flex cursor-pointer items-center gap-1 text-sm text-[#1E3DD7]">
                <p>Fund wallet</p>
                <ArrowRight2 size="18" color="#1E3DD7" onClick={()=>navigate('/dashboard')} />
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
                className="border border-gray-600 shadow-lg border-none focus:outline-none p-3 rounded-lg text-[16px]"
              />
             <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-full lg:w-[50%] p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>

             </div>
            </form>
            <Toaster />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchase;
