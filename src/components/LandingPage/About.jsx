import { CallCalling, Devices, ShieldTick } from "iconsax-react";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section className="text-center bg-background text-primary-500 font-plus-jakarta">
        <div className="max-w-[1440px] mx-auto py-20 md:px-20 px-5">
          <div>
            <h4 className="md:text-5xl text-3xl font-bold md:max-w-2xl mx-auto mb-5">
              One Platform, Endless Possibilities
            </h4>
            <p className="md:max-w-3xl mx-auto">
              Our platform is designed to simplify your life by offering a wide
              range of services in one place. Whether you want to pay your
              bills, invest wisely, learn new skills, or shop with flexible
              payment options, we’ve got you covered. Accessible anytime,
              anywhere—on the web and through our mobile app.
            </p>
            <div className="flex md:justify-between md:max-w-4xl mx-auto mt-10">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center">
                  <ShieldTick size="32" color="#1d334d" variant="Bold" />
                </div>
                <p>Trusted by thousands of users</p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center">
                  <Devices size="32" color="#1d334d" variant="Bold" />
                </div>
                <p>Seamless experience across devices</p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center">
                  <CallCalling size="32" color="#1d334d" variant="Bold" />
                </div>
                <p>24/7 customer support</p>
              </div>
            </div>
            {/* <div className="flex justify-center">
            <Link
              to="#services"
              className="mt-20 bg-primary-500 text-white px-20 py-5 rounded-lg block"
            >
              Discover All Services
            </Link>
          </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
