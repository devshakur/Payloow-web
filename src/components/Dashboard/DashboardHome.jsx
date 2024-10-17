import React from "react";
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

const DashboardHome = () => {
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

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const user = {
    name: "Mayowa Sunusi",
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

  const transactions = [
    {
      id: 1,
      title: "MTN Airtime",
      amount: "₦2,000.00",
      status: "successful",
      date: "12th May, 2021",
      image: "/images/mtn.svg",
    },
    {
      id: 2,
      title: "Deposit",
      amount: "₦1,500.00",
      status: "pending",
      date: "10th May, 2021",
      image: "/images/wema.svg",
    },
    {
      id: 3,
      title: "KEDCO Unit",
      amount: "₦5,000.00",
      status: "failed",
      date: "8th May, 2021",
      image: "/images/kedco.svg",
    },
    {
      id: 4,
      title: "UI/UX Fundamentals",
      amount: "₦50,000.00",
      status: "successful",
      date: "1st May, 2021",
      image: "/images/course-image.png",
    },
    {
      id: 5,
      title: "Airtel Airtime",
      amount: "₦500.00",
      status: "successful",
      date: "1st May, 2021",
      image: "/images/airtel.svg",
    },
  ];
  return (
    <DashboardLayout>
      <section>
        <div>
          <h3 className="md:text-3xl text-3xl font-bold pb-3">
            Welcome Back,{" "}
            <span className="md:hidden">
              <br />
            </span>{" "}
            {user?.name}
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
                    <p className="text-3xl font-bold">₦2,000.00</p>
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
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div className="md:pr-5">
                <div className="loan-balance text-white p-6 rounded-lg flex flex-col justify-between ">
                  <div className="space-y-3">
                    <p className="font-medium text-2xl">Loan Balance</p>
                    <p className="text-3xl font-bold">₦2,000,000.00</p>
                  </div>

                  <div className="flex md:flex-row flex-col items-center gap-3">
                    <Button
                      text="Make a payment"
                      className="bg-white text-[#0099FF] font-medium"
                      onClick={() => {}}
                    />
                    <Button
                      text="Apply for Loan"
                      className="bg-white text-[#0099FF] font-medium"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
              <div className="md:pr-5">
                <div className="courses p-6 rounded-lg justify-between shadow-lg">
                  <p className="flex items-center justify-between">
                    <span className="font-medium text-2xl">Your Courses</span>
                    <Link to={"#!"} className="text-sm text-primary">
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
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={transaction.image}
                          alt={transaction.title}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{transaction.title}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p>{transaction.amount}</p>
                        <p
                          className={`font-medium ${
                            transaction.status === "successful"
                              ? "text-green-500 bg-green-100"
                              : transaction.status === "pending"
                              ? "text-yellow-500 bg-yellow-100"
                              : "text-red-500 bg-red-100"
                          } capitalize p-1 rounded md:text-sm text-xs`}
                        >
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
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
