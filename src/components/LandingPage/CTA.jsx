import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <>
      <section className="bg-primary-500 text-center md:px-20 px-5 py-20">
        <motion.div
          initial={{ scale: 1.5 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, type: "tween" }}
          className="bg-white text-primary-500 py-10 rounded-lg md:p-20 p-5 space-y-5 md:max-w-4xl mx-auto"
        >
          <h3 className="md:text-5xl text-3xl font-bold">Get Our Mobile App</h3>
          <p className="md:max-w-sm mx-auto">
            Take the experience with you. Download the app for easy access to
            all services.
          </p>
          <div className="flex justify-center space-x-5 items-center pt-5">
            <Link to={"/"}>
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 1.5, type: "spring" }}
                src="/images/play-store.svg"
                alt=""
                className="md:w-40"
              />
            </Link>
            <Link to={"/"}>
              <motion.img
                src="/images/app-store.svg"
                alt=""
                className="md:w-40"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default CTA;
