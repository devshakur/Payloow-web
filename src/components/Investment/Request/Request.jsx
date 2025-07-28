import React, { useState, useEffect, startTransition, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Sort } from "iconsax-react";
import DebtorLayoutPage from "../Debtor/DebtorLayoutPage";
import useInvestment from "../../../hooks/useInvetment";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "../../../Routes/router";
import PayLoanModal from "./RequestModal/PayLoanModal";
import RepaySuccess from "./RepaySuccess";

const Request = () => {
  const router = useRouter();
  const {
    GetInvestmentRequest,
    AcceptOrDeclineInvestment,
    RepayInvestmentRequest,
  } = useInvestment();

  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [current, setCurrent] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    const fetchInvestmentRequests = async () => {
      try {
        const resp = await GetInvestmentRequest();
        const businessData = resp?.data?.investments || [];
        setData(businessData);
      } catch (error) {
        toast.error("Failed to fetch business data.");
      }
    };
    fetchInvestmentRequests();
  }, []);

  const acceptRequest = async (investmentId) => {
    try {
      const resp = await AcceptOrDeclineInvestment(investmentId, "approved");
      if (resp?.data?.success) {
        toast.success("Investment request accepted successfully!");
        setTimeout(() => {
            router.reload();
        }, 3000);
      } else {
        toast.error("Failed to accept investment request.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "Error accepting investment.";
      toast.error(errorMessage);
    }
  };

  const declineRequest = async (investmentId) => {
    try {
      const resp = await AcceptOrDeclineInvestment(investmentId, "declined");
      if (resp?.data?.success) {
        toast.success("Investment request declined successfully!");
        setTimeout(() => {
            router.reload();
        }, 3000);
      } else {
        toast.error("Failed to decline investment request.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Error declining investment.";
      toast.error(errorMessage);
    }
  };

 const repayInvestment = async (investmentId, payload) => {
  try {
    if (!payload?.payments || payload.payments.length === 0) return;

    const resp = await RepayInvestmentRequest(investmentId, payload);

    if (resp?.data?.success === true) {
      toast.success("Loan repaid successfully!");
      close();
      setCurrent(1);
      // setTimeout(() => {
      //   router.reload();
      // }, 3000);
    } else {
      toast.error("Failed to carry out request.");
      close();
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while repaying the loan.";
    toast.error(errorMessage);
    close();
  }
};

const sortedRequests = useMemo(() => {
  return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}, [data]);

const displayedRequests = useMemo(() => {
  return sortedRequests.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
}, [sortedRequests, currentPage]);




  return (
    <DebtorLayoutPage>
      <main className="w-full px-4 lg:px-8 max-w-screen-xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center my-6">
          <h3 className="font-plus-jakarta text-xl font-medium mb-2 md:mb-0">
            Investment Request
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-lg text-blue-600 font-poppins text-sm hover:bg-blue-50">
            <Sort size="20" color="blue" />
            <span>Filter</span>
          </button>
        </header>

        <article className="w-full">
          {Array.isArray(displayedRequests) && displayedRequests.length > 0 ? (
            displayedRequests.map((user) => (
              <div
                key={user?.id}
                className="bg-[#F1F3F9] rounded-xl p-6 mb-6 shadow border border-gray-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-sm text-gray-800 font-poppins">
                  <div>
                    <p className="font-semibold text-gray-500">Investor</p>
                    <p className="truncate font-semibold">
                      {user?.investor?.contactEmail}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Business Name</p>
                    <p className="truncate font-semibold">
                      {user?.business?.business_name}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Invested Amount</p>
                    <p className="font-semibold">
                      ₦{user?.amount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Expected ROI</p>
                    <p className="font-semibold">{user?.expectedRoi}%</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Installment</p>
                    <p className="font-semibold">
                      ₦{Math.round(user?.remaining).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Term</p>
                    <p className="font-semibold">
                      {user?.paymentFrequency} ({user?.paymentTerm})
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Date</p>
                    <p className="font-semibold">
                      {user?.createdAt
                        ? format(new Date(user.createdAt), "dd/MM/yyyy")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Total Profit</p>
                    <p className="font-semibold">
                      ₦{user?.total_profit?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Status</p>
                    <p
                      className="font-semibold"
                      style={{
                        color:
                          user?.status === "pending"
                            ? "orange"
                            : user?.status === "accepted"
                            ? "green"
                            : user?.status === "declined"
                            ? "red"
                            : "gray",
                      }}
                    >
                      {user?.status}
                    </p>
                  </div>
                  <div className="col-span-2 lg:col-span-1 flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => acceptRequest(user?.id)}
                      className="w-12 h-10 rounded bg-green-600 text-white disabled:opacity-50"
                      disabled={user?.status === "accepted"}
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => declineRequest(user?.id)}
                      className="w-12 h-10 rounded border border-red-600 text-red-600 disabled:opacity-50"
                      disabled={user?.status === "accepted"}
                    >
                      ✖
                    </button>
                  </div>
                  <div className="col-span-2 lg:col-span-1 mt-4">
                    <button
                      onClick={() => {
                        startTransition(() => {
                          setSelectedRequest(user);
                          open();
                        });
                      }}
                      className={`w-full py-2 rounded-xl text-white font-semibold ${
                        user?.is_repaid ? "bg-red-700" : "bg-gray-700"
                      }`}
                      disabled={user?.is_repaid}
                    >
                      {user?.is_repaid ? "Repaid" : "Repay"}
                    </button>
                  </div>
                </div>

                {selectedRequest?.id === user.id && (
                  <PayLoanModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onClose={close}
                    setCurrent={setCurrent}
                    data={selectedRequest}
                    repayInvestment={repayInvestment}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="text-lg my-6 mx-6 text-center text-gray-500">
              No Available Investment Request
            </div>
          )}

          {current === 1 && (
            <RepaySuccess setCurrent={setCurrent} data={selectedRequest} />
          )}

          <div className="flex">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel="..."
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center mt-6"
              pageClassName="mx-1"
              pageLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
              previousClassName="mx-1"
              previousLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
              nextClassName="mx-1"
              nextLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
              activeClassName="bg-blue-600 text-white"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </article>
        <Toaster />
      </main>
    </DebtorLayoutPage>
  );
};

export default Request;
