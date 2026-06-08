import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">

      <div className="relative">
        <div className="w-24 h-24 border-[6px] border-blue-100 rounded-full"></div>

        <div className="absolute inset-0 w-24 h-24 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🎓</span>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-slate-800">
        Learning Hub
      </h2>

      <p className="mt-2 text-gray-500">
        Loading your learning journey...
      </p>

      <div className="flex gap-1 mt-4">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
        <span
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

    </div>
  );
};

export default Loader;