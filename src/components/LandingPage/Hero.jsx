import React from "react";
import SouthIcon from "@mui/icons-material/South";
import { ArrowDown, ShoppingCart } from "iconsax-react";
import { Link } from "react-router-dom";

function ShapeOne() {
  return (
    <svg
      className="absolute top-0 right-20"
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

const Hero = () => {
  return (
    <>
      <section className="bg-primary-500 text-white">
        <div className="max-w-[1440px] mx-auto py-20 md:py-32 md:pt-44 px-5 md:px-20 grid md:grid-cols-2 md:items-center md:gap-10">
          <div className="md:text-left text-center md:space-y-10 space-y-3 md:pt-0 pt-10 relative">
            <ShapeOne />
            <h3 className="md:text-5xl text-4xl font-bold">
              All Your Financial, Learning, and Shopping Needs in One Place
            </h3>
            <p className="text-lg">
              Seamlessly pay bills, invest, learn, and shop—all from one
              platform.
            </p>
            <div className="flex justify-center">
              <Link
                to="/#services"
                className="bg-white px-10 py-4 text-primary-500 rounded-lg block z-10"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div>
            <div className="bg-white p-3 rounded-lg relative w-5/6 mx-auto md:mt-0 mt-10">
              <img
                src="/images/hero2.png"
                alt=""
                className="mx-auto rounded-lg"
              />
              <div className="w-56 h-20 bg-white rounded-lg absolute md:top-10 bottom-5 -left-10 py-2 px-3">
                <p className="text-[#10b259] text-xs font-semibold">
                  Bills Payment
                </p>
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-black-800">N900,000</h4>
                  <div className="bg-[#10b25922] p-2 rounded-xl">
                    <ArrowDown size="18" color="#10b259" variant="TwoTone" />
                  </div>
                </div>
                <p className="text-[10px] font-bold text-black-800">
                  Transfer from Alh. Uba
                </p>
              </div>
              <div className="w-56 h-20 bg-white rounded-lg absolute bottom-10 md:block hidden md:-right-20 -right-10 py-2 px-3">
                <p className="text-[#9c6644] text-xs font-semibold">
                  E-Learning
                </p>
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-black-800">
                    Intro to Web
                  </h4>
                  <div className="bg-[#ede0d4] p-2 rounded-xl">
                    <ShoppingCart size="18" color="#9c6644" variant="TwoTone" />
                  </div>
                </div>
                <p className="text-[10px] font-bold text-black-800">
                  Course bought by Adamu
                </p>
              </div>
              <div className="w-56 h-20 bg-white rounded-lg absolute md:hidden top-5 md:-right-20 -right-10 py-2 px-3">
                <p className="text-[#9c6644] text-xs font-semibold">
                  E-Learning
                </p>
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-black-800">
                    Intro to Web
                  </h4>
                  <div className="bg-[#ede0d4] p-2 rounded-xl">
                    <ShoppingCart size="18" color="#9c6644" variant="TwoTone" />
                  </div>
                </div>
                <p className="text-[10px] font-bold text-black-800">
                  Course bought by Adamu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
