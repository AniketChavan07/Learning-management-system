import React from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { useContext } from "react";
import { Appcontext } from "../../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const courslistpage = location.pathname === "/course-list";
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { iseducator } = useContext(Appcontext);
  const navigate = useNavigate();

  return (
    <nav
      className={`w-full border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-4 ${
        courslistpage ? "bg-gray-100" : "bg-cyan-100/70"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={assets.logo} alt="logo" className="h-9 w-auto sm:h-11" />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Become Educator */}
          {/* {user && <> */}

          <button
            onClick={() => {
              navigate("/educator");
            }}
            className="rounded-full border border-gray-300 px-3 py-2 text-[10px] sm:text-sm font-medium text-gray-700 transition hover:bg-white whitespace-nowrap sm:px-4"
          >
            {iseducator ? "Educator Dashboard" : "Become Educator"}
          </button>

          {/* My Enrollments */}
          <Link
            to="/my-enrollments"
            className="text-[10px] sm:text-sm font-medium text-gray-700 transition hover:text-black whitespace-nowrap"
          >
            My Enrollments
          </Link>
          {/* </> */}

          {/* Signed-in user button */}
          {user ? (
            <UserButton />
          ) : (
            <>
              <button
                className="hidden sm:block rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 whitespace-nowrap"
                onClick={() => openSignIn()}
              >
                Create Account
              </button>
              <button
                onClick={() => openSignIn()}
                className="sm:hidden flex-shrink-0"
              >
                <img
                  src={assets.user_icon}
                  alt="User"
                  className="h-9 w-9 rounded-full border border-gray-300 p-1"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
