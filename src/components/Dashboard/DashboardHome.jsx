import React, {useEffect, useState} from "react";
import DashboardLayout from "./DashboardLayout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Button";
import { Copy } from "iconsax-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const {GetUser} = useAuth();
  const [details, setDetails] = useState({})
  const [history, setHistory] = useState({})
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const resp = await GetUser(); // Call the correct function
        const data = resp
        const historyReference = resp.previousReference
        if (data) {
          setDetails(data); // Update state with fetched data
          setHistory(historyReference)
          toast.success("Fetched User Details");
        }
      } catch (error) {
        toast.error("Failed to fetch user details");
      }
    };

    getUserDetails();
  }, [GetUser]);
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const settings2 = {
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
      .then(() => {
        toast.success("Account Number copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };


  return (
    <DashboardLayout>
      <section>
        <div>
          <h3 className="md:text-3xl text-3xl font-bold pb-3">
            Welcome Back,{details.lastName ? details?.lastName + " " + details?.firstName : "Guest"} 
            <span className="md:hidden">
              <br />
            </span>{" "}
            {/* {user?.name} */}
          </h3>
          <p>Here are some quick stats</p>
        </div>
        <div className="mt-12">
          <div className="slider-container">
            <Slider {...settings}>
              <div className="md:pr-5">
                <div className="available-balance text-white p-6 rounded-lg flex flex-col justify-between ">
                  <div className="space-y-3">
                    <p className="font-medium text-2xl">Available Balance</p>
                    <p className="text-3xl font-bold font-plus-jakarta"> <span className="text-[16px]">₦</span>{(currentUser?.wallet?.balance ? currentUser.wallet.balance  : '0.00').toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="flex items-center space-x-3">
                      <span>Wema Bank:</span>
                      <span className="account-number">012 3456 789 </span>
                      <button onClick={copyToClipboard}>
                        <Copy size="24" color="#ffffff" />
                      </button>
                    </p>
                  </div>
                  <Button
                    text="Fund Wallet"
                    className="bg-white text-primary font-medium"
                    onClick={() => { }}
                  />
                </div>
              </div>
              <div className="md:pr-5">
                <div className="loan-balance text-white p-6 rounded-lg flex flex-col justify-between ">
                  <div className="space-y-3">
                    <p className="font-medium text-2xl">Loan Balance</p>
                    <p className="text-3xl font-bold"><span className="text-[16px]">₦</span>{(currentUser?.wallet?.loan?.balance ? currentUser.wallet.loan.balance  : '0.00').toLocaleString()}</p>
                  </div>

                  <div className="flex md:flex-row flex-col items-center gap-3">
                    <Button
                      text="Make a payment"
                      className="bg-white text-[#0099FF] font-medium"
                      onClick={() => { }}
                    />
                    <Button
                      text="Apply for Loan"
                      className="bg-white text-[#0099FF] font-medium"
                      onClick={() => { }}
                    />
                  </div>
                </div>
              </div>
              <div className="md:pr-5">
                <div className="courses p-6 rounded-lg justify-between shadow-lg">
                  <p className="flex items-center justify-between">
                    <span className="font-medium text-2xl">Your Courses</span>
                    <Link to={currentUser?.role === 'Tutor' ? "/e-learning/tutor/all-courses" : "/e-learning/student/dashboard"} className="text-sm text-primary">
                      See all
                    </Link>
                  </p>
                  <div className="slider-container mt-5 h-full px-2">
                    <Slider {...settings2}>
                      <div className="">
                        <div className="flex items-center space-x-5">
                          <img
                            src="/images/course-image.png"
                            alt="coure-image"
                            className="w-32"
                          />
                          <div>
                            <h4>UI/UX Beginner&apos;s Course</h4>
                            <div className="w-full bg-gray-400 h-2 rounded-full overflow-hidden mt-3">
                              <div className="w-1/2 bg-primary h-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex items-center space-x-5">
                          <img
                            src="/images/course-image.png"
                            alt="coure-image"
                            className="w-32"
                          />
                          <div>
                            <h4>UI/UX Beginner&apos;s Course</h4>
                            <div className="w-full bg-gray-400 h-2 rounded-full overflow-hidden mt-3">
                              <div className="w-1/2 bg-primary h-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex items-center space-x-5">
                          <img
                            src="/images/course-image.png"
                            alt="coure-image"
                            className="w-32"
                          />
                          <div>
                            <h4>UI/UX Beginner&apos;s Course</h4>
                            <div className="w-full bg-gray-400 h-2 rounded-full overflow-hidden mt-3">
                              <div className="w-1/2 bg-primary h-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-7 gap-8">
          <div className="md:col-span-4 bg-white rounded-lg shadow md:p-8 p-3 md:pb-0 pb-10">
            <p className="md:text-2xl text-lg font-medium pb-7">Services</p>
            <div className="grid md:grid-cols-4 grid-cols-3 gap-8">
              <div className="text-center flex flex-col items-center space-y-2">
                <Link
                  to={"/airtime"}
                  className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition-all duration-300 ease-in-out text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                >
                  <FaPhoneAlt />
                </Link>
                <p>Airtime</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-2">
                <Link
                  to={"/data"}
                  className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition-all duration-300 ease-in-out text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                >
                  <GiNetworkBars />
                </Link>
                <p>Data</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-2">
                <Link
                  to={"/electricity"}
                  className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition-all duration-300 ease-in-out text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                >
                  <FaBolt />
                </Link>
                <p>Electricity</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-2">
                <Link
                  to={"/tv-sub"}
                  className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition-all duration-300 ease-in-out text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                >
                  <FaTv />
                </Link>
                <p>TV Sub</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-2">
                <Link
                  to={""}
                  className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition-all duration-300 ease-in-out text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                >
                  <FaMoneyBills />
                </Link>
                <p>Loans</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-2">
                <Link
                  to={""}
                  className="bg-[#F1F3F9] hover:bg-[#d6d9e1] transition-all duration-300 ease-in-out text-primary text-2xl h-20 w-20 flex items-center justify-center rounded-full"
                >
                  <MdOutlineMenuBook />
                </Link>
                <p>Courses</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl md:p-8 p-3 shadow">
              <div>
                <div className="flex items-center justify-between pb-7">
                  <p className="md:text-2xl text-lg font-medium">
                    Recent Transactions
                  </p>
                  <Link to={"#!"} className="text-sm text-primary">
                    See all
                  </Link>
                </div>
                <div className="space-y-4">
                  {history.length > 0 ? 
                  history.reverse().map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={transaction.body == 'mtn' ? "/images/mtn.svg" : "/images/airtel.svg"}
                          alt={transaction.title}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium capitalize">{transaction.body} {transaction.title}</p>
                          <p className="text-sm w-1/2 text-gray-500 truncate text-ellipsis">
                            {transaction._id}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p>{transaction.code}</p>
                        <p className="text-green-500 bg-green-100 capitalize p-1">Successfull</p>
                      </div>
                    </div>
                  )) : (
                    <div>No recent Transaction</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardHome;
