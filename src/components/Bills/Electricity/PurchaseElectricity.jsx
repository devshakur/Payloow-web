import React, { useState, useEffect } from "react";
import Select from "react-select";
import axiosInstance from "../../../AuthContext/axiosInstance";
import useBills from "../../../hooks/useBills";
import { toast } from "react-hot-toast";
import { BillsEndpoints } from "../../../api/Endpoint";

const PurchaseElectricity = ({ active, handleNext, formik }) => {
  const [variations, setVariations] = useState([]);
  const [info, setInfo] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("")
  const [validating, setValidating] = useState(false);
  const { UserDetails } = useBills();

  const getUser = async () => {
    try {
      const details = await UserDetails();
      const userDetails = details.data.data.previousReference;
      setInfo(userDetails);
    } catch (error) {
      console.error(error.message);
    }
  };

  const Plans = [{ value: "PREPAID", label: "PREPAID" }];

  const fetchVariations = async () => {
    try {
      const response = await axiosInstance.get(
        BillsEndpoints.electricityVariation
      );
      if (response.data.success) {
        const formatted = response.data.data.map((item) => ({
          label: item.name,
          value: item.code,
        }));
        setVariations(formatted);
      }
    } catch (error) {
      console.error("Error fetching variations:", error);
    }
  };

// const validateMeterNumber = async (meterNumber, discoCode, type = "PREPAID") => {
//   setValidating(true);
//   try {
//     const response = await axiosInstance.get(BillsEndpoints.validateMeterNumber, {
//       params: { meterNumber, disco: discoCode, type },
//     });

//     const { success, data, message } = response.data;


//    if (success && !data.invalid && data.name !== "INVALID METER NUMBER") {
//   setCustomerName(data.name);
//   setAddress(data.address);

//   // Save to formik to use later
//   formik.setFieldValue("customerName", data.name);
//   formik.setFieldValue("customerAddress", data.address);

//   toast.success(`Validated: ${data.name}`);
// } else {
//   setCustomerName("");
//   setAddress("");
//   formik.setFieldValue("customerName", "");
//   formik.setFieldValue("customerAddress", "");

//   const errorMsg = data?.name || message || "Invalid meter number";
//   toast.error(errorMsg);
// }
//   } catch (error) {
//     console.error("Meter validation error:", error);
//     setCustomerName("");
//     setAddress('')
//     toast.error("Something went wrong. Please try again.");
//   } finally {
//     setValidating(false);
//   }
// };

const validateMeterNumber = async (meterNumber, discoCode, type = "PREPAID") => {
  setValidating(true);
  try {
    const response = await axiosInstance.get(BillsEndpoints.validateMeterNumber, {
      params: { meterNumber, disco: discoCode, type },
    });

    const { success, data, message } = response.data;

    if (success && !data.invalid && data.name !== "INVALID METER NUMBER") {
      setCustomerName(data.name);
      setAddress(data.address);

      // ✅ Add these lines to update Formik values
      formik.setFieldValue("customerName", data.name);
      formik.setFieldValue("customerAddress", data.address);

      toast.success(`Validated: ${data.name}`);
    } else {
      setCustomerName("");
      setAddress("");
      formik.setFieldValue("customerName", "");
      formik.setFieldValue("customerAddress", "");
      const errorMsg = data?.name || message || "Invalid meter number";
      toast.error(errorMsg);
    }
  } catch (error) {
    console.error("Meter validation error:", error);
    setCustomerName("");
    setAddress("");
    formik.setFieldValue("customerName", "");
    formik.setFieldValue("customerAddress", "");
    toast.error("Something went wrong. Please try again.");
  } finally {
    setValidating(false);
  }
};




  useEffect(() => {
    getUser();
    fetchVariations();
  }, []);

  const validateFields = () => {
    const { values } = formik;
    const { phone, meter_number, service_id, variation_id, amount } = values;

    if (service_id && meter_number && amount && phone && variation_id) {
      handleNext();
    } else {
      formik.setFieldTouched("service_id", true);
      formik.setFieldTouched("amount", true);
      formik.setFieldTouched("phone", true);
      formik.setFieldTouched("meter_number", true);
      formik.setFieldTouched("variation_id", true);
    }
  };

  return (
    <div>
      <main className="pb-[30px]">
        <div className="w-[100vw] md:-mt-12 flex justify-center lg:-ml-[-10vw] xl:-mt-[14vh]">
          <div className="w-[95%] md:mt-[5vh] md:w-[600px] px-4 lg:w-[650px] bg-white pb-4 shadow-md rounded-xl overflow-hidden">
            <h4 className="flex justify-center text-xl font-plus-jakarta font-semibold my-4 text-[#212121]">
              Pay Electricity Bills
            </h4>

            <form className="w-[100%] mx-2 mt-4">
              {/* Provider */}
              <label htmlFor="service_id" className="text-[#101928] text-sm font-semibold font-plus-jakarta">
                Service Provider<span className="text-red-700">*</span>
              </label>
              <Select
                id="service_id"
                name="service_id"
                options={variations}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                placeholder="Provider"
                className="mb-5"
                value={variations.find(option => option.value === formik.values.service_id)}
                onChange={(option) => {
                  formik.setFieldValue("service_id", option.value);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "95%",
                    fontWeight: "500",
                    padding: "8px",
                  }),
                }}
              />

              {/* Plan Type */}
              <label htmlFor="variation_id" className="text-[#101928] text-sm font-semibold font-plus-jakarta">
                Subscription Plan<span className="text-red-700">*</span>
              </label>
              <Select
                id="variation_id"
                name="variation_id"
                options={Plans}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                placeholder="Plans"
                className="mb-5"
                value={Plans.find(option => option.value === formik.values.variation_id)}
                onChange={(option) => {
                  formik.setFieldValue("variation_id", option.value);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "95%",
                    fontWeight: "500",
                    padding: "8px",
                  }),
                }}
              />

              {/* Meter Number */}
            <label htmlFor="meter_number" className="text-[#101928] text-sm font-semibold font-plus-jakarta">
  Meter Number<span className="text-red-700">*</span>
