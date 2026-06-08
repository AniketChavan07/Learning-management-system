import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Appcontext } from '../../context/Appcontext'
import Loader from '../../components/student/Loader'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'
import YouTube from "react-youtube";

const CourseDetails = () => {
  const {
    allcourse,
    ratings,
    calculatechaptertime,
    calculatecourseduration,
    calculatecourselectures,
    userData, // replace with your user state if different
  } = useContext(Appcontext)

  const { id } = useParams()

const [course, setcourse] = useState(null)
const [videoId, setVideoId] = useState("")
  const fetchCourseDetails = () => {
    const foundcourse = allcourse.find(
      (course) => course._id?.toString() === id
    )

    setcourse(foundcourse)
  }

  useEffect(() => {
    if (allcourse.length > 0) {
      fetchCourseDetails()
    }
  }, [allcourse, id])



  const courseRating = course ? ratings(course) || 0 : 0

  // Enrollment Check
  const isEnrolled =
    course?.enrolledStudents?.includes(userData?._id) || false

  return course ? (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-4xl font-bold mb-4">
            {course.courseTitle}
          </h1>

          <div
            className="text-gray-300 leading-7"
            dangerouslySetInnerHTML={{
              __html: course.courseDescription,
            }}
          />

          <div className="mt-5 flex flex-wrap items-center gap-3">

            <span className="text-yellow-400 font-semibold">
              {courseRating.toFixed(1)}
            </span>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < Math.floor(courseRating)
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-4 h-4"
                />
              ))}
            </div>

            <span className="text-sm text-gray-300">
              ({course.courseRatings?.length || 0} ratings)
            </span>

            <span className="text-sm text-gray-300">
              {course.enrolledStudents?.length || 0} students
            </span>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Course Structure
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                  {course.courseContent?.length || 0} Chapters
                </span>

                <span>
                  {calculatecourselectures(course)} Lectures
                </span>

                <span>
                  {calculatecourseduration(course)}
                </span>
              </div>
            </div>

            <div className="space-y-5">

              {course.courseContent?.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="bg-white border rounded-xl overflow-hidden shadow-sm"
                >

                  <div className="bg-gray-100 px-5 py-4 flex justify-between items-center">

                    <div>
                      <h4 className="font-semibold text-lg">
                        {chapter.chapterTitle}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {chapter.chapterContent?.length || 0} Lectures
                      </p>
                    </div>

                    <span className="text-sm font-medium">
                      {calculatechaptertime(chapter)}
                    </span>

                  </div>

                  <div className="divide-y">

                    {chapter.chapterContent?.map(
                      (lecture, lectureIndex) => (
                        <div
                          key={lectureIndex}
                          className="flex justify-between items-center px-5 py-4 hover:bg-gray-50"
                        >
<div className="flex items-center gap-3">
  <img
    src={assets.play_icon}
    alt="play"
    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
    onClick={() => {
      if (!lecture.lectureUrl) return

      const id = lecture.lectureUrl.includes("youtu.be/")
        ? lecture.lectureUrl.split("youtu.be/")[1]
        : lecture.lectureUrl.split("v=")[1]?.split("&")[0]

      setVideoId(id)
    }}
  />

  <span className="text-gray-700">
    {lecture.lectureTitle}
  </span>
</div>
                          <span className="text-sm text-gray-500">
                            {lecture.lectureDuration} min
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl shadow-xl border sticky top-24 overflow-hidden">

              {/* Thumbnail */}
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                {/* Price */}
                <div className="mb-5">

                  <div className="flex items-center gap-3">

                    <span className="text-4xl font-bold text-slate-900">
                      ₹{course.coursePrice}
                    </span>

                    <span className="line-through text-gray-400">
                      ₹1999
                    </span>

                    <span className="text-green-600 font-semibold">
                      50% OFF
                    </span>

                  </div>

                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">

                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{courseRating.toFixed(1)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>⏱</span>
                    <span>
                      {calculatecourseduration(course)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>📚</span>
                    <span>
                      {calculatecourselectures(course)} Lessons
                    </span>
                  </div>

                </div>

                {/* Enroll Button */}
                {isEnrolled ? (
                  <button
                    disabled
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                  >
                    ✓ Already Enrolled
                  </button>
                ) : (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                    Enroll Now
                  </button>
                )}

                {/* Course Includes */}
                <div className="mt-8">

                  <h3 className="font-bold text-lg mb-4">
                    What's in this course?
                  </h3>

                  <ul className="space-y-3 text-sm text-gray-600">

                    <li>• Lifetime access with free updates.</li>

                    <li>• Step-by-step practical learning.</li>

                    <li>• Downloadable source code.</li>

                    <li>• Practice quizzes and assignments.</li>

                    <li>• Certificate of completion.</li>

                    <li>• Mobile and desktop access.</li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
{videoId && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-4 w-full max-w-4xl relative">

      <button
        onClick={() => setVideoId("")}
        className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full font-bold"
      >
        ✕
      </button>

      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "500",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    </div>
  </div>

)}

      <Footer />
    </div>
  ) : (
    <Loader />
  )

}

export default CourseDetails