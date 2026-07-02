import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../context/Appcontext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {

  const { currency ,ratings} = useContext(Appcontext)
  const originalPrice = Number(course?.coursePrice || 0)
  const discount = Number(course?.discount || 0)
  const finalPrice = discount > 0 ? originalPrice - (originalPrice * discount) / 100 : originalPrice

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      
      {/* Course Image */}
      <div className="overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="mt-2 text-sm text-gray-500">
          By {course.educator.className}
        </p>

        {/* ratings */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm font-semibold text-yellow-600">
            {ratings(course).toFixed(2)}
          </span>
              
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <img
                key={index} 
                src={index < Math.floor(ratings(course)) ? assets.star : assets.star_blank}
                alt="Star"
                className="h-4 w-4"
              />
            ))}
          </div>

          <span className="text-xs text-gray-400">
            ({course.courseRatings.length} ratings)
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl font-bold text-blue-600">
            {currency}
            {finalPrice.toFixed(2)}
          </span>

          <span className="text-sm text-gray-400 line-through">
            {currency}
            {originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Button */}
        <button className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
          View Course
        </button>
      </div>
    </Link>
  )
}

export default CourseCard