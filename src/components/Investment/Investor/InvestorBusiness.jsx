import React, { useState, useEffect, startTransition } from "react";
import InvestorLayoutPage from "./InvestorLayoutPage";
import {
  Sort,
  SliderVertical1,
  Book1,
  Box2,
  Bubble,
  Bucket,
  BuyCrypto,
  ChartCircle,
  Drop,
  Bank,
  Decred,
  OceanProtocol,
} from "iconsax-react";
import useInvestment from "../../../hooks/useInvetment";
import SkeletonLoader from "../../Skeleton/SkeletalLoading";
import { Toaster, toast } from "react-hot-toast";
import InvestDialogModal from "./InvestDialogModal";
import UnifiedModal from "../Debtor/Business/BusinessModal/UnifiedModal";
import { useRouter } from "../../../Routes/router";

const InvestorBusiness = () => {
  const {
    GetLoanBusiness,
    InvestInBusiness,
  } = useInvestment();
  const router = useRouter();

  const [allBusinesses, setAllBusinesses] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("one");
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedField, setSelectedField] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    businessId: "",
    investmentAmount: "",
    expectedRoi: "",
    paymentFrequency: "",
    paymentTerm: "",
  });

  const field = [
    { name: "Technology", icon: OceanProtocol },
    { name: "Finance", icon: Box2 },
    { name: "HealthCare", icon: Decred },
    { name: "Education", icon: Book1 },
    { name: "Agriculture", icon: Bank },
    { name: "Real Estate", icon: Drop },
    { name: "Retail", icon: BuyCrypto },
    { name: "Manufacturing", icon: Bubble },
    { name: "Construction", icon: ChartCircle },
    { name: "Transportation", icon: Bucket },
    { name: "Energy", icon: BuyCrypto },
    { name: "Food", icon: Decred },
    { name: "Entertainment", icon: OceanProtocol },
    { name: "Media", icon: Book1 },
    { name: "Non-Profit", icon: Drop },
  ];


  const fetchBusinesses = async () => {
    try {
      const resp = await GetLoanBusiness();
      const list = resp?.data || [];

      // Filter only businesses that have a `loan` object
      const businessesWithLoan = list.filter(business => business.loan);

      setAllBusinesses(businessesWithLoan);
      setBusinesses(businessesWithLoan);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  fetchBusinesses();
}, []);


useEffect(() => {
  if (selectedField) {
    const filtered = allBusinesses.filter(
      (b) =>
        Array.isArray(b?.industry) &&
        b.industry.some((ind) =>
          ind.toLowerCase().includes(selectedField.toLowerCase())
        )
    );
    setBusinesses(filtered);
  } else {
    setBusinesses(allBusinesses);
  }
}, [selectedField, allBusinesses]);


  const handleFieldClick = (industry) => {
    setSelectedField(industry === selectedField ? null : industry);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };




const handleInvest = async () => {
 
  setLoading(true);
  try {
    const resp = await InvestInBusiness({
      ...formData,
      investmentAmount: Number(formData.investmentAmount),
      expectedRoi: Number(formData.expectedRoi),
      paymentTerm: Number(formData.paymentTerm),
    });

  

    if (resp?.data?.success) {
      toast.success(resp.data.message || "Investment successful");
      setIsOpen(false);
      await fetchBusinesses(); 
    } else {
      toast.error("Investment failed");
    }

  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Unknown error occurred";
    toast.error(errMsg);
  } finally {
    setLoading(false);
  }
};


  const handleInvestClick = (business) => {
    setFormData({ ...formData, businessId: business._id });
    setActiveModal("invest");
    setIsOpen(true);
  };
  const handleViewBusinessClick = (businessId) => {
  const selected = allBusinesses.find((item) => item._id === businessId);
  if (selected) {
    setBusinessData(selected);
    startTransition(() => {
      setActiveModal("view");
      setIsOpen(true);
    });
  }
};

