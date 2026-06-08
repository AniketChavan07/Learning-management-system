import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { Navigate } from 'react-router-dom'
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300 w-full">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">

        {/* Main Footer */}
        <div className="w-full grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">

          {/* Logo & Description */}
          <div className="flex flex-col items-center sm:items-start">
            <img
            onClick={() => navigate('/')}
              src={assets.logo_dark}
              alt="Logo"
              className="h-10 w-auto cursor-pointer"
            />

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Empower your future through online learning. Access
              high-quality courses, learn from industry experts,
              and achieve your goals at your own pace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/course-list" className="hover:text-white">
                  Courses
                </Link>
              </li>

              <li>
                <Link to="/my-enrollments" className="hover:text-white">
                  My Enrollments
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Subscribe to Our Newsletter
            </h3>

            <p className="mb-4 text-sm text-gray-400">
              Get the latest courses and updates directly in your inbox.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} LMS Platform. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer