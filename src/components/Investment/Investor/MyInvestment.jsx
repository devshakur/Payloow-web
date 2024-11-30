import React, { useState, useEffect } from 'react';
import InvestorLayoutPage from './InvestorLayoutPage';
import { Sort, More } from 'iconsax-react';
import ReactPaginate from 'react-paginate';
import useInvestment from '../../../hooks/useInvetment';
import { format } from 'date-fns';

const MyInvestment = () => {
  const { getUserDetails, InvestorsInvestment } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});
  const [investment, setInvestment] = useState([]);

  const itemsPerPage = 1;


  useEffect(() => {
    const getInvestment = async () => {
      try {
        const resp = await InvestorsInvestment();
        const investmentInfo = resp?.data.data.investments
        if (investmentInfo) {
          setInvestment(investmentInfo);
        }
      } catch (error) {
        console.error('Failed to fetch investment information:', error);
      }
    };
    getInvestment();
  }, []);


  useEffect(() => {
    const userDetails = async () => {
      try {
        const resp = await getUserDetails();
        const info = resp.data.data;
        const balance = resp.data.data.wallet;
        if (info) {
          setUser(info);
          setWallet(balance);
        }
      } catch (error) {
        console.error('Failed to fetch user information:', error);
      }
    };
    userDetails();
  }, []);

  const totalInvested = investment.reduce((accum, investment) => {
    return accum + investment.investment_amount;
  }, 0);
  const formattedTotalInvested = totalInvested.toLocaleString();


const acceptedInvestments = investment.filter(investment => investment.investment_status === 'accepted');
const numberOfAcceptedInvestments = acceptedInvestments.length;

const totalProfits = investment.reduce((accum, investment) => {
  return accum + investment.total_profit;
}, 0);

const netProfit = totalProfits - totalInvested;
const formattedNetProfit = netProfit.toLocaleString();


  // Handle pagination page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(investment.length / itemsPerPage);

  // Slice the displayed investment data based on current page
  const displayedInvestments = investment.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <InvestorLayoutPage>
      {/* Header Section */}
      <header className="flex justify-between mx-2 my-3 items-center">
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
        {/* Total Invested */}
        <div className="bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md">
          <div className="flex items-center justify-between gap-2 mx-6">
            <p className="font-medium text-xl font-poppins text-[#1D2433]">Total Invested</p>
            <More size="22" color="#000000" />
          </div>
          <p className="text-3xl mx-6 my-3 font-poppins font-[600]">₦{formattedTotalInvested}</p>
        </div>

        {/* Active Investments */}
        <div className="bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md">
          <div className="flex items-center justify-between gap-2 mx-2">
            <p className="font-normal text-xl font-poppins text-[#1D2433]">Active Investments</p>
            <More size="22" color="#000000" />
          </div>
          <p className="text-[33px] flex justify-center mx-8 my-3 font-poppins font-[600]">{numberOfAcceptedInvestments}</p>
        </div>

        {/* Completed Investments */}
        <div className="bg-[#F1F3F9] md:w-[47%] my-5 py-5 rounded-md">
          <div className="flex items-center justify-between gap-2 mx-2">
            <p className="font-normal text-xl font-poppins text-[#1D2433]">Net Profits</p>
            <More size="22" color="#000000" />
          </div>
          <p className="text-[33px] flex justify-center mx-8 my-3 font-poppins font-[600]">₦{formattedNetProfit}</p>
        </div>
      </div>

      {/* Investment Details Section */}
      <article className="bg-white w-[100%] overflow-y-scroll overflow-x-hidden mx-5 rounded-lg p-6">
        {/* Table Header (Mobile/Tablet View) */}
        <ul className="lg:flex mx-6 justify-between bg-white shadow-lg py-3 w-[100%] hidden">
          <li className="font-semibold xl:text-lg lg:text-sm lg:ml-[-25px]">Business Name</li>
          <li className="font-semibold xl:text-lg relative right-14 lg:text-sm lg:ml-[10px]">Amount</li>
          <li className="font-semibold xl:text-lg relative right-24 lg:text-sm">Expected ROI</li>
          <li className="font-semibold xl:text-lg relative right-16 xl:-left-36 lg:text-sm lg:mr-[13px]">Date of Investment</li>
          <li className="font-semibold xl:text-lg relative right-24 xl:-left-40 2xl:-left-56 lg:text-sm">Status</li>
        </ul>

        {/* Display Investment Data */}
        {investment && investment.length > 0 ? (
          investment.map((user) => (
            <div key={user.id} className="bg-[#F1F3F9] rounded-lg p-4 mb-4 shadow-sm">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex-1 mt-2">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Business Name:</p>
                  <span className="lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black">
                    {user.business_name}
                  </span>
                </div>
                <div className="flex-1 mt-2">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Amount:</p>
                  <span className="lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black">
                    {user.investment_amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex-1 mt-2">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Expected ROI:</p>
                  <span className="lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black">
                    {user.expected_roi}
                  </span>
                </div>
                <div className="flex-1 mt-2">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Date of Request:</p>
                  <span className="lg:text-sm text-lg font-poppins font-semibold text-blue-400 lg:text-black">
                    {format(new Date(user.created_at), 'dd/MM/yyyy')}
                  </span>
                </div>
                <div className="flex-1 mt-2">
                  <p className="font-poppins text-lg font-semibold lg:hidden">Status:</p>
                  <p style={{
                    color: user.investment_status === 'pending' ? 'orange' :
                      user.investment_status === 'accepted' ? 'green' :
                        user.investment_status === 'declined' ? 'red' : 'black'
                  }}>
                    {user.investment_status}
                  </p>
                 
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="my-6 text-xl mx-6">You do not have any active investments. Start investing now!</p>
        )}

        {/* Pagination Section */}
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
