import { motion } from "framer-motion";
import { ArrowRight3 } from "iconsax-react";
import React from "react";
import { Link } from "react-router-dom";

function ShapeOne() {
  return (
    <svg
      className="absolute -bottom-56 left-0 md:block hidden"
      width="404"
      height="572"
      viewBox="0 0 404 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="200,10 250,190 160,210"
        stroke="#D946EF"
        strokeOpacity="0.2"
        strokeWidth="41"
        fill="none"
      />
      <polygon
        points="300,100 360,200 270,250"
        stroke="#06B6D4"
        strokeOpacity="0.2"
        strokeWidth="41"
        fill="none"
      />
    </svg>
  );
}

function ShapeTwo() {
  return (
    <svg
      className="absolute -bottom-40 right-0 md:block hidden"
      width="404"
      height="572"
      viewBox="0 0 404 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 100 L100 200 L200 100 L300 200"
        stroke="#F4C542"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
      <path
        d="M0 300 L100 400 L200 300 L300 400"
        stroke="#4287F5"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
    </svg>
  );
}

const Services = () => {
  return (
    <>
      <section className="pb-20 bg-background" id="services">
        <div className="max-w-[1440px] mx-auto">
          <div className="md:grid hidden md:grid-cols-2 md:h-screen">
            <motion.div
              initial={{ x: -600 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="bg-primary-500 text-white md:text-left text-center md:pl-20 px-5 py-10 space-y-3 relative"
            >
              <ShapeOne />
              <h1 className="text-4xl md:max-w-sm font-bold">
                Pay Your Bills Effortlessly
              </h1>
              <p className="md:max-w-lg">
                Whether it's utility bills, mobile recharge, or subscription
                services, our platform allows you to manage all your payments in
                one place—quickly and securely.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Instant payment</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Multiple bill categories</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Secure transactions</p>
                </div>
              </div>
              <div className="flex md:justify-start justify-center pt-4">
                <Link
                  to="#services"
                  className="bg-white text-primary-500 md:px-10 px-20 py-3 rounded-lg block z-10"
                >
                  Start Paying Your Bills
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 600 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="bg-white md:mb-0 mb-10"
            >
              <img
                src="/images/bills-payment.webp"
                alt=""
                className="h-full object-cover"
              />
            </motion.div>
          </div>
          <div className="md:hidden grid">
            <div className="bg-primary-500 text-white md:text-left text-center md:pl-20 px-5 py-10 space-y-3 relative">
              <ShapeOne />
              <h1 className="text-4xl md:max-w-sm font-bold">
                Pay Your Bills Effortlessly
              </h1>
              <p className="md:max-w-lg">
                Whether it's utility bills, mobile recharge, or subscription
                services, our platform allows you to manage all your payments in
                one place—quickly and securely.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Instant payment</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Multiple bill categories</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Secure transactions</p>
                </div>
              </div>
              <div className="flex md:justify-start justify-center pt-4">
                <Link
                  to="#services"
                  className="bg-white text-primary-500 md:px-10 px-20 py-3 rounded-lg block z-10"
                >
                  Start Paying Your Bills
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="/images/bills-payment.webp"
                alt=""
                className="md:h-full h-96 object-cover w-full"
              />
            </div>
          </div>

          <motion.div
            initial={{ y: 200 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="grid md:grid-cols-2 md:h-screen"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white md:order-first order-last"
            >
              <img
                src="/images/investment.jpg"
                alt=""
                className="md:h-full h-96 object-cover w-full object-right"
              />
            </motion.div>
            <div className="bg-primary-500 text-white md:text-left text-center md:pl-20 px-5 py-10 space-y-3 relative">
              <ShapeTwo />
              <h1 className="text-4xl md:max-w-md font-bold">
                Grow Your Wealth with Smart Investments
              </h1>
              <p className="md:max-w-lg">
                Explore a range of investment opportunities designed to fit your
                financial goals. From savings to high-yield investments, we help
                you make your money work for you.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Diverse investment options</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Real-time portfolio tracking</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Personalized investment advice</p>
                </div>
              </div>
              <div className="flex md:justify-start justify-center pt-4">
                <Link
                  to="#services"
                  className="bg-white text-primary-500 md:px-10 px-20 py-3 rounded-lg block z-10"
                >
                  Start Investing Today
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 md:h-screen">
            <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="bg-primary-500 text-white md:text-left text-center md:pl-20 px-5 py-10 space-y-3 relative"
            >
              <ShapeOne />
              <h1 className="text-4xl md:max-w-md font-bold">
                Learn Anytime, Anywhere
              </h1>
              <p className="md:max-w-lg">
                Boost your skills and knowledge with our e-learning courses,
                from professional development to personal growth. Access
                high-quality content anytime, anywhere.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Wide variety of courses</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Certificates on completion</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Self-paced learning</p>
                </div>
              </div>
              <div className="flex md:justify-start justify-center pt-4">
                <Link
                  to="#services"
                  className="bg-white text-primary-500 md:px-10 px-20 py-3 rounded-lg block z-10"
                >
                  Explore Courses
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="bg-white"
            >
              <img
                src="/images/e-learning.webp"
                alt=""
                className="md:h-full h-96 object-cover w-full object-right"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 500 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="grid md:grid-cols-2 md:h-screen"
          >
            <div className="bg-white md:order-first order-last">
              <img
                src="/images/easybuy.jpg"
                alt=""
                className="md:h-full h-96 object-cover w-full"
              />
            </div>
            <div className="bg-primary-500 text-white md:text-left text-center md:pl-20 px-5 py-10 space-y-3 relative">
              <ShapeTwo />
              <h1 className="text-4xl md:max-w-md font-bold">
                Shop with Ease, Pay Later
              </h1>
              <p className="md:max-w-lg">
                Get the products you love with flexible payment options. Buy now
                and pay in installments, making shopping more convenient and
                stress-free.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Flexible payment plans</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Buy now, pay later options</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight3 size="18" color="#FFFFFF" variant="Bold" />
                  <p>Fast delivery</p>
                </div>
              </div>
              <div className="flex md:justify-start justify-center pt-4">
                <Link
                  to="#services"
                  className="bg-white text-primary-500 md:px-10 px-20 py-3 rounded-lg block z-10"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
