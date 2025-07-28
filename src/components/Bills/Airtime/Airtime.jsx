import React, { useState, useEffect } from "react";
import Select from "react-select";
import useBills from "../../../hooks/useBills";

const Airtime = ({ handleNext, formik }) => {
  const [info, setInfo] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { UserDetails, UserTransactions } = useBills();

  const getUserTransaction = async () => {
    try {
      const resp = await UserTransactions();
      const allTransactions = resp.data?.data || [];

      // Filter for only successful airtime purchases
      const successfulAirtimePurchases = allTransactions.filter(
        (txn) =>
          txn.narration?.toLowerCase().includes("airtime purchase success") &&
          txn.status === "success"
      );

      // Sort descending by creation date (most recent first)
      successfulAirtimePurchases.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Take the most recent one
      const recentAirtimePurchase = successfulAirtimePurchases[0] || null;

      setTransactions(recentAirtimePurchase); // or setSingleTransaction
    } catch (error) {
      toast.error("Failed to fetch user transactions");
    }
  };

  useEffect(() => {
    getUserTransaction();
  }, []);

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
  }, []);
  const Networks = [
    { value: "MTN", label: "MTN" },
    { value: "AIRTEL", label: "Airtel" },
    { value: "GLO", label: "Glo" },
    { value: "9MOBILE", label: "9Mobile" },
  ];
  const amounts = ["₦100", "₦200", "₦500", "₦1000"];

  const handlePick = (value) => {
    formik.setFieldValue("amount", value);
  };

  const validateFields = () => {
    const { values } = formik;
    const { network, amount, phone } = values;

    if (network && amount && phone) {
      handleNext();
    } else {
      formik.setFieldTouched("network", true);
      formik.setFieldTouched("amount", true);
      formik.setFieldTouched("phone", true);
    }
  };

  return (
    <div>
      <main className="pb-[40px]">
        <div className="w-[100vw] xl:-mt-24 flex justify-center lg:-ml-[-10vw] xl:justify-center">
          <div className="mx-4 bg-[#FFFFFF] pb-4 shadow-md rounded-sm overflow-hidden">
            <h4 className="flex justify-center text-xl leading-5 font-plus-jakarta font-bold my-4">
              Buy Airtime
            </h4>
            {/* <h4 className="text-lg  leading-5 font-plus-jakarta text-[#000000] font-[550] mx-3 md:mx-8">
              Most recent
            </h4>
            <article className="flex gap-3 mx-3 md:mx-8">
              {Array.isArray(info) && info.length > 0 ? (
                info.map((user) => {
                  const body = user.narration?.toLowerCase().includes("airtel")
                    ? "airtel"
                    : user.narration?.toLowerCase().includes("mtn")
                    ? "mtn"
                    : user.narration?.toLowerCase().includes("glo")
                    ? "glo"
                    : user.narration?.toLowerCase().includes("9mobile") ||
                      user.narration?.toLowerCase().includes("etisalat")
                    ? "etisalat"
                    : "default";

                  return (
                    <section
                      key={user._id}
                      className="flex flex-row gap-6 my-4"
                    >
                      <div className="flex flex-col gap-2">
                        <img
                          src={
                            body === "airtel"
                              ? "./images/airtel.jpg"
                              : body === "mtn"
                              ? "./images/mtn.jpg"
                              : body === "glo"
                              ? "./images/glos.png"
                              : body === "etisalat"
                              ? "./images/img4.jpg"
                              : "./images/default.jpg"
                          }
                          className="w-[40px] h-[40px] ml-4"
                          alt={user.narration}
                        />
                        <span className="text-[13px] ml-5 font-medium font-poppins leading-5">
                          {user.narration}
                        </span>
                        <span className="text-[13px] ml-1 font-medium font-poppins leading-5">
                          ₦{user.amount.toLocaleString()}
                        </span>
                      </div>
                    </section>
                  );
                })
              ) : (
                <div className="ml-8 my-5 text-lg text-green-500">
                  No recent Purchase
                </div>
              )}

         
            </article> */}
            <h4 className="text-lg leading-5 font-plus-jakarta text-[#000000] font-[550] mx-3 md:mx-8">
  Most recent
</h4>
<article className="flex gap-3 mx-3 md:mx-8">
  {transactions ? (
    <section className="flex flex-row gap-6 my-4">
      <div className="flex flex-col gap-2">
          <span
        className={`text-xs font-semibold px-2 py-1 rounded-full -ml-1 mt-1 w-fit ${
          transactions.status === "success"
            ? "bg-green-100 text-green-600"
            : transactions.status === "pending"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {transactions.status === "success" ? "✓ Success" :
         transactions.status === "pending" ? "⏳ Pending" : "✖ Failed"}
      </span>
        <img
          src={
            transactions.narration?.toLowerCase().includes("airtel")
              ? "./images/airtel.jpg"
              : transactions.narration?.toLowerCase().includes("mtn")
              ? "./images/mtn.jpg"
              : transactions.narration?.toLowerCase().includes("glo")
              ? "./images/glos.png"
              : transactions.narration?.toLowerCase().includes("9mobile") ||
                transactions.narration?.toLowerCase().includes("etisalat")
              ? "./images/img4.jpg"
              : "./images/default.jpg"
          }
          className="w-[40px] h-[40px] ml-4"
          alt="Network logo"
        />
        <span className="text-[13px] ml-3 text-gray-800 font-plus-jakarta font-medium leading-5">
             ₦{transactions?.amount?.toLocaleString() || '0'}
        </span>
     
      </div>
    </section>
  ) : (
    <div className="ml-8 my-5 text-lg text-green-500">
      No recent Purchase
    </div>
  )}
</article>

            <form className="w-[95%] mt-5 mx-2 md:mx-8 overflow-y-auto">
              <label
                htmlFor="network_id"
                className="text-[#101928] text-[14px] font-plus-jakarta font-medium mb-2"
              >
                Choose Network<span className="text-red-700">*</span>
              </label>
              <Select
                id="network"
                name="network"
                options={Networks}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                onChange={(option) => {
                  formik.setFieldValue("network", option.value);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "56px",
                    width: "95%",
                    fontWeight: "800",
                    padding: "5px",
                    marginBottom: "3vh",
                  }),
                }}
              />
              <div className="flex flex-row gap-2 py-3">
                {amounts.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => handlePick(item)}
                    className="p-4 rounded-lg leading-5 text-[#000000] flex justify-center items-center text-[16px] font-bold bg-blue-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <label
                htmlFor="amount"
                className="text-[#101928] text-[14px] font-medium font-plus-jakarta mb-2 mx-2"
              >
                Amount<span className="text-red-700">*</span>
              </label>
              <input
                id="outlined-required-2"
                placeholder="Amount"
                type="text"
                name="amount"
                autoComplete="off"
                {...formik.getFieldProps("amount")}
                className="border-2 border-gray-400 focus:outline-none h-[60px] w-[95%] rounded-lg text-[16px] pl-2 mx-2 mb-5"
              />
              {formik.touched.amount && formik.errors.amount ? (
                <div style={{ color: "red", marginTop: "-10px" }}>
                  {formik.errors.amount}
                </div>
              ) : null}

              <label
                htmlFor="phone"
                className="text-[#101928] text-[14px] font-medium font-plus-jakarta mb-2 mx-2"
              >
                Phone Number <span className="text-red-700">*</span>
              </label>
              <input
                id="outlined-required-3"
                placeholder="PhoneNumber"
                type="tel"
                name="phone"
                autoComplete="off"
                {...formik.getFieldProps("phone")}
                className="border-2 border-gray-400 focus:outline-none h-[60px] w-[95%] rounded-lg text-[14px] pl-2 mb-5 mx-2"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div style={{ color: "red", marginTop: "-12px" }}>
                  {formik.errors.phone}
                </div>
              ) : null}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="w-[35%] p-2 bg-blue-600 text-white font-bold rounded-lg mt-4"
                  onClick={validateFields}
                >
                  Buy Airtime
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Airtime;
