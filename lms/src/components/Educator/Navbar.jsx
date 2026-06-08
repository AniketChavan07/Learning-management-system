import React from "react";
import { Link } from "react-router-dom";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
const Navbar = () => {
  const { user } = useUser();
  const educatorData = dummyEducatorData;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={assets.logo}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium hidden sm:block">
            Hi,{" "}
            <span className="text-blue-600 font-semibold">
              {user ? user.fullName : "Developer"}
            </span>
          </p>

          {user ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          ) : (
            <img
              src={assets.profile_img}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;