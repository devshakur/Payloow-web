import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import useBills from '../../hooks/useBills';
import { toast, Toaster } from "react-hot-toast";


export default function FundModal({isOpen, onClose}) {
    const {DepositFund} = useBills()
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)

   const depositFunds = async () => {
  setLoading(true);
  try {
    const data = {
      amount: amount,
      merchant: "paystack"
    };

    const response = await DepositFund(data);
    const result = response.data;

    // Assuming the URL is in result.data.url or result.url
    const redirectUrl = result?.url || result?.data?.url;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      toast.error("Redirect URL not found in response.");
    }


  } catch (error) {
    const ErrMsg = error?.response?.data?.msg || error?.response?.data?.error || error?.message
    toast.error(ErrMsg)
      
  } finally {
    setLoading(false)
      onClose();
  }
};

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                   <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">₦</InputAdornment>}
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
          />
        </FormControl>
                  </div>

                  <div className="mt-4 w-full flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={depositFunds}
                    >
                      {loading ? <div className="loader"></div> : "Proceed to payment"}
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
  )
}
