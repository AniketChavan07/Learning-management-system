import React from "react";
import { dummyStudentEnrolled } from "../../assets/assets";

const Studentsenrollment = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Enrollments
          </h1>
          <p className="text-gray-500 mt-2">
            Review students who enrolled in your courses and track purchase
            dates.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-4 text-left">Student</th>
                  <th className="px-6 py-4 text-left">Student ID</th>
                  <th className="px-6 py-4 text-left">Course</th>
                  <th className="px-6 py-4 text-center">Purchase Date</th>
                </tr>
              </thead>

              <tbody>
                {dummyStudentEnrolled.map((record, index) => (
                  <tr
                    key={`${record.student._id}-${index}`}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={record.student.imageUrl}
                          alt={record.student.name}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        <span className="font-medium text-gray-900">
                          {record.student.name}
                        </span>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td className="px-6 py-4 text-gray-600">
                      {record.student._id}
                    </td>

                    {/* Course */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {record.courseTitle}
                    </td>

                    {/* Purchase Date */}
                    <td className="px-6 py-4 text-center text-gray-700">
                      {formatDate(record.purchaseDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t text-sm text-gray-500">
            Total Enrollments:{" "}
            <span className="font-semibold text-gray-800">
              {dummyStudentEnrolled.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentsenrollment;