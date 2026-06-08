import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Appcontext } from '../../context/Appcontext'
import CourseCard from './CourseCard'

const Coursessection = () => {

  const { allcourse } = useContext(Appcontext)

  return (
    <section className="w-full px-4 py-14 sm:px-6 md:px-8 lg:px-10">
      
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Learn from the best
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover our top-rated courses and advance your career.
            From coding to design, we have the perfect course for you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {allcourse.slice(0, 4).map((course, index) => (
            <CourseCard
              key={index}
              course={course}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/course-list"
            className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:text-base"
          >
            Show all Courses
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Coursessection