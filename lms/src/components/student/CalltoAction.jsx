import React from 'react'
import { Link } from 'react-router-dom'

const CalltoAction = () => {
  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Learn Anything, Anytime, Anywhere
        </h1>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Expand your knowledge with expert-led courses designed to help you
          achieve your goals. Learn at your own pace from anywhere in the
          world and unlock new opportunities for personal and professional
          growth.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>

          <Link
            to="/courses"
            className="text-blue-600 font-medium hover:text-blue-700 transition"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CalltoAction