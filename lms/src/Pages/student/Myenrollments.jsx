import React, { useContext } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/student/Footer'

const Myenrollments = () => {
  const { enrolled, calculatecourseduration } = useContext(Appcontext)
const navigate = useNavigate()
  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Enrollments
        </h1>
        <p className="text-gray-500 mt-1">
          Track your enrolled courses and learning progress.
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">Course</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold">Progress</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {enrolled?.map((course, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Course Thumbnail + Title */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-16 h-10 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-800">
                      {course.courseTitle}
                    </span>
                  </div>
                </td>

                {/* Duration */}
                <td className="px-6 py-4 text-gray-600">
                  {calculatecourseduration(course)}
                </td>

                {/* Progress */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${course.courseProgress || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {course.courseProgress || 0}%
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.courseStatus === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {course.courseStatus || 'Ongoing'}
                  </span>
                </td>

                {/* Action Button */}
                <td className="px-6 py-4">
                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        onClick={() => navigate(`/Player/${course._id}`)}                  >
                    {course.courseStatus === 'Completed'
                      ? 'Completed'
                      : 'Continue'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
           <Footer/>   

    </>
  )
}

export default Myenrollments