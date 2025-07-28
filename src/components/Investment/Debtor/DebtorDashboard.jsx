import React, { useState, startTransition, useEffect } from 'react';
import DebtorLayoutPage from './DebtorLayoutPage';
import { Copy, Briefcase } from 'iconsax-react';
import useInvestment from '../../../hooks/useInvetment';
import { Toaster, toast } from 'react-hot-toast';
import useBills from '../../../hooks/useBills';
import { useRouter } from '../../../Routes/router';

const DebtorDashboard = () => {
    const { getUserDetails, GetInvestmentRequest,  AcceptOrDeclineInvestment, GetLoanDetails, } = useInvestment();
    const {GetDva, GetUserBalance} = useBills();
    const router = useRouter();
    const [walletBalance, setWalletBalance] = useState('')
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    const [user, setUser] = useState({});
    const [loanBalance, setLoanBalance] = useState('');
    const [date, setDate] = useState()
    const [currentPage, setCurrentPage] = useState(0);
     const [dva, setDva] = useState({
    bankName: "",
    accountNumber: "",
  });
    const [data, setData] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [investment, setInvestment] = useState([]);
    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

   

     const copyToClipboard = () => {
    const content = document.querySelector(".account-number").innerText;
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Account Number copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  
useEffect(() => {
  const fetchInvestmentRequests = async () => {
    try {
      const resp = await GetInvestmentRequest();
      const businessData = resp?.data?.investments || [];

      const pendingRequests = businessData.filter(
        investment => investment.status === 'pending'
      );

      const sortedRequests = pendingRequests.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      // Only take the most recent one
      setData(sortedRequests.slice(0, 1));

    } catch (error) {
      toast.error("Failed to fetch investment data");
    }
  };

  fetchInvestmentRequests();
}, []);



   
    useEffect(() => {
        const userDetails = async () => {
            try {
                const resp = await getUserDetails();
                let info = resp?.data?.debtor;
                let balance = info?.loanBalance;
                if (info) {
                    setUser(info);
                    setLoanBalance(balance);
                }
            } catch (error) {
                console.error("Failed to fetch information on User:", error);
            }
        };

        userDetails();
    }, []);

    

    const getDva = async () => {
    try {
      const resp = await GetDva();
      const dvaData = resp?.data?.data;
      if (dvaData) {
        setDva({
          bankName: dvaData?.bankName,
          accountNumber: dvaData?.accountNumber,
        });
      }
    } catch (error) {
      console.error("Failed to fetch DVA details");
    }
  };

    const GetWalletBalance = async () => {
    try {
      const resp = await GetUserBalance();
      const balanceString = resp?.data?.data?.balance?.["$numberDecimal"];
      if (balanceString !== undefined) {
        const balanceNumber = Number(balanceString);
        setWalletBalance(balanceNumber);
      } else {
        toast.error("Unable to retrieve wallet balance.");
      }
    } catch (error) {
      toast.error("Failed to fetch wallet balance");
    }
  };

 const acceptRequest = async (investmentId) => {
    try {
      const resp = await AcceptOrDeclineInvestment(investmentId, "approved");
      if (resp?.data?.success) {
        toast.success("Investment request accepted successfully!");
        router.reload();
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
        router.reload();
      } else {
        toast.error("Failed to decline investment request.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Error declining investment.";
      toast.error(errorMessage);
    }
  };
  
    useEffect(()=>{
        const newDate = new Date();
        setDate(newDate)
        getDva();
        GetWalletBalance();
    }, [])

      const formattedBalance =
    typeof walletBalance === "number"
      ? new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(walletBalance)
      : "₦0.00";


   
    
    return (
        <DebtorLayoutPage>
            <h4 className='font-poppins text-2xl font-medium'>Welcome {user.first_name}</h4>
            <div className='flex justify-between'>
                <p className='font-poppins text-lg font-normal my-3'>This is your Investment dashboard</p>
                <button className='px-8 h-12 rounded-lg text-xl text-white bg-blue-800'>
                    {isLargeScreen ? '+ Get Started' : '+'}
                </button>
            </div>
            <main className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <section className='md:col-span-2'>
                    <div className="w-full md:max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-blue-700">
                        <a href="#">
                            <h5 className="-mt-2 mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Loan Wallet Balance</h5>
                        </a>
                        <p className="mb-4 font-medium text-2xl text-white">{formattedBalance}</p>
                       
                          <div>
                  <p className="flex mt-2 text-white items-center space-x-3 mb-2">
                    <span>{dva.bankName}:</span>
                    <span className="account-number ">{dva.accountNumber}</span>
                    <button onClick={copyToClipboard}>
                      <Copy size="24" color="#ffffff" />
                    </button>
                  </p>
                </div>
                        <div className='flex flex-col gap-4 md:flex-row cursor-pointer w-full'>
                            <button onClick={()=>router.push('/debtor/request')} href="#" className="flex justify-center items-center md:w-[60%] md:py-3 py-2 text-sm font-semibold text-[#0099FF] bg-white rounded-lg">
                                Loan Payment
                            </button>
                            <button onClick={()=>router.push('/dashboard')} href="#" className="flex justify-center items-center md:w-[60%] py-2 text-sm font-semibold text-[#0099FF] bg-white rounded-lg">
                                Withdrawal
                            </button>
                        </div>
                    </div>

                    <div className='md:flex gap-5'>
                        <div className='bg-[#DBE7FE] md:w-1/2 my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Total Loan Amount</p>
                            </div>
                            <p className='text-2xl mx-8 my-3 font-plus-jakarta font-medium'><span className='text-[16px]'>₦</span>{user?.totalLoanAmount?.$numberDecimal}</p>
                        </div>
                        <div className='bg-[#D6F7FF] md:w-[47%] my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal text-lg font-poppins text-[#1D2433]'>Loan Balance</p>
                            </div>
                            <p className='text-2xl mx-8 my-3 font-plus-jakarta font-medium'><span className='text-[16px]'>₦</span>{loanBalance?.$numberDecimal }</p>
                        </div>
                    </div>

                    <div className='md:flex gap-5'>
                        <div className='bg-[#F1F3F9] md:w-1/2 my-5 py-5 rounded-md'>
                            <h4 className='mx-3'>Credit Score</h4>
                            <div className='h-[10rem] flex justify-center'>
                                <img src="/images/score.png" className='h-[12rem] mx-6 my-5' alt="score" />
                            </div>
                            <p className='font-poppins font-normal text-center text-[#1D2433]'> {user ? user.payloowCreditScore : 'Loading'}</p>
                        </div>
                        <div className='bg-[#F1F3F9] md:w-1/2 h-[6rem] my-5 py-5 rounded-md'>
                            <div className='flex items-center gap-2 mx-2'>
                                <span className='bg-white w-6 h-6 flex justify-center items-center rounded-[50%]'><Briefcase size="12" color="blue" /></span>
                                <p className='font-normal px-6 text-lg font-poppins text-[#1D2433]'>Investment Requests</p>
                            </div>
                            <p className='text-3xl mx-8 my-3 text-center font-poppins font-[600]'>{data.length}</p>
                        </div>
                    </div>
                </section>

                {data && data.length > 0 ? 
                    data.map((user, index) => (
                        <article key={index} className='bg-white shadow-md p-5 rounded-md md:h-auto'>
                            <header className='flex justify-between items-center'>
                                <h4 className='font-poppins lg:font-medium lg:text-xl md:text-sm md:font-semibold'>Investment Requests</h4>
                                <a href="#" className='text-blue-500 lg:text-lg md:text-sm md:font-semibold'>See all</a>
                            </header>

                            <div className='bg-[#F8F9FC] mt-3 rounded-lg'>
                                <div className='flex justify-between py-4 mx-3'>
                                    <img src="/images/thumbsup.png" alt="thumbsup" />
                                    <p className='font-poppins font-bold text-lg text-black'>
                                        {user?.investor?.first_name} {user?.investor?.last_name}
                                    </p>
                                    <p style={{
                                        color: user?.investment_status === 'pending' ? 'orange' :
                                        user?.investment_status === 'accepted' ? 'green' :
                                        user?.investment_status === 'declined' ? 'red' : 'black'
                                    }}>
                                        {user?.investment_status}
                                    </p>
                                </div>
                                <p className='text-center relative -top-[3rem] font-semibold text-lg -ml-6 md:-top-[1.6rem] md:ml-3 xl:-top-[3rem]'>Investor</p>
                                <div className='flex gap-5 flex-col'>
                                    <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                                        <p>Business Name</p>
                                        <span className='ml-[6rem] lg:truncate lg:w-[9vw]'>{user.business.business_name}</span>
                                    </div>
                                    <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                                        <p>Loan Amount</p>
                                        <span className='md:mx-0 xl:mx-[6rem]'>₦{user.amount.toLocaleString()}</span>
                                    </div>
                                    <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                                        <p className='xl:text-[15px]'>Interest Rate</p>
                                        <span className='md:mx-0 xl:mx-[7rem]'>{user?.expectedRoi}%</span>
                                    </div>
                                    <div className='flex md:flex-col xl:flex-row justify-between mx-6 font-semibold text-md'>
                                        <p>Repayment Period</p>
                                        <span className='md:mx-0 xl:mx-16'>{user.repayment_term} Months</span>
                                    </div>
                                    <div className='mt-12 flex flex-col xl:flex-row mx-5 mb-5 gap-4 justify-between'>
                                        <button onClick={() => declineRequest(user?.id)} className='border border-blue-400 py-2 px-12 font-poppins font-medium text-blue-400 rounded-md'>Decline</button>
                                        <button  onClick={() => acceptRequest(user?.id)} className='bg-blue-600 py-2 px-12 font-poppins font-medium text-white rounded-md'>Accept</button>

                                    </div>
                                </div>
                            </div>
                        </article>
                    )) : 
                    <p className='text-lg font-medium font-plus-jakarta'>No Investment on your Business currently..</p>
                }

            </main>
            <Toaster />
        </DebtorLayoutPage>
    );
};

export default DebtorDashboard;


