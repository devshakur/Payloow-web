import { Facebook, Instagram, Whatsapp } from "iconsax-react";
import React from "react";
import { Link } from "react-router-dom";

function ShapeOne() {
  return (
    <svg
      className="absolute top-0 right-0 z-[1]"
      width="404"
      height="572"
      viewBox="0 0 404 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 150 C150 200, 250 100, 400 150"
        stroke="#DF41A2"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
      <path
        d="M0 300 C150 350, 250 250, 400 300"
        stroke="#41DF75"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
    </svg>
  );
}

const Footer = () => {
  return (
    <>
      <section className="relative">
        <ShapeOne />
        <footer class="bg-primary-500 ">
          <div className="max-w-[1440px] mx-auto pt-24 pb-20 md:px-[80px] px-5 sans z-1">
            <div class="">
              <div class="text-center">
                <img
                  src="/img/logo.png"
                  alt=""
                  class="w-32 grayscale invert mx-auto mb-4"
                />
                <h3 class="max-w-xl mx-auto sans md:text-5xl text-4xl text-[#E6F6FF] tracking-[0.8em] text-center font-bold">
                  REVO
                </h3>
                <p className="text-white max-w-xs mx-auto">
                  All Your Financial, Learning, and Shopping Needs in One Place
                </p>
              </div>
              <div class="md:mt-0 mt-10">
                <div class="">
                  <div class="">
                    <ul class="flex md:flex-row flex-col md:items-start md:justify-between md:space-x-20 md:space-y-0 space-y-4 text-white">
                      <li class="flex flex-col">
                        <p class="text-[#778594] mb-4">Services</p>
                        <div class="flex flex-col space-y-2">
                          <Link to="/" class="link-hover">
                            Bills Payment
                          </Link>
                          <Link to="/" class="link-hover">
                            Investment
                          </Link>
                          <Link to="/" class="link-hover">
                            E-Learning
                          </Link>
                          <Link to="/" class="link-hover">
                            Easy Buy
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-8">
              <div class="flex flex-col items-center  w-full mt-16 md:pt-12 pt-5 border-t border-[#778594] space-y-5">
                <h5 class="text-white/40 sans">
                  &copy; 2024 REVO. All rights reserved.
                </h5>
                <div class="flex items-start justify-between text-white/80">
                  <div class="flex space-x-2 items-center">
                    <a href="#!" target="_blank">
                      <Facebook size="24" color="#FFFFFF" variant="Broken" />
                    </a>
                    <a href="#!" target="_blank">
                      <Whatsapp size="24" color="#FFFFFF" variant="Broken" />
                    </a>
                    <a href="#!" target="_blank">
                      <Instagram size="24" color="#FFFFFF" variant="Broken" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
