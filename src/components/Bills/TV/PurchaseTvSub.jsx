import React, { useState, useEffect, startTransition } from "react";
import Select from "react-select";
import axiosInstance from "../../../AuthContext/axiosInstance";
import { BillsEndpoints } from "../../../api/Endpoint";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

import useBills from "../../../hooks/useBills";

const PurchaseTvSub = ({
  formik,
  handleNext,
  setCustomerName,
  customerName,
}) => {
  const [cables, setCables] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [loading, setLoading] = useState(false);

  const { UserDetails } = useBills();

  const handleProviderChange = (selectedOption) => {
    formik.setFieldValue("service_id", selectedOption.value);
    setSelectedProvider(selectedOption.value);
    formik.setFieldValue("variation_id", "");
  };

  const handleSmartCardBlur = async () => {
    const { smart_card_number, service_id } = formik.values;
    if (!smart_card_number || !service_id) return;

    setIsValidating(true);
    try {
      const res = await axiosInstance.get(BillsEndpoints.validateCableNumber, {
        params: {
          smart_card_number: smart_card_number,
          cablename: service_id,
        },
      });

      const data = res.data?.data;
      if (data?.name) {
        setCustomerName(data.name);
        toast.success("Smartcard validated");
      } else {
        setCustomerName("");
        toast.error(res.data?.message || "Invalid smartcard number");
      }
    } catch (error) {
      setCustomerName("");
      toast.error("Smartcard validation failed");
    } finally {
      setIsValidating(false);
    }
  };

  const validateFields = () => {
    const { values } = formik;
    const { phone, service_id, smart_card_number, variation_id } = values;

    if (phone && service_id && smart_card_number && variation_id) {
      handleNext();
    } else {
      formik.setFieldTouched("phone", true);
      formik.setFieldTouched("service_id", true);
      formik.setFieldTouched("smart_card_number", true);
      formik.setFieldTouched("variation_id", true);
    }
  };

  const fetchCableVariations = async () => {
    try {
      const response = await axiosInstance.get(BillsEndpoints.cableVariation);
      if (response.data.success) {
        const variationData = response.data.data;
        setCables(Object.keys(variationData.cables));
        setPlans(variationData.plans);
      }
    } catch (error) {
      console.error("Error fetching cable variations:", error);
    }
  };

  const getUser = async () => {
    try {
      const details = await UserDetails();
      const userDetails = details.data.data.previousReference;
      setInfo(userDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
    fetchCableVariations();
  }, []);

  useEffect(() => {
    if (selectedProvider && plans[selectedProvider]) {
      const providerPlans = plans[selectedProvider].map((item) => ({
        value: item.name,
        label: `${item.name} - ₦${item.amount.toLocaleString()}`,
        planId: item.id,
      }));
      setSubscriptionOptions(providerPlans);
    } else {
      setSubscriptionOptions([]);
    }
  }, [selectedProvider, plans]);

  const cableProviderOptions = cables.map((cable) => ({
    value: cable,
    label: cable,
  }));

  return (
    <div className="w-full flex justify-center lg:ml-[8rem]">
      <div className="w-[95%] md:w-[530px]  bg-white p-6 rounded-xl shadow-md">
        <h4 className="text-center text-xl font-semibold mb-4">
          Pay TV Subscription
        </h4>
        <p className="text-center text-sm text-gray-500 -mt-2 mb-4">
  Easily subscribe or renew your cable TV plan from the comfort of your home. Just select your provider, enter your smart card number, and choose your preferred bouquet to continue.
</p>


        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Provider */}
          <label className="text-sm font-semibold">Service Provider</label>
          <Select
            id="service_id"
            name="service_id"
            options={cableProviderOptions}
            onChange={handleProviderChange}
            value={cableProviderOptions.find(
              (opt) => opt.value === formik.values.service_id
            )}
            placeholder="Provider"
            styles={{
              control: (base) => ({
                ...base,
                width: "99%",
                fontWeight: "700",
                marginBottom: "10px",
                padding: "8px",
              }),
            }}
          />
          {/* Plan */}
          <label className="text-sm font-semibold">Subscription Plan</label>
          <Select
            id="variation_id"
            name="variation_id"
            options={subscriptionOptions}
            onChange={(opt) => {
              formik.setFieldValue("variation_id", opt); // full object
              formik.setFieldValue("planId", opt.planId); // ✅ store planId
            }}
            value={subscriptionOptions.find(
              (opt) => opt.value === formik.values.variation_id
            )}
            placeholder="Select Plan"
            styles={{
              control: (base) => ({
                ...base,
                width: "99%",
                fontWeight: "700",
                marginBottom: "10px",
                padding: "8px",
              }),
            }}
          />
          {formik.touched.variation_id && formik.errors.variation_id && (
            <div className="text-red-500 text-sm">
              {formik.errors.variation_id}
            </div>
          )}

          {/* Smartcard */}
          <label className="text-sm font-semibold mt-3">Smartcard Number</label>
          <input
            type="text"
            name="smart_card_number"
            value={formik.values.smart_card_number}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleSmartCardBlur();
            }}
            className="border-2 p-3 shadow w-[99%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2 focus:outline-none"
            placeholder="Enter Smartcard Number"
          />
          {formik.touched.smart_card_number &&
            formik.errors.smart_card_number && (
              <div className="text-red-500 text-sm">
                {formik.errors.smart_card_number}
              </div>
            )}

          {isValidating && <ClipLoader size={20} color="#2563EB" />}
          {customerName && (
            <div className="bg-[#F1F5F9] text-[15px] mt-2 font-semibold text-green-400 rounded-md px-3 py-2 w-[95%]">
              Customer: {customerName}
            </div>
          )}

          {/* Phone */}
          <label className="text-sm font-semibold mt-3">Phone Number</label>
          <input
            type="text"
            name="phone"
            {...formik.getFieldProps("phone")}
            className="border-2 p-3 shadow w-[99%] rounded-lg font-semibold text-[16px] text-[#101928] pl-2 mb-2 focus:outline-none"
            placeholder="Enter Phone Number"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}

          {/* Submit */}
          <div className="w-full flex justify-center items-center ">
            <button
              type="button"
              onClick={validateFields}
              className="p-4 w-[100%] font-poppins my-3 rounded-lg bg-blue-500 text-white"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseTvSub;
