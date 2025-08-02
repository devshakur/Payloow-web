import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Button";
import { Copy } from "iconsax-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaBolt, FaPhoneAlt, FaTv } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import FundModal from "../FundModal/FundModal";
import WithdrawFund from "../WithdrawFund/WithdrawFund";
import useBills from "../../hooks/useBills";
import NotificationHistory from "../NotificationHistory";
import PayloowEasybuySlider from "../PayloowEasybuySlider";
import { useRouter } from "../../Routes/router";
import InvestmentMarquee from "../InvestmentMarquee";

const DashboardHome = () => {
  const { GetUser } = useAuth();
  const { GetUserBalance, GetDva, UserTransactions } = useBills();
  const router = useRouter();
  const [details, setDetails] = useState({});
  const [walletBalance, setWalletBalance] = useState({});
  const [isOpens, setIsOpens] = useState(false);
  const [transaction, setTransaction] = useState([])
  const [dva, setDva] = useState({
    bankName: "",
    accountNumber: "",
  });

  const getUserDetails = async () => {
    try {
      const resp = await GetUser();
      const data = resp;
      const notifications = data?.notification;
      if (data) {
        setDetails(data);
        toast.success("Welcome Aboard");
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const getUserTransaction = async () => {
    try {
      const resp = await UserTransactions();
      const data = resp.data?.data
      if (data) {
      const recentTransactions = data.slice(0, 3); 
      setTransaction(recentTransactions);
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

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

  useEffect(() => {
    getUserDetails();
    GetWalletBalance();
    getDva();
    getUserTransaction();
  }, []);



  const isBalanceZero = Number(walletBalance) <= 1;

  const formattedBalance =
    typeof walletBalance === "number"
      ? new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(walletBalance)
      : "₦0.00";

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const courseSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const copyToClipboard = () => {
    const content = document.querySelector(".account-number").innerText;
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Account Number copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

 
  
  return (
    <DashboardLayout>
      <section>
        <div>
          <h3 className="md:text-3xl text-3xl font-bold pb-3">
            Welcome Back, {details.lastName ? `${details.lastName} ${details.firstName}` : "Guest"}
          </h3>
          <p>Here are some quick stats</p>
        </div>

        {/* Payloow Easybuy Full Width Section */}
       

        {/* Main Cards Slider */}
        <div className="mt-12">
          <Slider {...sliderSettings}>
            {/* Wallet Card */}
            <div className="md:pr-5">
              <div className="available-balance text-white p-6 rounded-lg flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="font-medium text-2xl">Available Balance</p>
                  <p className="text-3xl font-bold">{formattedBalance}</p>
                </div>
                <div>
                  <p className="flex mt-2 items-center space-x-3">
                    <span>{dva.bankName}:</span>
                    <span className="account-number">{dva.accountNumber}</span>
                    <button onClick={copyToClipboard}>
                      <Copy size="24" color="#ffffff" />
                    </button>
                  </p>
                </div>
                <Button
                  text="Transfer Fund"
                  className={`text-primary bg-white mt-3 font-medium ${
                    isBalanceZero ? " cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isBalanceZero && setIsOpens(true)}
                  disabled={isBalanceZero}
                />
                {isOpens && (
                  <WithdrawFund isOpens={isOpens} onClosed={() => setIsOpens(false)} />
                )}
              </div>
            </div>

            {/* Loan Card */}
            <div className="md:pr-5">
              <div className="loan-balance text-white p-6 rounded-lg flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="font-medium text-2xl">Loan Balance</p>
                  <p className="text-3xl font-bold">
                    ₦
                    {(currentUser?.wallet?.loan?.balance || 0).toLocaleString()}
                  </p>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-3">
                  <Button onClick={()=>router.push('/easybuy/home')} text="Make a payment" className="bg-white text-primary font-medium" />
                  <Button onClick={()=>router.push('/investment')} text="Apply for Loan" className="bg-white text-primary font-medium" />
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="md:pr-5">
              <div className="courses p-6 rounded-lg shadow-lg">
                <p className="flex items-center justify-between">
                  <span className="font-medium text-2xl">Your Courses</span>
                  <Link
                    to={
                      currentUser?.role === "Tutor"
                        ? "/e-learning/tutor/all-courses"
                        : "/e-learning/student/dashboard"
                    }
                    className="text-sm text-primary"
                  >
                    See all
                  </Link>
                </p>
                <div className="slider-container mt-5 h-full px-2">
                  <Slider {...courseSliderSettings}>
                    {[1, 2, 3].map((i) => (
                      <div key={i}>
                        <div className="flex items-center space-x-5">
                          <img src="/images/course-image.png" alt="course" className="w-32" />
                          <div>
                            <h4>UI/UX Beginner&apos;s Course</h4>
                            <div className="w-full bg-gray-400 h-2 rounded-full mt-3">
                              <div className="w-1/2 bg-primary h-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        {/* Services & Notifications */}
        <div className="mt-12 grid md:grid-cols-7 gap-8">
          <div className="md:col-span-4 bg-white rounded-lg shadow md:p-8 p-3 pb-10">
            <p className="md:text-2xl text-lg font-medium pb-7">Services</p>
            <div className="grid md:grid-cols-4 grid-cols-3 gap-8">
              {[
                { name: "Airtime", icon: <FaPhoneAlt />, to: "/airtime" },
                { name: "Data", icon: <GiNetworkBars />, to: "/data" },
                { name: "Electricity", icon: <FaBolt />, to: "/electricity" },
                { name: "TV Sub", icon: <FaTv />, to: "/tv-sub" },
                { name: "Loans", icon: <FaMoneyBills />, to: "/investment" },
                { name: "Courses", icon: <MdOutlineMenuBook />, to: "/e-learning/register" },
              ].map((service) => (
                <div key={service.name} className="text-center flex flex-col items-center space-y-2">
                  <Link
                    to={service.to}
                    className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition duration-300 text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                  >
                    {service.icon}
                  </Link>
                  <p>{service.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 bg-white rounded-xl md:p-8 p-3 shadow">
            <div className="flex items-center justify-between pb-7">
              <p className="md:text-2xl text-lg font-medium">Recent Transactions</p>
              <Link to={"/user/notification"} className="text-sm text-primary">See all</Link>
            </div>
            <NotificationHistory history={transaction} />
          </div>
        </div>
      </section>
       <div className="w-full mt-12">
          <div className="bg-white shadow rounded-xl p-4">
             <div className="flex   p-4 mt-9 items-center">
          <span>
            <img src="images/pay.png" alt="" />
          </span>
          <span>
            <img
              src="images/curve.png"
              className="h-9 relative right-8"
              alt=""
            />
          </span>
          <span>
            <img
              src="images/angle.png"
              className="h-5 relative right-10 -top-8"
              alt="arrow"
            />
          </span>
          <span className=" font-bold font-poppins text-[32px] text-[#3369F4] mt-3 relative right-12">
            ayloow 
          </span>
        </div>
            <PayloowEasybuySlider />
          </div>
        </div>
        <div className="w-full mt-5">
          <div className="bg-white shadow rounded-xl p-4">
             <div className="flex   p-4 mt-9 items-center">
        </div>
            <InvestmentMarquee />
          </div>
        </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
