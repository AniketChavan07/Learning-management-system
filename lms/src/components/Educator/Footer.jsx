import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
        
        {/* Left */}
        <div>
          <img
            src={assets.logo}
            alt="logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Edu Platform. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex justify-end items-center gap-4">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />

          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />

          <img
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;