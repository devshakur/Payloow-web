// import React, { useEffect, useState, useRef } from "react";
// import Select from "react-select";
// import axiosInstance from "../../../AuthContext/axiosInstance";
// import useBills from "../../../hooks/useBills";

// const DataBundles = ({ handleNext, formik, selectedPlan, setSelectedPlan }) => {
//   const [showAll, setShowAll] = useState(false);
//   const [info, setInfo] = useState([]);
//   const [isLoadingVariations, setIsLoadingVariations] = useState(false);
//   const { UserDetails } = useBills();

//   const scrollContainerRef = useRef(null);

//   const calculateScrollPercentage = () => {
//     if (!scrollContainerRef.current) return 0;
//     const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//     return (scrollLeft / (scrollWidth - clientWidth)) * 100;
//   };

//   useEffect(() => {
//     const handleScroll = () => setScrollPercentage(calculateScrollPercentage());
//     const container = scrollContainerRef.current;
//     container?.addEventListener("scroll", handleScroll);
//     return () => container?.removeEventListener("scroll", handleScroll);
//   }, []);

//   const getUser = async () => {
//     try {
//       const details = await UserDetails();
//       const userDetails = details.data.data.previousReference;
//       setInfo(userDetails);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   const handleShowMore = () => {
//     setShowAll(true);
//   };

//   const Providers = [
//     { value: "airtel", label: "Airtel" },
//     { value: "mtn", label: "MTN" },
//     { value: "glo", label: "Glo" },
//     { value: "9mobile", label: "9mobile" },
//    { value: "smile", label: "Smile" },
//    { value: "spectranet", label: "Spectranet" }
//   ];

