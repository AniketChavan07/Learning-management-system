import React, { useContext } from "react";
import { Appcontext } from "../../context/Appcontext";
import { dummyEducatorData } from "../../assets/assets";
import Loader from "../../components/student/Loader";

const Mycourse = () => {
  const {
    allcourse,
    currency,
    ratings,
    calculatecourseduration,
    calculatecourselectures,
  } = useContext(Appcontext);

  const educatorId = dummyEducatorData._id;

  const educatorCourses = allcourse.filter(
    (course) => course.educator === educatorId
  );

  if (!allcourse || allcourse.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500 mt-2">
            Manage your published and draft courses.
          </p>
        </div>

        {/* No Courses */}
        {educatorCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              No Courses Found
            </h2>
            <p className="text-gray-500 mt-2">
              Start creating your first course.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="px-6 py-4 text-left w-[40%]">Course</th>
                    <th className="px-6 py-4 text-center w-[12%]">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-center w-[10%]">
                      Lectures
                    </th>
                    <th className="px-6 py-4 text-center w-[10%]">Rating</th>
                    <th className="px-6 py-4 text-center w-[10%]">
                      Students
                    </th>
                    <th className="px-6 py-4 text-center w-[8%]">Price</th>
                    <th className="px-6 py-4 text-center w-[10%]">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {educatorCourses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      {/* Course Column */}
                      <td className="px-6 py-5 min-w-[400px]">
                        <div className="flex items-center gap-5">
                          <img
                            src={course.courseThumbnail}
                            alt={course.courseTitle}
                            className="w-24 h-16 rounded-lg object-cover flex-shrink-0 border"
                          />

                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-900 text-base">
                              {course.courseTitle}
                            </h3>

                            <p className="text-gray-500 text-sm max-w-[300px] line-clamp-2">
                              {course.courseDescription
                                .replace(/<[^>]+>/g, "")
                                .slice(0, 100)}
                              ...
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-5 text-center font-medium text-gray-700">
                        {calculatecourseduration(course)}
                      </td>

                      {/* Lectures */}
                      <td className="px-6 py-5 text-center font-medium text-gray-700">
                        {calculatecourselectures(course)}
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-5 text-center">
                        <span className="font-semibold text-yellow-500">
                          ★ {ratings(course).toFixed(1)}
                        </span>
                      </td>

                      {/* Students */}
                      <td className="px-6 py-5 text-center font-medium text-gray-700">
                        {course.enrolledStudents?.length || 0}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5 text-center font-semibold text-blue-600">
                        {currency}
                        {course.coursePrice.toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            course.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {course.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t text-sm text-gray-500">
              Total Courses:{" "}
              <span className="font-semibold text-gray-800">
                {educatorCourses.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycourse;