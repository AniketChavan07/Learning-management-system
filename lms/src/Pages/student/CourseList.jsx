import React, { useContext, useState, useEffect } from 'react'
import Searchbar from '../../components/student/Searchbar'
import CourseCard from '../../components/student/CourseCard'
import { Appcontext } from '../../context/Appcontext'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from '../../components/student/Footer'

const CourseList = () => {
  const navigate = useNavigate()
  const { allcourse } = useContext(Appcontext)
  const { input } = useParams()

  const [filtercourse, setfiltercourse] = useState([])

  useEffect(() => {
    if (allcourse.length > 0) {
      if (input) {
        const filtered = allcourse.filter(course =>
           course.courseTitle.toLowerCase().includes(input.toLowerCase())
        )

        setfiltercourse(filtered)
      } else {
        setfiltercourse(allcourse)
      }
    }
  }, [input, allcourse])

  return (
    <>
      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-10">

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Left Side */}
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Course List
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span
                onClick={() => navigate('/')}
                className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline"
              >
                Home
              </span>

              <span>/</span>

              <span>Course List</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <div className="w-full md:min-w-[320px] lg:min-w-[400px]">
              <Searchbar data={input} />
            </div>
          </div>

        </div>

        {/* Course Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filtercourse.length} available courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtercourse.length > 0 ? (
            filtercourse.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">
                No courses found.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default CourseList 