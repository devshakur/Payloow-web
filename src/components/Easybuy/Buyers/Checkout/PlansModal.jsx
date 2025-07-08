import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const formatCurrency = (amount) =>
  `₦${Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

const PlansModal = ({ isOpen, setIsOpen, planDetails, onProceed, loading }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 space-y-6">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Installment Breakdown
            </DialogTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Initial Payment</p>
                <p className="text-lg text-blue-600">
                  {formatCurrency(planDetails.initialPayment)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Installment Base</p>
                <p className="text-lg text-blue-600">
                  {formatCurrency(planDetails.installmentBase)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Interest Amount</p>
                <p className="text-lg text-blue-600">
                  {formatCurrency(planDetails.interestAmount)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-600">Total Amount</p>
                <p className="text-lg text-blue-600">
                  {formatCurrency(planDetails.totalAmount)}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-700">
                Installments
              </h4>
              <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {planDetails.installments?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm flex justify-between items-center"
                  >
                    <span>{formatCurrency(item.amount)}</span>
                    <span className="text-gray-500">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t p-4 flex justify-end gap-4 bg-white">
            <button
              onClick={() => setIsOpen(false)}
              className="border border-gray-300 px-5 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={onProceed}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition flex items-center justify-center min-w-[160px]"
              disabled={loading}
            >
              {loading ? (
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Proceed to Paystack"
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PlansModal;
