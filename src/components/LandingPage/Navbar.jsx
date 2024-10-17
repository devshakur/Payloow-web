import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = scrolled
    ? "fixed top-0 left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-50"
    : "fixed top-0 left-0 w-full bg-transparent transition-all duration-300 ease-in-out z-50";

  return (
    <>
      <motion.nav
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={navbarClasses}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="container mx-auto md:px-20 px-5 py-4 flex justify-between items-center font-plus-jakarta">
            <div
              className={`${scrolled ? "text-primary-500" : "text-white"
                } text-3xl md:text-4xl font-extrabold uppercase`}
            >
              revo
            </div>

            <ul
              className={`${scrolled ? "text-primary-500" : "text-white"
                } hidden md:flex space-x-6`}
            >
              <li>
                <a href="#home" className="">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="">
                  Contact
                </a>
              </li>
            </ul>

            <div className="hidden md:flex space-x-6">
              <a
                href="/login"
                className={`${scrolled
                  ? "text-black-800 border-primary-500 hover:bg-primary-500"
                  : "text-white border-white hover:bg-white hover:text-primary-500"
                  } border-2 rounded-xl px-5 md:px-10 py-2 md:py-3 hover:text-white transition-all duration-300 ease-in-out`}
              >
                Login
              </a>
              <a
                href="/register"
                className={`${scrolled
                  ? "bg-primary-500 text-white"
                  : "bg-white text-primary-500 border-white"
                  } border-2 px-5 md:px-10 py-2 md:py-3 rounded-lg`}
              >
                Sign Up
              </a>
            </div>

            <div className="md:hidden z-40">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${scrolled ? "text-primary-500" : "text-white"
                  } text-2xl`}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 px-5 py-5 bg-white w-full z-20">
          <ul className="space-y-5">
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <a href="#home" className="">
                Home
              </a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <a href="#about" className="">
                About Us
              </a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <a href="#services" className="">
                Services
              </a>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <a href="#contact" className="">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex space-x-5 mt-5">
            <a
              href="/login"
              className="text-black-800 border-primary-500 hover:bg-primary-500 border-2 rounded-lg px-5 md:px-10 py-2 md:py-3 hover:text-white transition-all duration-300 ease-in-out w-full text-center"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-primary-500 text-white px-5 py-3 rounded-lg w-full text-center"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;