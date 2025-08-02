import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useRouter } from '../../../../Routes/router';

const InstallmentModal = ({ isOpen, setIsOpen, selectedOrder }) => {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [productImg, setProductImg] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [dueDates, setDueDates] = useState([]);
  const [status, setStatus] = useState({})
  const [totalPaid, setTotalPaid] = useState([])
  const [pendingAmount, setPendingAmount] = useState(0);
  const [showAllDueDates, setShowAllDueDates] = useState(false);

  useEffect(() => {
    if (selectedOrder) {
      console.log(selectedOrder);
      setProductName(selectedOrder.productName || 'Product Name Not Available');
      setProductImg(selectedOrder.productImg)
      setTotalAmount(selectedOrder.totalAmount || 0);
      setRemainingBalance(selectedOrder.remainingBalance || 0);
       setStatus(selectedOrder.nextDueDetails || 'Pending')
       setTotalPaid(selectedOrder.totalPaidAmount)
      const formattedDueDates = (selectedOrder.dueDates || []).map((dueDate) => {
        const [month, day, year] = dueDate.dueDate.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}`);

        return {
          dueDate: isNaN(formattedDate)
            ? 'Invalid Date'
            : formattedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
          amount: dueDate.amount,
          status: dueDate.status,
        };
      });
      setDueDates(formattedDueDates);

      const firstPendingInstallment = selectedOrder.installmentDetails?.installments.find(
        (installment) => installment.status === 'pending'
      );
      setPendingAmount(firstPendingInstallment ? firstPendingInstallment.amount : 0);
    }
  }, [selectedOrder]);

  const handlePay = () => {
    router.push('/buyers/dashboard');
    setIsOpen(false);
  };

  const visibleDueDates = showAllDueDates ? dueDates : dueDates.slice(0, 5);

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-auto"> {/* Center and allow scrolling */}
          <DialogPanel className="w-full max-w-md md:max-w-lg lg:max-w-3xl space-y-2 bg-white p-3 md:p-8 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"> {/* Limit height and enable scrolling */}
            <DialogTitle className="text-2xl font-semibold text-gray-900 flex justify-between items-center"> {/* Improved typography */}
              Item Details
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                X
              </button>
            </DialogTitle>
            <Description>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-200 rounded-lg p-4"> 
                <div className="flex items-center mb-3 md:mb-0">
                  {/* <div>
                    <img src={productImg || "/images/iphon-green.png"} alt="iphone" className="w-20 h-20 object-cover rounded-lg" /> 
                  </div> */}
                  <p className="font-plus-jakarta text-xl font-medium ml-4 text-gray-800">{productName}</p> 
                </div>
                <div className="text-center">
                  {dueDates.length > 0 && (
                    <h4 className="font-medium text-lg font-plus-jakarta text-gray-700"> {/* Improved typography */}
                      ₦{totalAmount} or {dueDates[0].amount}
                    </h4>
                  )}
                  <h5 className="font-plus-jakarta text-lg text-gray-500 font-normal"> {/* Improved typography */}
                    With 4 months easybuy special financing
                  </h5>
                </div>
              </div>
            </Description>
            <div className="grid gap-4"> {/* Use grid layout */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-poppins font-medium text-gray-700">Product Name</h4> {/* Improved typography */}
                <h6 className="font-poppins font-medium text-gray-900">{productName}</h6> {/* Improved typography */}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-poppins font-medium text-gray-700">Status</h4> {/* Improved typography */}
                <h6 className="text-[#E02D3C] font-poppins font-medium">{status.time}</h6> {/* Improved typography */}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-poppins font-medium text-gray-700">Payment Progress</h4> {/* Improved typography */}
                <img src="/images/bar.png" alt="bar" className="h-3 hidden md:block" />
                <p className="font-medium text-gray-900">0%</p> {/* Improved typography */}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-poppins font-medium text-gray-700">Paid Amount</h4> {/* Improved typography */}
                <h6 className="font-poppins font-medium text-gray-900">₦{totalPaid}</h6> {/* Improved typography */}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-poppins font-medium text-gray-700">Pending Amount</h4> {/* Improved typography */}
                <h6 className="font-poppins font-medium text-gray-900">₦{remainingBalance}</h6> {/* Improved typography */}
              </div>
              <div>
                <h4 className="font-poppins font-medium text-gray-700 mb-2">Next Due Dates</h4> {/* Improved typography */}
                <div className="max-h-48 overflow-y-auto"> {/* Scrollable container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> {/* Grid layout for due dates */}
                    {visibleDueDates.length > 0 ? (
                      visibleDueDates.map((dueDate, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3"> {/* Due date card */}
                          <h6 className="font-poppins font-medium text-sm text-gray-700">{dueDate.dueDate}</h6> {/* Improved typography */}
                          <p className="font-poppins text-sm text-gray-900">Amount: {dueDate.amount}</p> {/* Improved typography */}
                        </div>
                      ))
                    ) : (
                      <h6 className="font-poppins font-medium text-gray-700">No Due Dates Available</h6> 
                    )}
                  </div>
                </div>
                {dueDates.length > 5 && !showAllDueDates && (
                  <button
                    onClick={() => setShowAllDueDates(true)}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full"> {/* Responsive button layout */}
              <button className="w-full border border-blue-600 text-blue-700 py-3 rounded-lg hover:bg-blue-50" onClick={() => setIsOpen(false)}> {/* Improved button styling */}
                Cancel
              </button>
              <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors" onClick={handlePay}> {/* Improved button styling */}
                Pay Now
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default InstallmentModal;
