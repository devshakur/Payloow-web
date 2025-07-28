import React, { useState, useEffect, useMemo } from 'react';
import InvestorLayoutPage from './InvestorLayoutPage';
import { Sort, More } from 'iconsax-react';
import ReactPaginate from 'react-paginate';
import useInvestment from '../../../hooks/useInvetment';
import { format } from 'date-fns';

const MyInvestment = () => {
  const { InvestorsInvestment } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [analytics, setAnalytics] = useState({});
  const [user, setUser] = useState({});
  const [investment, setInvestment] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    const getInvestment = async () => {
      try {
        const resp = await InvestorsInvestment();
        const investmentInfo = resp?.data?.investments || [];
        const analyticsInfo = resp?.data?.analytics || {};
        setInvestment(investmentInfo);
        setAnalytics(analyticsInfo);
      } catch (error) {
        console.error('Failed to fetch investment information:', error);
      }
    };
    getInvestment();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const totalPages = Math.ceil(investment.length / itemsPerPage);

const displayedInvestments = useMemo(() => {
  if (!investment || investment.length === 0) return [];

  return [...investment]
    .filter((inv) => !!inv.createdAt) // Optional safety
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
}, [investment, currentPage]);






  return (
    <InvestorLayoutPage>
      {/* Header Section */}
      <header className="flex justify-between my-3 items-center">
        <div>
          <h3 className="font-poppins text-2xl font-semibold">Welcome {user.name || 'User'}</h3>
          <p className="font-poppins font-normal my-1 leading-6 text-lg text-[#000000]">
            Track your investment portfolio and monitor business growth.
          </p>
        </div>
        <button className="px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400">
          <Sort size="20" color="blue" />
          <p className="text-lg text-blue-600 font-semibold font-poppins">Filter</p>
        </button>
      </header>

      {/* Wallet and Investment Overview Section */}
      <div className="md:flex gap-5 w-[95%]">
        <div className="bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md">
          <div className="flex items-center justify-between gap-2 mx-6">
            <p className="font-medium text-xl font-poppins text-[#1D2433]">Total Invested</p>
          
          </div>
          <p className="text-3xl mx-6 my-3 font-plus-jakarta text-center font-medium">
           {analytics?.totalInvestments}
          </p>
        </div>

        <div className="bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md">
          <div className="flex items-center justify-between gap-2 mx-2">
            <p className="font-normal text-xl font-plus-jakarta text-center text-[#1D2433]">Active Investments</p>
           
          </div>
          <p className="text-[33px] flex justify-center mx-8 my-3 font-poppins font-[300]">{analytics.activeInvestments}</p>
        </div>

        <div className="bg-[#F1F3F9] md:w-[47%] my-5 py-5 rounded-md">
          <div className="flex items-center justify-between gap-2 mx-2">
            <p className="font-normal text-xl font-plus-jakarta text-center text-[#1D2433]">Net Profits</p>

         
          </div>
          <p className="text-[33px] flex justify-center  my-3 font-poppins font-medium">
            <span className="text-sm">₦</span>{analytics.netProfit}
          </p>
        </div>
      </div>

      {/* Investment Details Section */}
      <article className="bg-white w-[100%]  overflow-y-scroll  overflow-x-hidden  rounded-lg p-6">
        {/* Table Header */}
        <ul className="lg:flex mx-6 justify-between bg-white  mt-2 py-3 w-[100%] hidden">
          <li className="font-semibold xl:text-lg lg:text-sm lg:ml-[-25px]">Business Name</li>
          <li className="font-semibold xl:text-lg relative right-14 lg:text-sm lg:ml-[10px]">Amount</li>
          <li className="font-semibold xl:text-lg relative right-24 lg:text-sm">Expected ROI</li>
          <li className="font-semibold xl:text-lg relative right-16 xl:-left-36 lg:text-sm lg:mr-[13px]">Date of Investment</li>
          <li className="font-semibold xl:text-lg relative right-24 xl:-left-40 2xl:-left-[200px] lg:text-sm">Status</li>
        </ul>

        {/* Investment List */}
       {displayedInvestments.length > 0 ? (
  displayedInvestments.map((inv) => (
    <div key={inv._id} className="bg-[#F9FAFB] rounded-lg p-4 mb-4 shadow border border-gray-200">
      <div className="flex flex-col lg:flex-row justify-between text-sm lg:text-base">
        {/* Business Name */}
        <div className="flex-1 mb-2 lg:mb-0">
          <p className="text-gray-500 font-normal lg:hidden mb-1">Business Name</p>
          <span className="text-[#1D2433] font-medium">{inv.business?.business_name || 'N/A'}</span>
        </div>

        {/* Amount */}
        <div className="flex-1 mb-2 lg:mb-0">
          <p className="text-gray-500 font-normal lg:hidden mb-1">Amount</p>
          <span className="text-[#1D2433] font-medium">₦{inv.amount?.toLocaleString() || '0'}</span>
        </div>

        {/* ROI */}
        <div className="flex-1 mb-2 lg:mb-0">
          <p className="text-gray-500 font-normal lg:hidden mb-1">Expected ROI</p>
          <span className="text-[#1D2433] font-medium">{inv.expected_roi}%</span>
        </div>

        {/* Date */}
        <div className="flex-1 mb-2 lg:mb-0">
          <p className="text-gray-500 font-normal lg:hidden mb-1">Date of Investment</p>
          <span className="text-[#1D2433] font-medium">{format(new Date(inv.createdAt), 'dd/MM/yyyy')}</span>
        </div>

        {/* Status */}
        <div className="flex-1">
          <p className="text-gray-500 font-normal lg:hidden mb-1">Status</p>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
              inv.status === 'pending'
                ? 'bg-orange-100 text-orange-600'
                : inv.status === 'accepted'
                ? 'bg-green-100 text-green-600'
                : inv.status === 'declined'
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {inv.status}
          </span>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="my-6 text-lg font-medium text-gray-600 mx-6">You do not have any active investments. Start investing now!</p>
)}


        {/* Pagination */}
        <div className="flex">
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center mt-6'}
            pageClassName={'mx-1'}
            pageLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
            previousClassName={'mx-1'}
            previousLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
            nextClassName={'mx-1'}
            nextLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
            activeClassName={'bg-blue-600 text-white'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
      </article>
    </InvestorLayoutPage>
  );
};

export default MyInvestment;
