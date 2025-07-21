import React, { useState, useMemo, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { bankOptions } from "../../../../Utils/banksCodes";
import countryList from "react-select-country-list";
import "../../auth.css";
import { useNavigate } from "react-router-dom";
import useBills from "../../../../hooks/useBills";
const VirtualAccount = () => {
  const navigate = useNavigate();
  const { VerifyBvn } = useBills();








  const countryOptions = useMemo(() => countryList().getData(), []);

 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState(null);
  const [bvn, setBvn] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('')

  useEffect(()=>{
  const CustomerData = localStorage.getItem("currentUser");

if (CustomerData) {
  try {
    const parsedUser = JSON.parse(CustomerData);
    const customerCode = parsedUser?.paystackCustomerCode;
   setCode(customerCode)
  } catch (error) {
    console.error("Error parsing currentUser:", error);
  }
} else {
  console.warn("No currentUser found in localStorage");
}
  },[code])

  

  const verifyUserBvn = async (e) => {
    e.preventDefault();

    if (!accountNumber || !bank?.value || !country?.value || bvn.length !== 11) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    try {
      const data = {
        customer_code: code,
        country: country.value,
        type: "bank_account",
        account_number: accountNumber,
        bvn,
        bank_code: bank.value,
        first_name: firstName,
        last_name: lastName,
      };

      const response = await VerifyBvn(data);
      const result = response.data;

      if (result.data.status === true) {
        toast.success("User Verification Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      const ErrMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      toast.error(ErrMsg);
    } finally {
      setLoading(false);
    }
  };

  const skipPin = () => {
    navigate("/dashboard");
  };

  return (
    <main className="bg h-screen w-screen overflow-y-auto relative flex justify-center items-center">
      <Toaster />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-white w-[90vw] max-w-lg p-6 rounded-lg shadow-lg z-20"
          >
            <h4 className="text-2xl font-bold text-center">
              Activate Your Virtual Account
            </h4>
            <p className="text-center mt-2 text-gray-600">
              To enable secure transactions and activate your virtual bank
              account, please provide your details.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="grid gap-2 mt-4"
            >
              <div>
                <label className="text-sm text-gray-600 font-medium">First Name</label>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Last Name</label>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Country</label>
                <Select
                  options={countryOptions}
                  value={country}
                  onChange={setCountry}
                  placeholder="Choose a country..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "55px",
                      borderRadius: "0.5rem",
                      borderColor: "#d1d5db",
                      paddingLeft: "0.75rem",
                      paddingRight: "0.75rem",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      marginBottom: "10px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af",
                    }),
                  }}
                />
              </div>
              <button
                type="submit"
                className="h-[55px] mb-3 bg-[#3369F4] rounded-lg text-white"
              >
                Next
              </button>
              <button
                type="button"
                onClick={skipPin}
                className="h-[55px] bg-white border border-[#3369F4] text-[#3369F4] rounded-lg"
              >
                Skip for now
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-white w-[90vw] max-w-lg p-6 rounded-lg shadow-lg z-30"
          >
            <h4 className="text-2xl font-bold text-center">Verify Your BVN</h4>
            <p className="text-center mt-2 text-gray-600">
              To activate your account, please enter your bank and BVN details below.
            </p>
            <form onSubmit={verifyUserBvn} className="grid gap-2 mt-6">
              <div>
                <label className="text-sm text-gray-600 font-medium">Account Number</label>
                <input
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="input-field"
                  type="number"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Select Bank</label>
                <Select
                  options={bankOptions}
                  value={bank}
                  onChange={setBank}
                  placeholder="Choose your bank..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "55px",
                      borderRadius: "0.5rem",
                      borderColor: "#d1d5db",
                      paddingLeft: "0.75rem",
                      paddingRight: "0.75rem",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      marginBottom: "10px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af",
                    }),
                  }}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Bank Verification Number (BVN)</label>
                <input
                  placeholder="BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  className="input-field"
                  type="number"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-[55px] bg-[#3369F4] rounded-lg text-white"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-[55px] bg-white border border-[#3369F4] text-[#3369F4] rounded-lg"
              >
                Back
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default VirtualAccount;
