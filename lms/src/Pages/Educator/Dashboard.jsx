import React, { useContext, useEffect, useState } from "react";
import { dummyDashboardData, assets } from "../../assets/assets";
import { Appcontext } from "../../context/Appcontext";
import Loader from "../../components/student/Loader";

const Dashboard = () => {
  const { currency } = useContext(Appcontext);
  const [dashboarddata, setdashboarddata] = useState(null);

  const fetchdashboarddata = async () => {
    setdashboarddata(dummyDashboardData);
  };

  useEffect(() => {
    fetchdashboarddata();
  }, []);

  if (!dashboarddata) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Educator Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Enrollments */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-all">
          <div className="bg-blue-100 p-4 rounded-full">
            <img
              src={assets.patients_icon}
              alt="Enrollments"
              className="w-10 h-10"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {dashboarddata.enrolledStudentsData.length}
            </h2>
            <p className="text-gray-500">Total Enrollments</p>
          </div>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-all">
          <div className="bg-green-100 p-4 rounded-full">
            <img
              src={assets.appointments_icon}
              alt="Courses"
              className="w-10 h-10"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {dashboarddata.totalCourses}
            </h2>
            <p className="text-gray-500">Total Courses</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-all">
          <div className="bg-yellow-100 p-4 rounded-full">
            <img
              src={assets.earning_icon}
              alt="Earnings"
              className="w-10 h-10"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {currency}
              {dashboarddata.totalEarnings}
            </h2>
            <p className="text-gray-500">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Recent Enrollments
        </h2>

        <div className="space-y-4">
          {dashboarddata.enrolledStudentsData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-none"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.student.imageUrl}
                  alt={item.student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.student.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.courseTitle}
                  </p>
                </div>
              </div>

              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;