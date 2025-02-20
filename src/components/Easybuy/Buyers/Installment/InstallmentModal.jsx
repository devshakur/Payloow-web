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

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-[50rem] space-y-4 bg-white px-12">
            <DialogTitle className="font-bold flex justify-between">
              <h3>Item Details</h3>
              <button onClick={() => setIsOpen(false)}>X</button>
            </DialogTitle>
            <Description>
              <div className="flex items-center justify-between gap-5 border border-gray-700 px-4">
                <div className="flex items-center">
                  <div>
                    <img src={productImg || "/images/iphon-green.png"} alt="iphone" />
                  </div>
                  <p className="font-poppins text-xl font-medium">{productName}</p>
                </div>
                <div className="text-center">
                  {dueDates.length > 0 && (
                    <h4 className="font-medium text-lg font-poppins">
                      ₦{totalAmount} or {dueDates[0].amount}
                    </h4>
                  )}
                  <h5 className="font-poppins text-lg text-[#1D2433CC] font-normal">
                    With 4 months easybuy special financing
                  </h5>
                </div>
              </div>
            </Description>
            <div className="border border-gray-600 p-3 flex flex-col gap-4">
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Product Name</h4>
                <h6 className="font-poppins font-medium text-lg text-[#000]">{productName}</h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Status</h4>
                <h6 className="text-[#E02D3C] font-poppins font-medium text-lg">
                  {status.time}
                </h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Payment Progress</h4>
                <img src="/images/bar.png" alt="bar" className="h-3 hidden md:block" />
                <p className="font-medium">0%</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Paid Amount</h4>
                <h6 className="font-poppins font-medium text-lg text-[#000]">{totalPaid}</h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Pending Amount</h4>
                <h6 className="font-poppins font-medium text-lg text-[#000]">{remainingBalance}</h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Next Due Dates</h4>
                <div>
                  {dueDates.length > 0 ? (
                    dueDates.map((dueDate, index) => (
                      <div key={index} className="flex justify-between">
                        <h6 className="font-poppins font-medium text-lg text-[#000]">{dueDate.dueDate}</h6>
                      </div>
                    ))
                  ) : (
                    <h6 className="font-poppins font-medium text-lg text-[#000]">No Due Dates Available</h6>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <button className="w-full border border-blue-600 text-blue-700 py-3 rounded-lg" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="w-full bg-blue-700 text-white py-3 rounded-lg" onClick={handlePay}>
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
