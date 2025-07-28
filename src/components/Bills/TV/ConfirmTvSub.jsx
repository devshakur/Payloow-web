import React, { useState, useEffect, startTransition } from "react";
import { Wallet, ArrowRight2 } from "iconsax-react";
import useBills from "../../../hooks/useBills";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const ConfirmTvSub = ({ formik, setActive, customerName }) => {
  const [loading, setLoading] = useState(false);
  const [serviceImage, setServiceImage] = useState();
  const { BuyTvSubscription, UserBalance, ConfirmPin } = useBills();

const {
  service_id,
  planId,
  variation_id,
  smart_card_number,
  pin,
} = formik.values;


  const ChooseImage = () => {
    if (service_id === "GOtv") {
      setServiceImage("/gotv.png");
    } else if (service_id === "Startimes") {
      setServiceImage("/starttime.png");
    } else if (service_id === "Dstv") {
      setServiceImage("/images/dstv.png");
    } else if (service_id === "NOVA") {
      setServiceImage("/images/nova.png");
    } else if (service_id === "Sky") {
      setServiceImage("/images/sky.png");
    }
  };

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await UserBalance();
      const fetchedBalance = response.data.data.balance.$numberDecimal;
      setBalance(fetchedBalance);
    };

    fetchBalance();
    ChooseImage();
  }, []);

  const handleBuySub = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Extract amount from label, assuming label format: "GOtv Max - ₦8,500"
      const amountString = variation_id?.label?.match(/₦[\d,]+/)?.[0];
      const amount = amountString
        ? parseFloat(amountString.replace(/[₦,]/g, ""))
        : 0;

      if (balance >= amount) {
        const response = await BuyTvSubscription({
           cable: service_id,
  planId: planId,
  cableplan: variation_id?.label,
  smartcardNumber: smart_card_number,
  transactionPin: pin,
        });

        if (response?.data?.success) {
          startTransition(() => {
            setActive("page3");
          });
        } else {
          toast.error(response?.data?.data?.data?.error || "Purchase failed.");
          setLoading(false);
           setTimeout(() => {
          setActive("page4"); // error screen
        }, 2000);
        }
      } else {
        toast.error("Insufficient balance.");
        setTimeout(() => {
          setActive("page4"); // error screen
        }, 2000);
      }
    } catch (error) {
      toast.error("An error occurred during purchase.");
      setTimeout(() => {
        setActive("page4");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const headStyles =
    "font-normal text-sm font-poppins leading-5 text-[#1D2433CC]";
  return (
    <div>
      <div className="grid  h-[-80vh] lg:-mt-12 items-center">
        <div className="w-screen flex justify-center lg:justify-center lg:-ml-[-10vw] 2xl:ml-[8vw]">
          <div className="w-full mx-4 h-[540px] md:h-[520px] md:w-[520px] bg-[#FFFFFF] pb-[20px]  shadow-md rounded-lg">
            <h4 className="flex justify-center text-lg leading-7 font-poppins font-bold my-4 text-[#000000]">
              Confirm TV Subscription
            </h4>
            <h6 className="flex justify-center font-medium text-[16px] text-[#1D2433] font-poppins leading-5 -mt-3">
              {variation_id?.label}
            </h6>
            <section className="h-[97px] w-[95%]  mx-2 mt-9">
              <div className="flex">
                <h6 className="text-sm w-[83%] font-poppins font-[400] text-[#1D2433CC]">
                  TV subscription
                </h6>
                <div className="w-[70%] flex justify-end gap-3 ml-6">
                  <img src={serviceImage} className="w-9 h-8" alt="" />
                  <p className={`${headStyles} mt-1 mr-2`}>{service_id}</p>
                </div>
              </div>
              <div className="flex justify-between my-1">
                <p className={`${headStyles}`}>Subscription Plan</p>
                <p className={`${headStyles}`}>{variation_id?.label}</p>
              </div>
              <div className=" flex justify-between">
                <p className={`${headStyles}`}>Amount</p>
                <p className={`${headStyles} ml-2`}>
                  {variation_id?.label?.match(/₦[\d,]+/)?.[0] || "₦0"}
                </p>
              </div>
              <div className="flex justify-between my-1">
                <p className={`${headStyles}`}>Smartcard Number</p>
                <p className={`${headStyles}`}>{smart_card_number}</p>
              </div>
              <div className="flex justify-center">
                <p className="w-[90%] border-2 mt-6 border-dashed"></p>
              </div>
              <div className="my-5">
                <div className="h-[70px] w-[95%] flex justify-between items-center">
                  <div className="flex mx-1 gap-1">
                    <div className="bg-[#F1F3F9] shadow-md rounded-[50%] p-4">
                      <Wallet size="24" color="#1D2433CC" />
                    </div>
                    <p className="mt-5 font-poppins font-normal text-sm leading-5">
                      Wallet (₦{balance || 0})
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <p className="font-poppins font-normal text-[#1E3DD7] text-sm leading-5">
                      Fund wallet
                    </p>
                    <ArrowRight2 size="18" color="#1E3DD7" />
                  </div>
                </div>
              </div>
              <form className="mx-3 flex flex-col" onSubmit={handleBuySub}>
                <label
                  htmlFor="pin"
                  className="text-[#101928] text-[12px] font-semibold -pb-8"
                >
                  Enter Your Pin <span className="text-red-700">*</span>
                </label>
                <input
                  id="outlined-required-5"
                  placeholder="Enter pin"
                  type="password"
                  name="pin"
                  required
                  autoComplete="off"
                  {...formik.getFieldProps("pin")}
                  className="border h-[50px] w-[95%] rounded-lg text-[12px] pl-2 shadow-md focus:outline-none"
                />

                <div className="flex justify-center w-[100%] my-5">
                  <button
                    type="submit"
                    className="h-[46px] w-[55%] font-poppins my-3 rounded-lg bg-blue-500 text-white"
                  >
                    {loading ? "Processing..." : "Confirm & pay"}
                  </button>
                </div>
              </form>

              <Toaster />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTvSub;
