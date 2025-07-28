import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { format } from "date-fns";
import CopyText from "../../../../CopyText/CopyText";
import { capitalizeAndJoin } from "../../../../../Utils/customHooks";

const UnifiedModal = ({ isOpen, setIsOpen, businessData, user }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!businessData) return <div className="loader">Loading...</div>;

  const {
    website = "",
    twitter_url = "",
    linkedIn_url = "",
    facebook_url = "",
    youTube_url = "",
    instagram_url = "",
    tikTok_url = "",
    financial_statements = [],
    growth_plans = [],
    loan_requirements = [],
    loan,
  } = businessData;

  const close = () => setIsOpen(false);

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <p className="font-poppins font-medium text-lg text-[#1D2433CC]">
        {label}
      </p>
      <p className="font-poppins font-semibold text-lg text-[#1D2433CC]">
        {value}
      </p>
    </div>
  );

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 bg-black/30">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-6">
          <DialogTitle>
            <div className="flex gap-2 flex-col sm:flex-row">
              {["overview", "links", "loan"].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 font-semibold rounded-md ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
          </DialogTitle>

          {/* Content Section */}
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">
            {activeTab === "overview" && (
              <>
                <InfoRow
                  label="Business Name"
                  value={businessData.business_name}
                />
                <p className="text-gray-700">
                  {businessData.business_description}
                </p>
                <InfoRow
                  label="Category"
                  value={capitalizeAndJoin(businessData?.industry || [])}
                />
                <InfoRow
                  label="Status"
                  value={
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium">
                      Active
                    </span>
                  }
                />
                <InfoRow label="Stage" value={businessData.business_stage} />
                <InfoRow label="Service" value={businessData.customer_model} />
                <InfoRow
                  label="Year Founded"
                  value={businessData?.founding_date || "Not Specified"}
                />
              </>
            )}

            {activeTab === "links" && (
              <>
                <h4 className="font-bold text-lg">Website</h4>
                <div className="flex justify-between items-center border p-2 rounded">
                  <p className="truncate w-4/5">{website}</p>
                  <CopyText text={website} />
                </div>

                <h4 className="font-bold mt-4">Social Media</h4>
                <div className="flex gap-4 flex-wrap">
                  {[
                    twitter_url,
                    linkedIn_url,
                    facebook_url,
                    youTube_url,
                    instagram_url,
                    tikTok_url,
                  ].map(
                    (url, i) =>
                      url && (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-12 w-12 flex items-center justify-center bg-[#DBE7FE] rounded-full"
                        >
                          <img
                            src={`/images/${
                              [
                                "X",
                                "Linkdeln",
                                "facebook",
                                "Youtube",
                                "instagram",
                                "TikTok",
                              ][i]
                            }.png`}
                            alt="icon"
                            className="h-6"
                          />
                        </a>
                      )
                  )}
                </div>

              <h4 className="font-bold mt-6">Documents</h4>
{[financial_statements, growth_plans, loan_requirements]
  .flat()
  .map((doc, i) => (
    <div
      key={i}
      className="flex justify-between items-center border p-2 rounded my-2"
    >
      <p className="truncate w-4/5 text-blue-600 underline">
        <a href={doc} target="_blank" rel="noopener noreferrer">
          {doc}
        </a>
      </p>
      <CopyText text={doc} />
    </div>
  ))}

              </>
            )}

            {activeTab === "loan" && (
              <>
                <h4 className="font-bold text-lg">Loan Details</h4>
                <InfoRow
                  label="Loan Amount"
                  value={loan?.loan_amount || "No Available Loan"}
                />
                <InfoRow
                  label="Created Date"
                  value={
                    loan?.createdAt && !isNaN(new Date(loan.createdAt))
                      ? format(new Date(loan.createdAt), "dd/MM/yyyy")
                      : "No Available Loan"
                  }
                />
                <InfoRow
                  label="Collateral"
                  value={loan?.collateral || "No Available Loan"}
                />
                <InfoRow
                  label="Amount Disbursed"
                  value={loan?.amount_disbursed || "0"}
                />
                <InfoRow
                  label="Owner"
                  value={`${user?.first_name || "Not Specified"}`}
                />
                <hr />
                <InfoRow
                  label="Customer Model"
                  value={businessData.customer_model || "Not Specified"}
                />
                <InfoRow
                  label="Loan Status"
                  value={loan?.status || "No Available Loan"}
                />
              </>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={close}
              className="w-full sm:w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
            >
              Done
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UnifiedModal;