//   const [variations, setVariations] = useState({});
//   const [selectedNetwork, setSelectedNetwork] = useState("");

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     const selectedVariation = variations[selectedNetwork]?.find(
//       (variation) => variation.plan === plan
//     );
//     if (selectedVariation) {
//       formik.setFieldValue("amount", selectedVariation.price);
//       formik.setFieldValue("variation_id", selectedVariation.variationID);
//       formik.setFieldValue("network_id", selectedNetwork);
//     }
//   };


// const fetchVariations = async (provider) => {
//   if (!provider) return;
//   setIsLoadingVariations(true);

//   try {
//     // Handle custom endpoints
//     let variationEndpoint = `/payloow-bills/data/list`;
//     if (provider === "smile") {
//       variationEndpoint = `/smile/smile-variations`;
//     } else if (provider === "spectranet") {
//       variationEndpoint = `/spectranet/spectranet-variations`;
//     }

//     const response = await axiosInstance.get(variationEndpoint);

//     if (response?.data?.statusCode === 200 || response?.data?.message?.toLowerCase().includes("fetched")) {
//       const variationList = response.data.data.content.variations;

//       const mappedVariations = variationList.map((item) => ({
//         _id: item.variation_code,
//         plan: item.name,
//         price: parseFloat(item.variation_amount) || item.variation_amount, // convert string to number if possible
//         variationID: item.variation_code,
//       }));

//       setVariations((prev) => ({
//         ...prev,
//         [provider]: mappedVariations,
//       }));
//     } else {
//       console.error("Unexpected variation format:", response.data);
//     }
//   } catch (error) {
//     console.error("Error fetching variations:", error);
//   } finally {
//     setIsLoadingVariations(false);
//   }
// };



//   useEffect(() => {
//     if (selectedNetwork) {
//       fetchVariations(selectedNetwork);
//     }
//   }, [selectedNetwork]);

//   const validateFields = () => {
//     const { values } = formik;
//     const { network_id, amount, phone } = values;

//     if (network_id && amount && phone) {
//       handleNext();
//     } else {
//       formik.setFieldTouched("network_id", true);
//       formik.setFieldTouched("amount", true);
//       formik.setFieldTouched("phone", true);
//       formik.setFieldTouched("variation_id", true);
//     }
//   };

//   const isFormValid =
//     formik.values.network_id && formik.values.amount && formik.values.phone;

//   return (
//     <div>
//         <main className='pb-[40px]'>
//                 <div className='w-[100vw] xl:-mt-24 flex justify-center lg:-ml-[-10vw] xl:justify-center'>
//                     <div className='mx-4 w-[97%] md:w-[65%] lg:w-[45%] bg-[#FFFFFF] pb-4 shadow-md rounded-sm overflow-hidden'>
//             <h4 className="text-center text-xl font-semibold my-4 text-[#212121]">
//               Buy Data Bundles
//             </h4>

//             <h4 className="text-lg font-semibold mx-3">Most recent</h4>
//             <article className="flex gap-3 mx-2">
//               {Array.isArray(info) && info.length > 0 ? (
//                 info
//                   .filter((user) => user.title === "Data")
//                   .map((user) => (
//                     <section key={user.code} className="flex flex-row gap-6 my-4">
//                       <div className="flex flex-col gap-2">
//                         <img
//                           src={
//                             user.body === "airtel"
//                               ? "./images/airtel.jpg"
//                               : user.body === "mtn"
//                               ? "./images/mtn.jpg"
//                               : user.body === "glo"
//                               ? "./images/glos.png"
//                               : user.body === "etisalat"
//                               ? "./images/img4.jpg"
//                               : "./images/default.jpg"
//                           }
//                           className="w-[40px] h-[40px] ml-4"
//                           alt={user.title}
//                         />
//                         <span className="text-[13px] ml-5 font-medium">{user.title}</span>
//                         <span className="text-[13px] ml-1 font-medium">{user.code}</span>
//                       </div>
//                     </section>
//                   ))
//               ) : (
//                 <div className="ml-8 my-5 text-lg text-green-500">No recent Purchase</div>
//               )}
//             </article>

//             <form className="mx-4 my-6 flex flex-col gap-3">
//               <label htmlFor="package" className="text-sm font-bold">
//                 Package<span className="text-red-700">*</span>
//               </label>
//               <Select
//                 id="package"
//                 name="package"
//                 options={Providers}
//                 getOptionValue={(option) => option.value}
//                 getOptionLabel={(option) => option.label}
//                 onChange={(option) => {
//                   setSelectedNetwork(option.value);
//                   setSelectedPlan("");
//                   formik.setFieldValue("network_id", option.value);
//                 }}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     height: "56px",
//                     fontWeight: "800",
//                     padding: "5px",
//                   }),
//                 }}
//               />

//               {isLoadingVariations ? (
//                 <div className="text-center py-5">Loading Variations..</div> 
//               ) : (
//                 <div className="w-full px-4 overflow-x-auto">
//                   <div className="flex flex-row gap-4 py-2">
//                     {(showAll
//                       ? variations[selectedNetwork]
//                       : variations[selectedNetwork]?.slice(0, 3)
//                     )?.map((variation) => (
//                       <div
//                         key={variation._id}
//                         className={`flex-shrink-0 min-w-[150px] p-4 border font-medium text-sm rounded-xl cursor-pointer ${
//                           selectedPlan === variation.plan
//                             ? "bg-blue-500 text-white border-blue-600"
//                             : "bg-gray-100 text-gray-800 hover:shadow-lg"
//                         }`}
//                         onClick={() => handlePlanSelect(variation.plan)}
//                       >
//                         <div className="text-lg font-bold">₦{variation.price}</div>
//                         <div className="mt-1">{variation.plan}</div>
//                       </div>
//                     ))}
//                     {!showAll && variations[selectedNetwork]?.length > 3 && (
//                       <div
//                         className="flex-shrink-0 min-w-[150px] p-4 border rounded-xl bg-gray-100 text-gray-800 cursor-pointer"
//                         onClick={handleShowMore}
//                       >
//                         <span>Show More...</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label htmlFor="amount" className="text-sm font-semibold">
//                   Amount<span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="amount"
//                   readOnly
//                   placeholder="Amount"
//                   name="amount"
//                   {...formik.getFieldProps("amount")}
//                   className="border-2 h-[56px] w-full rounded-lg text-lg pl-2 focus:outline-none"
//                 />
//                 {formik.touched.amount && formik.errors.amount && (
//                   <div className="text-red-500">{formik.errors.amount}</div>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="phone" className="text-sm font-semibold">
//                   Phone Number<span className="text-red-700">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   {...formik.getFieldProps("phone")}
//                   className="border-2 h-[56px] w-full rounded-lg text-lg pl-2 mb-5"
//                 />
//                 {formik.touched.phone && formik.errors.phone && (
//                   <div className="text-red-500">{formik.errors.phone}</div>
//                 )}
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   type="button"
//                   onClick={validateFields}
//                   disabled={!isFormValid}
//                   className={`p-2 w-[55%] font-poppins rounded-lg text-white ${
//                     isFormValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DataBundles;

import React, { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../../AuthContext/axiosInstance";
import useBills from "../../../hooks/useBills";
 import {toast, Toaster} from "react-hot-toast";
const DataBundles = ({ handleNext, formik, selectedPlan, setSelectedPlan, }) => {
  const [allVariations, setAllVariations] = useState({});
    const [transactions, setTransactions] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [info, setInfo] = useState([]);
 
  const { UserDetails, UserTransactions } = useBills();

  const Providers = [
    { value: "AIRTEL", label: "Airtel" },
    { value: "MTN", label: "MTN" },
    { value: "GLO", label: "Glo" },
    { value: "9MOBILE", label: "9mobile" },
  ];

  const fetchAllVariations = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/payloow-bills/data/list");
      if (res?.data?.success) {
        setAllVariations(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch variations:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const details = await UserDetails();
      setInfo(details.data.data.previousReference);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllVariations();
    getUser();
  }, []);

  const handlePlanSelect = (plan) => {
    if (plan?.id && plan?.amount && plan?.size && plan?.validity && selectedCategory) {
      const selected = {
        id: plan.id,
        amount: plan.amount,
        size: plan.size,
        validity: plan.validity,
        planType: mapCategoryToPlanType(selectedCategory),
      };

      setSelectedPlan(selected);

      // Set formik values properly
      formik.setFieldValue("planId", String(plan.id));
      formik.setFieldValue("planType", selected.planType);
      formik.setFieldValue("amount", plan.amount);
      formik.setFieldValue("network", selectedNetwork);
    } else {
      console.warn("Invalid plan selected:", plan);
    }
  };

  // Map category to expected backend planType
  const mapCategoryToPlanType = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes("daily") || lower.includes("7 day") || lower.includes("weekly")) return "weekly";
    return "monthly";
  };

  const validateFields = () => {
    const { values } = formik;
    if (values.phone && values.planId && values.planType && values.network) {
      handleNext();
    } else {
      ["phone", "planId", "planType", "network"].forEach((field) => formik.setFieldTouched(field, true));
    }
  };

  const isFormValid =
    formik.values.phone &&
    formik.values.planId &&
    formik.values.planType &&
    formik.values.network;

  const categories = selectedNetwork
    ? Object.keys(allVariations[selectedNetwork] || {})
    : [];

  const plans =
    selectedNetwork && selectedCategory
      ? allVariations[selectedNetwork][selectedCategory]
      : [];

  const getUserTransaction = async () => {
  try {
    const resp = await UserTransactions();
    const allTransactions = resp.data?.data || [];

    // Filter for transactions with "data purchase" in the narration (case-insensitive)
    const successfulDataPurchases = allTransactions.filter(
      (txn) =>
        txn.narration?.toLowerCase().includes("data purchase") &&
        (txn.status === "pending" || txn.status === "success" || txn.status === "failed")
    );

    // Sort by newest first
    successfulDataPurchases.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Get most recent one
    const recentDataPurchase = successfulDataPurchases[0] || null;
    setTransactions(recentDataPurchase);
  } catch (error) {
    toast.error("Failed to fetch user transactions");
  }
};


  useEffect(() => {
    getUserTransaction();
  }, []);

  return (
    <main className="pb-[40px]">
      <div className="w-[100vw] xl:-mt-24 flex justify-center lg:-ml-[-10vw] xl:justify-center">
        <div className="mx-4 w-[97%] md:w-[65%] lg:w-[45%] bg-white pb-4 shadow-md rounded-sm overflow-hidden">
          <h4 className="text-center text-xl font-semibold my-4 text-[#212121]">Buy Data Bundles</h4>

          <h4 className="text-lg font-semibold mx-3">Most recent</h4>
        <article className="flex gap-3 mx-2">
  {transactions ? (
    <section className="flex flex-row gap-6 my-4">
      <div className="flex flex-col gap-2">
       <img
  src={
    transactions?.narration?.toLowerCase().includes("airtel")
      ? "./images/airtel.jpg"
      : transactions?.narration?.toLowerCase().includes("mtn")
      ? "./images/mtn.jpg"
      : transactions?.narration?.toLowerCase().includes("glo")
      ? "./images/glos.png"
      : transactions?.narration?.toLowerCase().includes("9mobile") ||
        transactions?.narration?.toLowerCase().includes("etisalat")
      ? "./images/img4.jpg"
      : "./images/default.jpg"
  }
  className="w-[40px] h-[40px] ml-4"
  alt="network"
/>

      
        <span className="text-[13px] ml-4 -mt-2 font-medium">
          ₦{transactions.amount}
        </span>
        <span
          className={`text-[12px] -mt-1 ml-4 font-semibold ${
            transactions.status === "success"
              ? "text-green-500"
              : transactions.status === "pending"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {transactions.status}
        </span>
      </div>
    </section>
  ) : (
    <div className="ml-8 my-5 text-lg text-green-500">
      No recent Data Purchase
    </div>
  )}
</article>


          <form className="mx-4 my-6 flex flex-col gap-3">
            {/* Provider */}
            <label className="text-sm font-bold">Package<span className="text-red-700">*</span></label>
            <Select
              options={Providers}
              onChange={(opt) => {
                setSelectedNetwork(opt.value);
                setSelectedCategory("");
                setSelectedPlan("");
                formik.setFieldValue("network", opt.value);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  height: "56px",
                  fontWeight: "800",
                  padding: "5px",
                }),
              }}
            />

            {/* Plan Type */}
            {selectedNetwork && (
              <>
                <label className="text-sm font-bold mt-4">
                  Type<span className="text-red-700">*</span>
                </label>
                <Select
                  options={categories.map((cat) => ({ value: cat, label: cat }))}
                  onChange={(opt) => {
                    setSelectedCategory(opt.value);
                    setSelectedPlan("");
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "56px",
                      fontWeight: "800",
                      padding: "5px",
                    }),
                  }}
                />
              </>
            )}

            {/* Plans */}
            {isLoading ? (
              <div className="text-center py-5">Loading Variations...</div>
            ) : selectedCategory ? (
              <div className="w-full px-4 overflow-x-auto">
                <div className="flex flex-row gap-4 py-2">
                  {(showAll ? plans : plans.slice(0, 3))?.map((variation) => (
                    <div
                      key={variation.id}
                      className={`flex-shrink-0 min-w-[150px] p-4 border font-medium text-sm rounded-xl cursor-pointer ${
                        selectedPlan?.id === variation.id
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-gray-100 text-gray-800 hover:shadow-lg"
                      }`}
                      onClick={() => handlePlanSelect(variation)}
                    >
                      <div className="text-lg font-bold">₦{variation.amount}</div>
                      <div className="mt-1">{variation.size}</div>
                      <div className="text-xs text-gray-500">{variation.validity}</div>
                    </div>
                  ))}
                  {!showAll && plans.length > 3 && (
                    <div
                      className="flex-shrink-0 min-w-[150px] p-4 border rounded-xl bg-gray-100 text-gray-800 cursor-pointer"
                      onClick={() => setShowAll(true)}
                    >
                      <span>Show More...</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="text-sm font-semibold">
                Amount<span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="amount"
                readOnly
                placeholder="Amount"
                {...formik.getFieldProps("amount")}
                className="border-2 h-[56px] w-full rounded-lg text-lg pl-2 focus:outline-none"
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className="text-red-500">{formik.errors.amount}</div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="text-sm font-semibold">
                Phone Number<span className="text-red-700">*</span>
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                {...formik.getFieldProps("phone")}
                className="border-2 h-[56px] w-full rounded-lg text-lg pl-2 mb-5"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500">{formik.errors.phone}</div>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={validateFields}
                disabled={!isFormValid}
                className={`p-2 w-[55%] font-poppins rounded-lg text-white ${
                  isFormValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default DataBundles;
