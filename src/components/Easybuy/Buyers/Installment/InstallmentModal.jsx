import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useRouter } from '../../../../Routes/router';

const InstallmentModal = ({ isOpen, setIsOpen, orders }) => {
  const router = useRouter()
  const [productName, setProductName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [dueDates, setDueDates] = useState([]);
  const [pendingAmount, setPendingAmount] = useState(0);

  useEffect(() => {
    // Log the orders data for debugging
    console.log("Orders data:", orders);

    if (orders && orders.length > 0) {
      const firstOrder = orders[0];

      // Set the product name
      setProductName(firstOrder.productName || 'Product Name Not Available');
      // Set the total amount
      setTotalAmount(firstOrder.totalAmount || 0);
      // Set the remaining balance
      setRemainingBalance(firstOrder.remainingBalance || 0);

      // Extract and set due dates (including amount and status)
      const formattedDueDates = firstOrder.dueDates.map(dueDate => {
        // Parse the date string using Date constructor
        const [month, day, year] = dueDate.dueDate.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}`);

        // Check for invalid date
        if (isNaN(formattedDate)) {
          return {
            dueDate: 'Invalid Date',
            amount: dueDate.amount,
            status: dueDate.status,
          };
        }

        // Format the due date
        const formattedDueDate = formattedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        return {
          dueDate: formattedDueDate,
          amount: dueDate.amount,
          status: dueDate.status,
        };
      }) || [];
      setDueDates(formattedDueDates);

      // Calculate pending amount (assuming remaining balance is the amount left to pay)
      const totalPaid = firstOrder.totalPaidAmount ? parseFloat(firstOrder.totalPaidAmount.replace('', '').replace(',', '')) : 0;
      setPendingAmount(firstOrder.totalAmount - totalPaid);
    } else {
      // Fallback if no orders are available
      setProductName('Product Name Not Available');
      setTotalAmount(0);
      setRemainingBalance(0);
      setDueDates([]);
      setPendingAmount(0);
    }
  }, [orders, isOpen]);

 const handlePay = ()=>{
  router.push('/buyers/dashboard')
  setIsOpen(false)
 }
  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-[50rem] space-y-4 bg-white p-12">
            <DialogTitle className="font-bold flex justify-between">
              <h3>Item Details</h3>
              <button onClick={() => setIsOpen(false)}>X</button>
            </DialogTitle>
            <Description>
              <div className="flex items-center justify-between gap-5 border border-gray-700 px-4">
                <div className="flex items-center">
                  <div><img src='/images/iphon-green.png' alt="iphone" /></div>
                  <p className="font-poppins text-xl font-medium">{productName}</p>
                </div>
                <div className="text-center">
                  {/* Display the total amount and due amount */}
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
                {/* Displaying status of the first installment */}
                <h6 className="text-[#E02D3C] font-poppins font-medium text-lg">
                  {dueDates.length > 0 ? dueDates[0].status : 'Pending'}
                </h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Payment Progress</h4>
                <img src="/images/bar.png" alt="bar" className="h-3 hidden md:block" />
                <p className="font-medium">0%</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Pending Amount</h4>
                <h6 className="font-poppins font-medium text-lg text-[#000]">₦{pendingAmount}</h6>
              </div>
              <div className="flex justify-between">
                <h4 className="font-poppins font-medium text-lg text-[#1D2433CC]">Next Due Dates</h4>
                <div>
                  {dueDates.length > 0 ? (
                    dueDates.map((dueDate, index) => (
                      <div key={index} className="flex justify-between">
                        {/* Display the next due dates */}
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
              <button className="w-full border border-blue-600 text-blue-700 py-3 rounded-lg" onClick={() => setIsOpen(false)}>Cancel</button>
              <button className="w-full bg-blue-700 text-white py-3 rounded-lg" onClick={handlePay}>Pay Now</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default InstallmentModal;








