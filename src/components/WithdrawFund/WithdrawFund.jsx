import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Box, TextField, MenuItem, CircularProgress } from "@mui/material";
import useBills from "../../hooks/useBills";
import { WalletEndpoints } from "../../api/Endpoint";
import axiosInstance from "../../AuthContext/axiosInstance";


export default function WithdrawFund({ isOpens, onClosed }) {
  const { WithdrawFund, VerifyBankAccount } = useBills();
  const [banks, setBanks] = useState([]);
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  // const [pin, setPin] = useState(["", "", "", ""]);

  const [showAllRecipients, setShowAllRecipients] = useState(false);

  const [bankCode, setBankCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [pin, setPin] = useState();
  const [hasAttemptedVerification, setHasAttemptedVerification] =
    useState(false);

  const fetchBankNames = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(WalletEndpoints.getbanklist);
      if (response.status === 200) {
        const bankArray = response.data?.data?.data || [];
        setBanks(bankArray);
      } else {
        throw new Error("Failed to fetch bank list");
      }
    } catch (error) {
      console.error("Bank fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipients = async () => {
    try {
      const res = await axiosInstance.get("/wallet/recipients");
      if (res?.data?.success) {
        setRecipients(res.data.data);
      } else {
        toast.error("Failed to load saved recipients");
      }
    } catch (error) {
      console.error("Error fetching recipients:", error.message);
      toast.error("Error loading recipients");
    }
  };

  useEffect(() => {
    if (isOpens) {
      fetchBankNames();
      fetchRecipients();
    }
  }, [isOpens]);

  // Automatically verify when 10 digits are entered
  useEffect(() => {
    const shouldVerify = bankAccount.length === 10 && bankCode;
    if (shouldVerify) {
      verifyAccount(bankAccount, bankCode);
    }
  }, [bankAccount, bankCode]);

  const verifyAccount = async (accountNumber, bankCode) => {
    try {
      setVerifying(true);
      setHasAttemptedVerification(true); // ✅ mark attempt
      const res = await axiosInstance.get(
        `${WalletEndpoints.verifyCustomerAccount}?account_number=${accountNumber}&bank_code=${bankCode}`
      );
      const resolvedData = res?.data?.data?.data;
      if (!resolvedData?.account_name) throw new Error("Account not found");
      setAccountName(resolvedData.account_name);
      toast.success("Account verified");
    } catch (error) {
      setAccountName(""); // Clear on error
      toast.error("Invalid account details");
      console.error(
        "Verification error:",
        error?.response?.data || error.message
      );
    } finally {
      setVerifying(false);
    }
  };

  const withdrawFunds = async () => {
    // Validate inputs before submission
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!bankAccount || !bankCode || !accountName) {
      toast.error("Please provide complete bank details");
      return;
    }

    if (!pin || pin.length !== 4) {
      toast.error("Please enter a valid 4-digit PIN");
      return;
    }

    const payload = {
      amount: Number(amount),
      bankDetails: {
        name: accountName,
        accountNumber: bankAccount,
        bankCode: bankCode,
      },
      transactionPin: pin
    };


    try {
      setLoading(true);
      const response = await WithdrawFund(payload);
      
      // Check for success response
      if (response?.data?.success) {
        toast.success("Transfer initiated successfully");
        const redirectUrl = response?.data?.url || response?.data?.data?.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        // Handle successful API call but with error in response
        toast.error(response?.data?.message || "Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("WithdrawFund error:", error);
      const ErrMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      toast.error(ErrMsg || "Something went wrong");
    } finally {
      setLoading(false);
      setShowPinModal(false);
      onClosed();
    }
  };

  return (
    <Transition appear show={isOpens} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClosed}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex min-h-[80%] items-center justify-center px-4 py-16 text-center">
                <Dialog.Panel className="w-[70%] sm:w-full max-w-[500px] transform overflow-visible rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Transfer from Wallet
                  </Dialog.Title>

                  {/* <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      Saved Beneficiaries
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-1 max-w-full">
                      <div className="flex gap-3 min-w-[480px]">
                        {recipients.length > 0 ? (
                          recipients.map((b, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedBank(b.bankName);
                                setBankCode(b.bankCode);
                                setBankAccount(b.accountNumber);
                                setAccountName(b.name);
                              }}
                              className="min-w-[160px] cursor-pointer rounded-lg border-none shadow-md p-3 bg-white transition-all duration-150"
                            >
                              <p className="font-semibold text-gray-800 truncate">
                                {b.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {b.accountNumber}
                              </p>
                              <p className="text-xs text-gray-400 truncate">
                                {b.bankName}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No saved beneficiaries
                          </p>
                        )}
                      </div>
                    </div>
                  </div> */}
                  <div className="mt-3 relative">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      Saved Beneficiaries
                    </h4>

                    <div className="flex gap-3 overflow-x-auto pb-1 max-w-full items-center">
                      <div className="flex gap-3 min-w-[480px]">
                        {(showAllRecipients
                          ? recipients
                          : recipients.slice(0, 3)
                        ).map((b, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedBank(b.bankName);
                              setBankCode(b.bankCode);
                              setBankAccount(b.accountNumber);
                              setAccountName(b.name);
                            }}
                            className="min-w-[160px] cursor-pointer rounded-lg border-none shadow-md p-3 bg-white transition-all duration-150"
                          >
                            <p className="font-semibold text-gray-800 truncate">
                              {b.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {b.accountNumber}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {b.bankName}
                            </p>
                          </div>
                        ))}
                      </div>

                      {recipients.length > 3 && (
                        <button
                          onClick={() => setShowAllRecipients((prev) => !prev)}
                          className="min-w-[100px] px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium"
                        >
                          {showAllRecipients ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <Box
                      component="form"
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        select
                        label="Bank Name"
                        value={selectedBank}
                        onChange={(e) => {
                          const selected = banks.find(
                            (b) => b.name === e.target.value
                          );
                          if (selected) {
                            setSelectedBank(selected.name);
                            setBankCode(selected.code); // ✅ bankCode will now be set for verification
                            setAccountName("");
                          }
                        }}
                        fullWidth
                      >
                        {banks.map((bank) => (
                          <MenuItem key={bank.code} value={bank.name}>
                            {bank.name}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        label="Account Number"
                        variant="outlined"
                        value={bankAccount}
                        onChange={(e) =>
                          setBankAccount(e.target.value.slice(0, 10))
                        }
                        type="number"
                        fullWidth
                        InputProps={{
                          inputProps: {
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          },
                          sx: {
                            "& input[type=number]::-webkit-outer-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input[type=number]::-webkit-inner-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input[type=number]": {
                              MozAppearance: "textfield",
                            },
                          },
                        }}
                      />
                      <div className="flex flex-col w-full border shadow-lg rounded-md p-3 bg-gray-50">
                        <span className="text-sm text-gray-500 mb-1">
                          Account Name
                        </span>
                        <div className="flex items-center gap-2 min-h-[15px]">
                          {accountName ? (
                            <span className="font-medium text-green-700">
                              {accountName}
                            </span>
                          ) : hasAttemptedVerification && !verifying ? (
                            <span className="text-red-400">
                              Invalid account details
                            </span>
                          ) : null}
                          {verifying && <CircularProgress size={16} />}
                        </div>
                      </div>

                      <TextField
                        label="Narration (Optional)"
                        value={narration}
                        onChange={(e) => setNarration(e.target.value)}
                        fullWidth
                      />

                      <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        InputProps={{
                          inputProps: {
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          },
                          sx: {
                            "& input[type=number]::-webkit-outer-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input[type=number]::-webkit-inner-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input[type=number]": {
                              MozAppearance: "textfield",
                            },
                          },
                        }}
                      />
                        <TextField
                        label="Pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        fullWidth
                      />
                    </Box>
                  </div>

                  <div className="mt-6 w-full flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                      onClick={() => {
                        if (
                          !amount ||
                          !bankAccount ||
                          !bankCode ||
                          !accountName
                        ) {
                          toast.error("All fields are required");
                          return;
                        }
                        // Set showPinModal to true instead of directly calling withdrawFunds
                        // setShowPinModal(true);
                        withdrawFunds();
                      }}
                      disabled={loading || !accountName}
                    >
                      {loading ? "Processing..." : "Proceed to transfer funds"}
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
        <Toaster />
      </Dialog>
 {/* Show Pin Modal */}
    </Transition>
  );
}




// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { Box, TextField, MenuItem, CircularProgress } from "@mui/material";
// import useBills from "../../hooks/useBills";
// import { WalletEndpoints } from "../../api/Endpoint";
// import axiosInstance from "../../AuthContext/axiosInstance";

// export default function WithdrawFund({ isOpens, onClosed }) {
//   const { WithdrawFund } = useBills();
//   const [banks, setBanks] = useState([]);
//   const [amount, setAmount] = useState(0);
//   const [narration, setNarration] = useState("");
//   const [bankAccount, setBankAccount] = useState("");
//   const [selectedBank, setSelectedBank] = useState("");
//   const [bankCode, setBankCode] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [recipients, setRecipients] = useState([]);
//   const [showAllRecipients, setShowAllRecipients] = useState(false);
//   const [hasAttemptedVerification, setHasAttemptedVerification] = useState(false);
//   const [showPinModal, setShowPinModal] = useState(false);
//   const [pin, setPin] = useState(["", "", "", ""]);

//   useEffect(() => {
//     if (isOpens) {
//       fetchBankNames();
//       fetchRecipients();
//     }
//   }, [isOpens]);

//   useEffect(() => {
//     if (bankAccount.length === 10 && bankCode) {
//       verifyAccount(bankAccount, bankCode);
//     }
//   }, [bankAccount, bankCode]);

//   const fetchBankNames = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(WalletEndpoints.getbanklist);
//       setBanks(response.data?.data?.data || []);
//     } catch {
//       toast.error("Failed to fetch bank list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRecipients = async () => {
//     try {
//       const res = await axiosInstance.get("/wallet/recipients");
//       if (res?.data?.success) setRecipients(res.data.data);
//       else toast.error("Failed to load saved recipients");
//     } catch {
//       toast.error("Error loading recipients");
//     }
//   };

//   const verifyAccount = async (accountNumber, bankCode) => {
//     try {
//       setVerifying(true);
//       setHasAttemptedVerification(true);
//       const res = await axiosInstance.get(
//         `${WalletEndpoints.verifyCustomerAccount}?account_number=${accountNumber}&bank_code=${bankCode}`
//       );
//       const resolved = res?.data?.data?.data;
//       if (!resolved?.account_name) throw new Error();
//       setAccountName(resolved.account_name);
//       toast.success("Account verified");
//     } catch {
//       setAccountName("");
//       toast.error("Invalid account details");
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handlePinChange = (e, index) => {
//     const newPin = [...pin];
//     newPin[index] = e.target.value.replace(/\D/g, "");
//     setPin(newPin);
//     if (e.target.value && index < 3) {
//       document.getElementById(`pin-${index + 1}`)?.focus();
//     }
//   };

//   const handlePinBackspace = (e, index) => {
//     if (e.key === "Backspace" && !pin[index] && index > 0) {
//       document.getElementById(`pin-${index - 1}`)?.focus();
//     }
//   };

//   const submitWithPin = async () => {
//     // Validate inputs before submission
//     if (!amount || amount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     if (!bankAccount || !bankCode || !accountName) {
//       toast.error("Please provide complete bank details");
//       return;
//     }

//     const transactionPin = pin.join("");
//     if (transactionPin.length !== 4) {
//       toast.error("Please enter a complete 4-digit PIN");
//       return;
//     }

//     const payload = {
//       amount,
//       narration,
//       pin: transactionPin,
//       bankDetails: {
//         account_number: bankAccount,
//         bank_code: bankCode,
//         account_name: accountName,
//       },
//     };

//     try {
//       setLoading(true);
//       const response = await WithdrawFund(payload);
      
//       // Check for success response
//       if (response?.data?.success) {
//         toast.success("Transfer initiated successfully");
//         const redirectUrl = response?.data?.url || response?.data?.data?.url;
//         if (redirectUrl) {
//           window.location.href = redirectUrl;
//         }
//       } else {
//         // Handle successful API call but with error in response
//         toast.error(response?.data?.message || "Transfer failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("WithdrawFund error:", error);
//       const msg =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message;
//       toast.error(msg || "Something went wrong with the transfer");
//     } finally {
//       setLoading(false);
//       setShowPinModal(false);
//       setPin(["", "", "", ""]);
//       onClosed();
//     }
//   };

//   return (
//     <Transition appear show={isOpens} as={Fragment}>
//    <Dialog
//   as="div"
//   className="relative z-10"
//   // Only allow closing the main modal if the PIN modal is NOT open
//   onClose={() => {
//     // Prevent closing the main dialog when PIN modal is open
//     if (!showPinModal) {
//       // Reset all states when closing
//       setPin(["", "", "", ""]);
//       setBankAccount("");
//       setAccountName("");
//       setSelectedBank("");
//       setBankCode("");
//       setAmount(0);
//       setNarration("");
//       onClosed();
//     }
//   }}
// >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-[70%] sm:w-full max-w-[500px] mt-16 transform overflow-visible rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
//                   Transfer from Wallet
//                 </Dialog.Title>

//                 {/* Saved Beneficiaries */}
//                 <div className="mt-4">
//                   <h4 className="text-sm font-medium text-gray-600 mb-2">Saved Beneficiaries</h4>
//                   <div className="flex gap-3 overflow-x-auto pb-1 max-w-full items-center">
//                     <div className="flex gap-3 min-w-[480px]">
//                       {(showAllRecipients ? recipients : recipients.slice(0, 3)).map((b, i) => (
//                         <div
//                           key={i}
//                           onClick={() => {
//                             setSelectedBank(b.bankName);
//                             setBankCode(b.bankCode);
//                             setBankAccount(b.accountNumber);
//                             setAccountName(b.name);
//                           }}
//                           className="min-w-[160px] cursor-pointer rounded-lg border-none shadow-md p-3 bg-white"
//                         >
//                           <p className="font-semibold text-gray-800 truncate">{b.name}</p>
//                           <p className="text-sm text-gray-500 truncate">{b.accountNumber}</p>
//                           <p className="text-xs text-gray-400 truncate">{b.bankName}</p>
//                         </div>
//                       ))}
//                     </div>
//                     {recipients.length > 3 && (
//                       <button
//                         onClick={() => setShowAllRecipients((prev) => !prev)}
//                         className="min-w-[100px] px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium"
//                       >
//                         {showAllRecipients ? "Show Less" : "Show More"}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Form */}
//                 <div className="mt-4">
//                   <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                     <TextField
//                       select
//                       label="Bank Name"
//                       value={selectedBank}
//                       onChange={(e) => {
//                         const selected = banks.find((b) => b.name === e.target.value);
//                         if (selected) {
//                           setSelectedBank(selected.name);
//                           setBankCode(selected.code);
//                           setAccountName("");
//                         }
//                       }}
//                       fullWidth
//                     >
//                       {banks.map((bank) => (
//                         <MenuItem key={bank.code} value={bank.name}>
//                           {bank.name}
//                         </MenuItem>
//                       ))}
//                     </TextField>

//                     <TextField
//                       label="Account Number"
//                       value={bankAccount}
//                       onChange={(e) => setBankAccount(e.target.value.slice(0, 10))}
//                       type="number"
//                       fullWidth
//                       InputProps={{
//                         inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
//                       }}
//                     />

//                     <div className="flex flex-col border rounded-md p-2 bg-gray-50">
//                       <span className="text-sm text-gray-500 mb-1">Account Name</span>
//                       <div className="flex items-center gap-2 min-h-[15px]">
//                         {accountName ? (
//                           <span className="font-medium text-green-700">{accountName}</span>
//                         ) : hasAttemptedVerification && !verifying ? (
//                           <span className="text-red-400">Invalid account details</span>
//                         ) : null}
//                         {verifying && <CircularProgress size={16} />}
//                       </div>
//                     </div>

//                     <TextField
//                       label="Narration (Optional)"
//                       value={narration}
//                       onChange={(e) => setNarration(e.target.value)}
//                       fullWidth
//                     />

//                     <TextField
//                       label="Amount"
//                       type="number"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       fullWidth
//                     />
//                   </Box>
//                 </div>

//                 <div className="mt-6 flex justify-end">
//                   <button
//                     type="button"
//                     className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 disabled:opacity-50"
//                     onClick={() => {
//                       if (!amount || !bankAccount || !bankCode || !accountName) {
//                         toast.error("All fields are required");
//                         return;
//                       }
//                       setShowPinModal(true);
//                     }}
//                     disabled={loading || !accountName}
//                   >
//                     Proceed to transfer funds
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>

//         {/* PIN MODAL */}
//  {showPinModal && (
//         <div className="fixed inset-0 z-[200] overflow-y-auto">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={() => {
//               setShowPinModal(false);
//               setPin(["", "", "", ""]);
//             }}
//           ></div>

//           {/* Modal Content */}
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <div 
//               className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative z-[300]"
//               onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching backdrop
//             >
//               <h3 className="text-lg font-semibold mb-4 text-center">
//                 Enter Transaction PIN
//               </h3>

//               <div className="flex justify-between mb-6 gap-2">
//                 {pin.map((digit, i) => (
//                   <input
//                     key={i}
//                     id={`pin-${i}`}
//                     type="tel"
//                     inputMode="numeric"
//                     maxLength={1}
//                     value={digit}
//                     className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none"
//                     onChange={(e) => handlePinChange(e, i)}
//                     onKeyDown={(e) => handlePinBackspace(e, i)}
//                     autoFocus={i === 0}
//                   />
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-full"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent event bubbling
//                     setShowPinModal(false);
//                     setPin(["", "", "", ""]);
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 w-full"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent event bubbling
//                     submitWithPin();
//                   }}
//                   disabled={pin.join("").length !== 4 || loading}
//                 >
//                   {loading ? "Processing..." : "Confirm Transfer"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


//         <Toaster />
//       </Dialog>
//     </Transition>
//   );
// }
