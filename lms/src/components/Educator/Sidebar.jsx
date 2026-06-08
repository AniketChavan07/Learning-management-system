import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator",
      icon: assets.home_icon,
    },
    {
      name: "Add Course",
      path: "/educator/add-course",
      icon: assets.add_icon,
    },
    {
      name: "My Courses",
      path: "/educator/my-course",
      icon:assets.my_course_icon ,
    },
    {
      name: "Student Enrollments",
      path: "/educator/student-enrollments",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    <aside className="w-72 min-h-[calc(100vh-72px)] bg-white border-r border-gray-200 shadow-sm">
      {/* Header */}
      

      {/* Navigation */}
   <nav className="p-4 space-y-2">
  {menuItems.map((item) => {
    const active = location.pathname === item.path;

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
          active
            ? "bg-blue-50 text-blue-600 border border-blue-100"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <img
          src={item.icon}
          alt={item.name}
          className="w-5 h-5 object-contain"
        />

        <span>{item.name}</span>

        {active && (
          <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
        )}
      </Link>
    );
  })}
</nav>
    </aside>
  );
};

export default Sidebar;