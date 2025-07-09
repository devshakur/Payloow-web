import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast, Toaster } from "react-hot-toast";
import { Box, TextField } from '@mui/material';
import useBills from '../../hooks/useBills';

export default function WithdrawFund({ isOpens, onClosed }) {
      const {WithdrawFund} = useBills()
    const [amount, setAmount] = useState()
    const [bankAccount, setBankAccount] = useState('')
    const [bankCode, setBankCode] = useState('')
    const [accountName, setAccountName] = useState('')
    const [loading, setLoading] = useState(false)

   const withdrawFunds = async () => {
  setLoading(true);
  try {
    const data = {
  "amount": amount,
  "bankDetails": {
    "account_number": bankAccount,
    "bank_code": bankCode,
    "account_name": accountName
  }
}

    const response = await WithdrawFund(data);
    const result = response.data;

    // Assuming the URL is in result.data.url or result.url
    const redirectUrl = result?.url || result?.data?.url;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      toast.error("Redirect URL not found in response.");
    }


  } catch (error) {
    const ErrMsg = error?.response?.data?.message || error?.response?.data?.error || error?.message
    toast.error(ErrMsg || "Something went wrong")
      
  } finally {
    setLoading(false)
      onClose();
  }
};

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Withdraw From Wallet
                  </Dialog.Title>

                  <div className="mt-4">
                    <Box
                      component="form"
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Bank Account"
                        variant="outlined"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}

                        fullWidth
                      />
                       <TextField
                        label="Bank Code"
                        variant="outlined"
                        type="number"
                        value={bankCode}
                        onChange={(e) => setBankCode(e.target.value)}
                        fullWidth   
                      />
                      <TextField
                        label="Account Name"
                        variant="outlined"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                      />
                    </Box>
                  </div>

                  <div className="mt-6 w-full flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={withdrawFunds}
                    >
                      {loading ? <div className="loader"></div> : "Proceed to Withdraw funds"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <Toaster />
        </Dialog>
      </Transition>
    </>
  );
}
