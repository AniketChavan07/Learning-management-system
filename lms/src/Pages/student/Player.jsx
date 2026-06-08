import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Ratings from "../../components/student/Ratings";
import Loader from "../../components/student/Loader"
const Player = () => {
  const {
    enrolled,
    calculatecourseduration,
    calculatecourselectures,
    calculatechaptertime,
  } = useContext(Appcontext);

  const { courseId } = useParams();

  const [coursedata, setCourseData] = useState(null);
  const [videoId, setVideoId] = useState("");

  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!enrolled?.length) return;

    const foundCourse = enrolled.find((course) => course._id === courseId);

    if (foundCourse) {
      setCourseData(foundCourse);

      const firstLecture = foundCourse.courseContent?.[0]?.chapterContent?.[0];

      if (firstLecture?.lectureUrl) {
        const id = firstLecture.lectureUrl.includes("youtu.be/")
          ? firstLecture.lectureUrl.split("youtu.be/")[1]
          : firstLecture.lectureUrl.split("v=")[1]?.split("&")[0];

        setVideoId(id);
      }
    }
  }, [enrolled, courseId]);

  if (!coursedata) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader/>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {coursedata.courseTitle}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>{coursedata.courseContent?.length || 0} Chapters</span>

                <span>{calculatecourselectures(coursedata)} Lectures</span>

                <span>{calculatecourseduration(coursedata)}</span>
              </div>
            </div>

            <div className="space-y-5">
              {coursedata.courseContent?.map((chapter, chapterIndex) => (
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
                    {chapter.chapterContent?.map((lecture, lectureIndex) => (
                      <div
                        key={lectureIndex}
                        className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={assets.play_icon}
                            alt="play"
                            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                            onClick={() => {
                              if (!lecture.lectureUrl) return;

                              const id = lecture.lectureUrl.includes(
                                "youtu.be/",
                              )
                                ? lecture.lectureUrl.split("youtu.be/")[1]
                                : lecture.lectureUrl
                                    .split("v=")[1]
                                    ?.split("&")[0];

                              setVideoId(id);
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
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border">
              {/* Thumbnail / Video */}
              <div className="aspect-video bg-black">
                {!playVideo ? (
                  <img
                    src={coursedata.courseThumbnail}
                    alt={coursedata.courseTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <YouTube
                    videoId={videoId}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {coursedata.courseTitle}
                </h2>

                <p className="text-gray-500 mt-2">
                  Continue your learning journey.
                </p>
                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-gray-600 font-medium">Chapters</span>
                    <span className="font-bold text-indigo-600">
                      {coursedata.courseContent?.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-gray-600 font-medium">Lectures</span>
                    <span className="font-bold text-indigo-600">
                      {calculatecourselectures(coursedata)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-gray-600 font-medium">Duration</span>
                    <span className="font-bold text-indigo-600">
                      {calculatecourseduration(coursedata)}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="font-bold text-green-600">
                      {coursedata.courseProgress || 0}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${coursedata.courseProgress || 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Rate this Course
                  </h3>

                  <Ratings rating={4} />
                </div>
                <button
                  onClick={() => setPlayVideo(true)}
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
