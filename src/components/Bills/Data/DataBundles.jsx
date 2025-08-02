import React, { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../../AuthContext/axiosInstance";
import useBills from "../../../hooks/useBills";
 import {toast, Toaster} from "react-hot-toast";
const DataBundles = ({ handleNext, formik, selectedPlan, setSelectedPlan, }) => {
  const [allVariations, setAllVariations] = useState({});
  const [smileVariations, setSmileVariations] = useState([]);
  const [spectranetVariations, setSpectranetVariations] = useState([]);
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
    { value: "SMILE", label: "Smile" },
    { value: "SPECTRANET", label: "Spectranet" },
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

  const fetchSmileVariations = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/smile/smile-variations");
      if (res?.data?.success) {
        setSmileVariations(res.data.data.content.variations);
      }
    } catch (err) {
      console.error("Failed to fetch Smile variations:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpectranetVariations = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/spectranet/spectranet-variations");
      if (res?.data?.success) {
        setSpectranetVariations(res.data.data.content.variations);
      }
    } catch (err) {
      console.error("Failed to fetch Spectranet variations:", err.message);
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
    fetchSmileVariations();
    fetchSpectranetVariations();
    getUser();
  }, []);

  const handlePlanSelect = (plan) => {
    if (selectedNetwork === "SMILE") {
      if (plan?.variation_code && plan?.variation_amount) {
        setSelectedPlan({
          code: plan.variation_code,
          amount: plan.variation_amount,
          planType: "smile",
        });
        formik.setFieldValue("planId", plan.variation_code);
        formik.setFieldValue("planType", "smile");
        formik.setFieldValue("amount", plan.variation_amount);
        formik.setFieldValue("network", selectedNetwork);
      }
    } else if (selectedNetwork === "SPECTRANET") {
      if (plan?.variation_code && plan?.variation_amount) {
        setSelectedPlan({
          code: plan.variation_code,
          amount: plan.variation_amount,
          planType: "spectranet",
        });
        formik.setFieldValue("planId", plan.variation_code);
        formik.setFieldValue("planType", "spectranet");
        formik.setFieldValue("amount", plan.variation_amount);
        formik.setFieldValue("network", selectedNetwork);
      }
    }
     else if (
      plan?.id &&
      plan?.amount &&
      plan?.size &&
      plan?.validity &&
      selectedCategory
    ) {
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
    if (selectedNetwork === "SMILE") return "smile";
    if (selectedNetwork === "SPECTRANET") return "spectranet";
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
            ) : selectedNetwork === "SMILE" ? (
              <div className="w-full px-4 overflow-x-auto">
                <div className="flex flex-row gap-4 py-2">
                  {smileVariations?.map((variation) => (
                    <div
                      key={variation.variation_code}
                      className={`flex-shrink-0 min-w-[150px] p-4 border font-medium text-sm rounded-xl cursor-pointer ${
                        selectedPlan?.code === variation.variation_code
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-gray-100 text-gray-800 hover:shadow-lg"
                      }`}
                      onClick={() => handlePlanSelect(variation)}
                    >
                      <div className="text-lg font-bold">₦{variation.variation_amount}</div>
                      {/* <div className="mt-1">{variation.size}</div> */}
                      <div className="text-xs text-gray-500">{variation.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : selectedNetwork === "SPECTRANET" ? (
              <div className="w-full px-4 overflow-x-auto">
                <div className="flex flex-row gap-4 py-2">
                  {spectranetVariations?.map((variation) => (
                    <div
                      key={variation.variation_code}
                      className={`flex-shrink-0 min-w-[150px] p-4 border font-medium text-sm rounded-xl cursor-pointer ${
                        selectedPlan?.code === variation.variation_code
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-gray-100 text-gray-800 hover:shadow-lg"
                      }`}
                      onClick={() => handlePlanSelect(variation)}
                    >
                      <div className="text-lg font-bold">₦{variation.variation_amount}</div>
                      {/* <div className="mt-1">{variation.size}</div> */}
                      <div className="text-xs text-gray-500">{variation.name}</div>
                    </div>
                  ))}
                </div>
              </div>
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