</label>
<div className="relative w-[95%] mb-2">
 <input
  id="meter_number"
  placeholder="Enter Meter Number"
  type="text"
  name="meter_number"
  autoComplete="off"
  className="p-3 w-full border-2 shadow rounded-lg text-[16px] focus:outline-none pr-10"
  {...formik.getFieldProps("meter_number")}
  onChange={(e) => {
    const value = e.target.value;
    formik.setFieldValue("meter_number", value);
    // Optional: clear name/address while typing
    setCustomerName("");
    setAddress("");
  }}
  onBlur={() => {
    const { meter_number, service_id, variation_id } = formik.values;
    if (meter_number && service_id) {
      validateMeterNumber(meter_number, service_id, variation_id || "PREPAID");
    }
  }}
/>


  {validating && (
    <div className="absolute right-3 top-3.5">
      <svg
        className="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>
  )}
</div>

{formik.touched.meter_number && formik.errors.meter_number && (
  <div className="text-red-500 -mt-1">{formik.errors.meter_number}</div>
)}


              {/* Customer Name Display (after validation) */}
              {customerName && (
                <div className="bg-[#F1F5F9] text-[15px] mt-2 font-semibold text-[#1D2433] rounded-md px-3 py-2 w-[95%]">
                  Name: {customerName} <br/>
                  Address: {address || ""}
                </div>
              )}

              {/* Amount */}
              <label htmlFor="amount" className="text-[#101928] text-sm font-semibold font-plus-jakarta mt-4">
                Amount<span className="text-red-700">*</span>
              </label>
              <input
                id="amount"
                placeholder="Enter Amount"
                type="number"
                name="amount"
                autoComplete="off"
                className="p-3 w-[95%] border-2 shadow rounded-lg text-[16px] mb-2 focus:outline-none"
                {...formik.getFieldProps("amount")}
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className="text-red-500 -mt-1">{formik.errors.amount}</div>
              )}

              {/* Phone */}
              <label htmlFor="phone" className="text-[#101928] text-sm font-semibold font-plus-jakarta mt-4">
                Phone Number<span className="text-red-700">*</span>
              </label>
              <input
                id="phone"
                placeholder="Phone Number"
                type="tel"
                name="phone"
                autoComplete="off"
                className="p-3 w-[95%] border-2 shadow rounded-lg text-[16px] mb-2 focus:outline-none"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 -mt-1">{formik.errors.phone}</div>
              )}

              {/* Next Button */}
              <div className="flex justify-center w-full">
                <button
                  type="button"
                  onClick={validateFields}
                  disabled={validating}
                  className="h-[46px] w-[55%] font-poppins my-4 rounded-lg bg-blue-500 text-white"
                >
                  {validating ? "Validating..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchaseElectricity;