//   const handleViewBusinessClick = async (businessId) => {
//     try {
//       const resp = await getBusinessInfo(businessId);
//       setBusinessData(resp?.data || null);
//       startTransition(() => {
//         setActiveModal("view");
//         setIsOpen(true);
//       });
//     } catch (error) {
//       console.error("Failed to load business details:", error);
//     }
//   };

  const [currentPage, setCurrentPage] = useState(0);
  const startupsPerPage = 6;
  const totalPages = Math.ceil(businesses.length / startupsPerPage);
  const displayStartups = businesses
    .slice()
    .reverse()
    .slice(currentPage * startupsPerPage, (currentPage + 1) * startupsPerPage);

  return (
    <InvestorLayoutPage>
      <header className="flex justify-between mx-2 my-5 items-center">
        <div>
          <h3 className="text-2xl font-semibold">Welcome {user.first_name}</h3>
          <p className="text-lg text-gray-700">
            Find opportunities and invest in businesses you're passionate about.
          </p>
        </div>
        <button className="px-5 flex items-center gap-2 py-3 rounded-xl border border-blue-400">
          <Sort size="20" color="blue" />
          <p className="text-blue-600 font-semibold">Filter</p>
        </button>
      </header>

      <section>
        <h3 className="text-2xl font-semibold text-[#1D2433]">Explore</h3>
        <ul className="flex flex-wrap gap-6 my-3">
          {field.map((item) => (
            <div
              key={item.name}
              className={`flex items-center border-2 px-4 py-2 cursor-pointer rounded-lg transition-all ${
                selectedField === item.name ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
              onClick={() => handleFieldClick(item.name)}
            >
              <div className="h-11 w-11 mx-3 flex justify-center items-center bg-[#DBE7FE] rounded-full">
                <item.icon size={18} color={selectedField === item.name ? "white" : "blue"} />
              </div>
              <li className="text-xl font-medium">{item.name}</li>
            </div>
          ))}
        </ul>
      </section>

      <article className="mt-7">
        <h3 className="text-2xl font-medium text-[#1D2433] mb-10">
          Featured Businesses
        </h3>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-wrap gap-8">
            {displayStartups.length > 0 ? (
              displayStartups.map((startup) => (
                <div
                  key={startup._id}
                  className="bg-[#f7f9fc] rounded-xl shadow-md hover:shadow-xl w-full md:w-[48%] lg:w-[30%] p-6"
                >
                  <div>
                    <div className="flex justify-center -mt-14 mb-4">
                      <div className="bg-indigo-100 p-4 rounded-full shadow-md">
                        <SliderVertical1 size="28" color="#4F46E5" variant="Bold" />
                      </div>
                    </div>

                    <h3 className="text-center font-bold text-xl text-[#1D2433]">
                      {startup.business_name}
                    </h3>
                    <p className="text-center capitalize text-sm text-[#4F46E5] font-medium">
                      {startup.industry}
                    </p>
                    <p className="mt-4 text-sm text-gray-600 text-center">
                      {startup.business_description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      onClick={() => handleInvestClick(startup)}
                      className="bg-gradient-to-r from-[#1FC8DB] to-[#2CB5E8] text-white py-2.5 rounded-md font-semibold"
                    >
                      Invest Now
                    </button>
                    <button
                      onClick={() => handleViewBusinessClick(startup._id)}
                      className="bg-[#E4ECF4] text-[#1D2433] py-2.5 rounded-md font-semibold"
                    >
                      View Business
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg text-gray-500">
                No businesses found for {selectedField || "your selection"}
              </div>
            )}
          </div>
        )}
      </article>

      <div className="flex justify-end my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Previous
        </button>
        <span className="mx-3">
          {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>

      {isOpen && activeModal === "invest" && (
        <InvestDialogModal
          click={clicked}
          setClicked={setClicked}
          formData={formData}
          handleInputChange={handleInputChange}
          handleInvest={handleInvest}
          handleModalClose={() => setIsOpen(false)}
          loading={loading}
        />
      )}

      {isOpen && activeModal === "view" && businessData && (
        <UnifiedModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          businessData={businessData}
          setIsActive={setIsActive}
        />
      )}

      <Toaster />
    </InvestorLayoutPage>
  );
};

export default InvestorBusiness;
