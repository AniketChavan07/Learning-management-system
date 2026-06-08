import React, { useState } from "react";
import { assets } from "../../assets/assets";

const Addcourse = () => {
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    coursePrice: "",
    discount: "",
    courseThumbnail: "",
    courseDescription: "",
    isPublished: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Course created successfully in demo mode.\nCheck console for submitted values.");
    console.log("Submitted course data:", courseData);
    setCourseData({
      courseTitle: "",
      coursePrice: "",
      discount: "",
      courseThumbnail: "",
      courseDescription: "",
      isPublished: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Add New Course</h1>
          <p className="text-gray-500">
            Create your course by adding a title, thumbnail, description, pricing, and publish settings.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Course title</span>
              <input
                name="courseTitle"
                value={courseData.courseTitle}
                onChange={handleChange}
                placeholder="Introduction to React"
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Course price</span>
              <input
                name="coursePrice"
                type="number"
                step="0.01"
                value={courseData.coursePrice}
                onChange={handleChange}
                placeholder="49.99"
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Discount (%)</span>
              <input
                name="discount"
                type="number"
                step="1"
                value={courseData.discount}
                onChange={handleChange}
                placeholder="10"
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Thumbnail URL</span>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                <img src={assets.file_upload_icon} alt="Upload" className="h-5 w-5" />
                <input
                  name="courseThumbnail"
                  type="url"
                  value={courseData.courseThumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full bg-transparent text-sm text-gray-900 outline-none"
                />
              </div>
            </label>
          </div>

          <label className="mt-6 block space-y-2">
            <span className="text-sm font-medium text-gray-700">Course description</span>
            <textarea
              name="courseDescription"
              value={courseData.courseDescription}
              onChange={handleChange}
              placeholder="Write a short description for your course..."
              rows={6}
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white"
              required
            />
          </label>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-700">
              <input
                name="isPublished"
                type="checkbox"
                checked={courseData.isPublished}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Publish course now
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addcourse;
