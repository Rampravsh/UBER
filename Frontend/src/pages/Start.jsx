import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left Part: Background image and Logo */}
      <div className="bg-cover bg-center bg-no-repeat bg-[url('/uber_background.jpg')] flex-1 md:w-1/2 flex flex-col pt-8 pl-8 md:pt-12 md:pl-12">
        {/* Replace with your local logo path if needed, e.g., '/uber-logo.png' */}
        <img
          className="w-16 md:w-24 invert"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
      </div>

      {/* Right Part: Get Started Section */}
      <div className="bg-white pb-7 py-5 px-10 md:w-1/2 md:flex md:flex-col md:justify-center md:items-center">
        <div className="w-full md:max-w-md flex flex-col gap-4 md:gap-5">
          <h2 className="text-3xl md:text-4xl font-bold">Get Started</h2>
          <Link
            to="/login"
            className="w-full flex items-center justify-center bg-black text-white py-3 px-5 rounded-lg text-lg cursor-pointer font-medium hover:bg-gray-800 transition-colors"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
