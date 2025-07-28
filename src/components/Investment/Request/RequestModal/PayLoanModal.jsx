import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { CloseCircle, Wallet3, ArrowRight2 } from "iconsax-react";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import useInvestment from "../../../../hooks/useInvetment";
import useBills from "../../../../hooks/useBills";
import { toast } from "react-hot-toast";

const PayLoanModal = ({ isOpen, onClose, data, repayInvestment }) => {
  const { getUserDetails } = useInvestment();
  const { GetUserBalance } = useBills();
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedInstallments, setSelectedInstallments] = useState([]);

  const currentDate = new Date();

  useEffect(() => {
    const userDetails = async () => {
      try {
        const resp = await getUserDetails();
        let info = resp?.data?.data?.user;
        let balance = resp?.data?.data?.wallet;

        if (info) {
          setUser(info);
          setWallet(balance);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    userDetails();
  }, []);

  const GetWalletBalance = async () => {
    try {
      const resp = await GetUserBalance();
      const balanceString = resp?.data?.data?.balance?.["$numberDecimal"];
      if (balanceString !== undefined) {
        const balanceNumber = Number(balanceString);
        setWalletBalance(balanceNumber);
      } else {
        toast.error("Unable to retrieve wallet balance.");
      }
    } catch (error) {
      toast.error("Failed to fetch wallet balance");
    }
  };

  const isOverdue = (date) => {
    return new Date(date) < currentDate;
  };

  const handleSelectInstallment = (installmentId, amount) => {
    setSelectedInstallments((prevSelected) => {
      const exists = prevSelected.find((item) => item._id === installmentId);
      if (exists) {
        return prevSelected.filter((item) => item._id !== installmentId);
      } else {
        return [...prevSelected, { _id: installmentId, amount }];
      }
    });
  };

  const totalSelectedAmount = selectedInstallments
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    .toFixed(2);

  const selectedIds = selectedInstallments.map((item) => item._id);

const handleRepay = () => {
  if (selectedInstallments.length === 0) return;

  const payments = selectedInstallments.map((item) => ({
    installmentId: item._id,
    amount: item.amount,
  }));

  // Make sure data?.id is the correct investmentRequestId
  repayInvestment(data?.id, { payments });
};







  useEffect(() => {
    GetWalletBalance();
  }, []);

  const formattedBalance =
    typeof walletBalance === "number"
      ? new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(walletBalance)
      : "₦0.00";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 lg:inset-x-[7rem] z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-xl p-6 bg-white duration-300 ease-out"
          >
            <div className="flex justify-between">
              <DialogTitle
                as="h3"
                className="text-[#1D2433] font-poppins font-semibold text-xl"
              >
                Pay Loan For this Business
              </DialogTitle>
              <CloseCircle size="30" color="black" onClick={onClose} />
            </div>

            <form className="my-3">
              <Field>
                <Label className="text-sm font-poppins text-[#1D2433] font-semibold">
                  Total Repayment Amount
                </Label>
                <Input
                  type="text"
                  value={`₦${totalSelectedAmount}`}
                  disabled
                  className={clsx(
                    "border border-[#D0D5DD] block w-full rounded-lg py-4 px-3 text-sm font-semibold cursor-pointer mb-3"
                  )}
                />

                <div className="flex justify-between my-7">
                  <div className="flex gap-2 items-center">
                    <span className="bg-[#F1F3F9] rounded-[50%] p-2">
                      <Wallet3 size="24" color="#1D2433CC" />
                    </span>
                    <p className="font-plus-jakarta text-[#000000] text-sm font-medium">
                      Wallet ({formattedBalance})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <p className="text-[#1E3DD7] text-sm font-poppins font-normal">
                      Fund Wallet
                    </p>
                    <ArrowRight2 size="17" color="#1E3DD7" />
                  </div>
                </div>

                <div className="border-2 border-gray-100 px-4 py-3 grid gap-3">
                  <div className="flex justify-between">
                    <p className="text-[#1D2433CC] font-poppins font-medium text-md">
                      Loan Amount
                    </p>
                    <p className="font-poppins font-medium text-md text-[#000000]">
                      ₦{data.amount}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-semibold text-[#1D2433] mb-2">
                      Select Repayment Dates
                    </p>
                    <div className="flex flex-col gap-3">
                      {Array.isArray(data.repaymentSchedule) &&
                        data.repaymentSchedule.map((item) => {
                          const formattedDate = format(
                            new Date(item.dueDate),
                            "dd/MM/yyyy"
                          );
                          const amount = parseFloat(
                            item.amount?.["$numberDecimal"] || 0
                          ).toFixed(2);
                          const isChecked = selectedInstallments.find(
                            (i) => i._id === item._id
                          );
                          const isPaid = item.status === "paid";

                          return (
                            <label
                              key={item._id}
                              className={clsx(
                                "flex justify-between items-center border p-2 rounded-md",
                                isPaid
                                  ? "bg-gray-100 opacity-60 cursor-not-allowed"
                                  : "border-gray-200"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={!!isChecked}
                                  onChange={() =>
                                    handleSelectInstallment(item._id, amount)
                                  }
                                  className="w-4 h-4"
                                  disabled={isPaid}
                                />
                                <p className="text-sm font-medium">
                                  {formattedDate}
                                </p>
                                {isOverdue(item.dueDate) && !isPaid && (
                                  <span className="text-red-500 text-xs font-semibold ml-1">
                                    Overdue
                                  </span>
                                )}
                                {isPaid && (
                                  <span className="text-green-600 text-xs font-semibold ml-1">
                                    Paid
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[#1D2433]">
                                ₦{amount}
                              </p>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </Field>

              <div className="w-full flex lg:justify-end">
               <Button
  onClick={handleRepay}
  className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-2 px-2 text-md text-white mt-6 disabled:opacity-50"
  disabled={selectedInstallments.length === 0}
>
  Repay Now
</Button>
              </div>
            </form>

            <Toaster />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PayLoanModal;

