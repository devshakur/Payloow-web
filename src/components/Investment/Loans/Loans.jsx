import React, { useState, useEffect } from "react";
import { SliderVertical1 } from "iconsax-react";
import clsx from "clsx";
import DebtorLayoutPage from "../Debtor/DebtorLayoutPage";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
} from "@headlessui/react";
import { CloseCircle } from "iconsax-react";
import Success from "./Success";
import useInvestment from "./../../../hooks/useInvetment";
import Modal from "../Debtor/Business/BusinessModal/Modal";
import StageTwo from "../Debtor/Business/BusinessModal/StageTwo";
import Loan from "../Debtor/Business/BusinessModal/Loan";
import { Toaster, toast } from "react-hot-toast";
import LoanCard from "../../LoanCard";

const Loans = () => {
  const { AddLoan, ViewBusiness, } = useInvestment();
  const [data, setData] = useState({
  loan_amount: "",
  credit_score: "",
  collateral: "",
  proofOfCreditScoreFile: null,
  proofOfCollateralFile: null,
});

  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("one");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [businessData, setBusinessData] = useState({});
  const [user, setUser] = useState({});
  const [links, setLinks] = useState({});
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [businesslinks, setBusinessLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

 

  

  useEffect(() => {
    const businessDetails = async () => {
      try {
        const response = await ViewBusiness();
        const businesses = response.data;
        setData(businesses);

      

        toast.success("All open businesses have been approved.");
      } catch (error) {
        console.error("Error processing businesses:", error);
        toast.error("Failed to fetch or update businesses.");
      } finally {
        setLoading(false);
      }
    };

    businessDetails();
  }, []);

  const handleView = (id) => {
  setSelectedBusinessId(id);
  setIsOpen(true);
};


  
const addingLoan = async () => {
  if (!selectedBusinessId) {
    setError("Please select a business first");
    return;
  }

  const {
    loan_amount,
    credit_score,
    collateral,
    proofOfCreditScoreFile,
    proofOfCollateralFile,
  } = data;

  if (
    !loan_amount ||
    !credit_score ||
    !collateral ||
    !proofOfCreditScoreFile ||
    !proofOfCollateralFile
  ) {
    setError("Please fill in all fields and upload all required documents");
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("businessId", selectedBusinessId);
    formData.append("loan_amount", loan_amount);
    formData.append("credit_score", credit_score);
    formData.append("collateral", collateral);
    formData.append("proofOfCreditScoreFile", proofOfCreditScoreFile);
    formData.append("proofOfCollateralFile", proofOfCollateralFile);

    const resp = await AddLoan(formData);
    if (resp) openSuccessModal();
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
;




 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setData((prevData) => ({ ...prevData, [name]: value }));
};


  const openDialog = () => setIsOpened(true);
  const closeDialog = () => setIsOpened(false);
  const openSuccessModal = () => {
    closeDialog();
    setIsSuccessModalOpen(true);
  };
  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const goToStageTwo = () => setActive("two");
  const goToStageOne = () => setActive("one");

  const openAddLoan = (businessId) => {
     setSelectedBusinessId(businessId); // 👈 Set the selected business
    openDialog();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = business.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(business.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <DebtorLayoutPage>
      <main>
        <header className="bg-[#DBE7FE] px-12 shadow-lg rounded-md">
          <h1 className="font-poppins text-[28px] py-4 font-semibold">
            Add a Loan to Fuel Your Business Growth
          </h1>
          <p className="lg:w-[70%] my-5 lg:-my-0 text-[22px] font-medium text-black font-poppins">
            Secure the funding your business needs to thrive. Provide the loan
            details, and take a step closer to bringing your vision to life.
          </p>
          <div className="flex justify-center lg:justify-end lg:relative lg:-top-[9rem]">
            <img src="/images/loan.png" className="h-[15rem]" alt="person" />
          </div>
          <div className="my-9 lg:-my-[12rem]">
            <Button
              onClick={openDialog}
              className="w-full lg:w-1/6 font-poppins rounded-lg bg-[#3369F4] py-3 lg:mb-4 my-5 px-4 mb-4 text-white mt-6 text-xl"
            >
              Add Loan
            </Button>
           <Dialog
  open={isOpened}
  as="div"
  className="relative z-50 focus:outline-none"
  onClose={closeDialog}
>
  {/* Overlay */}
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" aria-hidden="true" />

  {/* Modal container */}
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
    <DialogPanel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <DialogTitle as="h3" className="text-2xl font-bold text-gray-800">
          Add Loan
        </DialogTitle>
        <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600 transition">
          <CloseCircle size="28" />
        </button>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <Field>
          <div>
            <label htmlFor="loan_amount" className="block text-lg font-medium text-gray-700 mb-1">
              Loan Amount
            </label>
            <Input
              type="number"
              name="loan_amount"
              value={data.loan_amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="interest_rate" className="block text-lg font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <Input
              type="number"
              name="interest_rate"
              placeholder="Enter rate"
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="collateral" className="block text-lg font-medium text-gray-700 mb-1">
              Collateral
            </label>
            <Input
              type="text"
              name="collateral"
              value={data.collateral}
              onChange={handleInputChange}
              placeholder="Enter collateral"
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="credit_score" className="block text-lg font-medium text-gray-700 mb-1">
              Credit Score
            </label>
            <Input
              type="number"
              name="credit_score"
              value={data.credit_score}
              onChange={handleInputChange}
              placeholder="Enter credit score"
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
    Proof of Credit Score (5MB)
  </label>
  <Input
    type="file"
    name="proofOfCreditScoreFile"
    accept=".pdf,.jpg,.png"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error("File must be 5MB or less");
        return;
      }
      setData((prev) => ({
        ...prev,
        proofOfCreditScoreFile: file,
      }));
    }}
    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
          </div>

          <div>
           <label className="block text-lg font-medium text-gray-700 mb-1">
    Proof of Collateral (5MB)
  </label>
  <Input
    type="file"
    name="proofOfCollateralFile"
    accept=".pdf,.jpg,.png"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error("File must be 5MB or less");
        return;
      }
      setData((prev) => ({
        ...prev,
        proofOfCollateralFile: file,
      }));
    }}
    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
          </div>
        </Field>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <Button
            type="button"
            onClick={closeDialog}
            className="w-full sm:w-1/2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 text-center font-semibold transition"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={addingLoan}
            className="w-full sm:w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-3 text-center font-semibold transition"
          >
            {loading ? "Submitting..." : "Add Loan"}
          </Button>
        </div>
      </form>
    </DialogPanel>
  </div>
</Dialog>

            <Success isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
          </div>
        </header>

        <section className="lg:mt-[15rem]">
          <div className="flex justify-between mx-6">
            <h3 className="font-poppins font-medium text-xl">My Businesses</h3>
            <p className="font-poppins text-blue-500 font-medium text-xl">
              See all
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-10">
            {data && data.length > 0 ? (
              data.map((startup) => (
              <LoanCard
  key={startup.business_id}
  loan={startup}
  openAddLoan={openAddLoan}
  handleView={() => handleView(startup._id)}
/>

              ))
            ) : (
              <p>No businesses found.</p>
            )}
          </div>

          <div className="pagination flex justify-center lg:justify-end items-center space-x-3 py-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 text-lg font-medium border rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-blue-600 border-blue-500 bg-white hover:bg-blue-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </DebtorLayoutPage>
  );
};

export default Loans;
