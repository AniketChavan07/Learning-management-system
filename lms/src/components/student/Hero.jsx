import React from 'react'
import Searchbar from './Searchbar'

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-cyan-100/70 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl text-center">
          
          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Empower Your Future with Online Learning{' '}
            <span className="text-blue-600">
              to fit your schedule
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover a world of knowledge at your fingertips. Our online learning
            platform offers a wide range of courses, expert instructors, and
            flexible learning options to help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Searchbar Section */}
      <div className="px-4">
        <Searchbar />
      </div>
    </>
  )
}

export default Hero