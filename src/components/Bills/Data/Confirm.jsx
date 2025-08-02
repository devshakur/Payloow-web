import React, { useState, useEffect } from 'react';
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from '../../../hooks/useBills';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../AuthContext/axiosInstance';

const Confirm = ({ active, setActive, formik, selectedPlan, successResponse, setSuccessResponse }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const { BuyData, UserBalance } = useBills();
  const { phone, network, pin } = formik.values;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await UserBalance();
        const fetchedBalance = parseFloat(response.data.data.balance.$numberDecimal);
        setUserBalance(fetchedBalance);
      } catch (error) {
        toast.error("Failed to fetch wallet balance.");
      }
    };
    fetchBalance();
  }, []);

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedPlan?.amount) {
      toast.error('Invalid data plan selected. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const response = await UserBalance();
      const balance = parseFloat(response.data.data.balance?.$numberDecimal);

      if (balance >= Number(selectedPlan.amount)) {
        let dataResponse;

        if (network === "SMILE") {
          const smilePayload = {
            billersCode: "123456", // You might need to get this dynamically
            variation_code: selectedPlan.code,
            phone: phone,
            request_id: `2025071714389mobiledata${Math.floor(
              Math.random() * 100000
            )}`,
          };
          dataResponse = await axiosInstance.post(
            "/smile/smile-purchase",
            smilePayload
          );
        } else if (network === "SPECTRANET") {
          const spectranetPayload = {
            number: phone,
          };
          dataResponse = await axiosInstance.post(
            "/spectranet/spectranet-purchase",
            spectranetPayload
          );
        } else {
          const payload = {
            phone,
            transactionPin: pin,
            network: network?.toUpperCase(),
            planType: selectedPlan.planType,
            planId: String(selectedPlan.id),
            ported: false,
          };
          dataResponse = await BuyData(payload);
        }

        if (dataResponse?.data?.success) {
          setSuccessResponse(dataResponse?.data?.data?.data);
          setTimeout(() => {
            setActive('page3');
          }, 2000);
        } else {
          const msg =
            dataResponse?.data?.data?.data?.error?.[0] ||
            dataResponse?.data?.data?.message ||
            dataResponse?.data?.message ||
            'Data purchase failed. Please try again.';
          toast.error(msg);
          setTimeout(() => setActive('page4'), 2000);
        }
      } else {
        toast.error('Insufficient amount. Kindly fund your wallet');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error("Purchase error:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchImage = () => {
    const net = network?.toLowerCase();
    switch (net) {
      case "mtn":
        setImage("/images/mtn.jpg");
        break;
      case "airtel":
        setImage("/images/airtel.jpg");
        break;
      case "glo":
        setImage("/images/usedglo.png");
        break;
      case "etisalat":
      case "9mobile":
        setImage("/images/9mobile.png");
        break;
      case "smile":
        setImage("/images/smile.jpg");
        break;
      case "spectranet":
        setImage("/images/spectranet.png");
        break;
      default:
        setImage("/images/default.jpg");
        break;
    }
  };

  useEffect(() => {
    switchImage();
  }, [network]);

  return (
    <div className="grid lg:-mt-12 items-center">
      <div className="w-screen flex justify-center lg:ml-[8rem]">
        <div className="w-full mx-4 h-[500px] md:w-[530px] lg:h-[500px] space-x-3 bg-white  shadow-md rounded-md">
          <h4 className="flex justify-center text-lg font-poppins font-bold my-4 text-black">
            Confirm Data Purchase
          </h4>

          <h6 className="flex justify-center text-center text-blue-600 font-plus-jakarta font-medium text-[16px] text-[#1D2433] leading-5 -mt-3">
            {selectedPlan ? (
              ["SMILE", "SPECTRANET"].includes(network?.toUpperCase()) ? (
                `₦${selectedPlan?.amount} - Code: ${selectedPlan?.code}`
              ) : (
                `${selectedPlan?.size} - ₦${selectedPlan?.amount} (${selectedPlan?.validity})`
              )
            ) : (
              'No Plan Selected'
            )}
          </h6>

          <section className="h-[97px] w-[95%] mx-2 mt-9">
            <div className="flex">
              <h6 className="text-sm w-[83%] font-poppins font-semibold text-[#1D2433CC]">Product Name</h6>
              <div className="w-[70%] flex justify-end gap-3">
                <img src={image} className="w-6 h-6" alt="network" />
                <p className="text-sm font-semibold font-poppins leading-5 mt-1 text-[#1D2433CC]">
                  {network}_Bundles
                </p>
              </div>
            </div>

            <div className="flex justify-between my-1">
              <p className="text-[#1D2433CC] font-semibold">Package</p>
              <p className="font-semibold text-sm font-poppins leading-5 mr-[60px] text-[#1D2433CC]">
                ₦{selectedPlan?.amount}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-poppins font-semibold text-[#1D2433CC]">Beneficiary</p>
              <p className="font-semibold text-sm font-poppins text-[#1D2433CC]">{phone}</p>
            </div>

            <div className="flex justify-center">
              <p className="w-[99%] border-2 mt-6 border-dashed"></p>
            </div>

            <div className="my-5">
              <div className="h-[70px] w-[99%] flex justify-between items-center">
                <div className="flex mx-1 gap-1">
                  <div className="bg-[#F1F3F9] shadow-md rounded-full p-4">
                    <Wallet size="24" color="#1D2433CC" />
                  </div>
                  <p className="mt-5 font-poppins text-sm">Wallet (₦{userBalance || 0})</p>
                </div>
                <div className="mt-1 flex items-center gap-1 cursor-pointer">
                  <p className="font-poppins text-[#1E3DD7] text-sm">Fund wallet</p>
                  <ArrowRight2 size="18" color="#1E3DD7" />
                </div>
              </div>
            </div>

            <form className="mx-3 flex flex-col" onSubmit={handleBuy}>
              <label htmlFor="pin" className="text-[#101928] font-plus-jakarta text-[16px] font-semibold">
                Enter Your Pin <span className="text-red-700">*</span>
              </label>
              <input
                id="outlined-required-5"
                placeholder="Enter pin"
                type="password"
                name="pin"
                required
                autoComplete="off"
                {...formik.getFieldProps('pin')}
                className="border h-[56px] w-[95%] rounded-lg shadow-md text-[16px] pl-2 focus:outline-none"
              />
              <div className="flex justify-center w-full my-5">
                <button
                  type="submit"
                  className="h-[46px] w-[55%] font-poppins my-3 rounded-lg bg-blue-500 text-white"
                >
                  {loading ? 'Processing...' : 'Confirm & pay'}
                </button>
              </div>
            </form>

            <Toaster />
          </section>
        </div>
      </div>
      {active}
    </div>
  );
};

export default Confirm;
