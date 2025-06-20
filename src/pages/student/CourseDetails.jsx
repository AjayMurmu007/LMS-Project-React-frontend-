import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState();
  const [openSections, setOpenSections] = useState({});
  const [isAllreadyEnrolled, setIsAllreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState();

  const {
    allCourses,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseDuration,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {courseData ? (
        <>
          <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
            <div className="absolute top-0 left-0 w-full h-64 z-1 bg-gradient-to-b from-cyan-100/70"></div>

            {/* left col */}
            <div className="max-w-xl z-10 text-gray-500">
              <h1 className="md:text-home-course-details-heading-large home-course-details-heading-small font-semibold text-gray-800">
                {courseData.courseTitle}
              </h1>
              <p
                className="pt-4 md:text-base text-sm"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription.slice(0, 200),
                }}
              ></p>
              {/* <p>
            {courseData.courseDescription.length > 200
            ? courseData.courseDescription.slice(0, 200) + "..."
            : courseData.courseDescription}
            </p> */}

              {/* Review and rating */}
              <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
                <p>{calculateRating(courseData)}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(calculateRating(courseData))
                          ? assets.star
                          : assets.star_blank
                      }
                      alt=""
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>
                <p className="text-gray-500 ">
                  ({courseData.courseRatings.length}{" "}
                  {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
                </p>
                <p className="text-gray-500 ">
                  {courseData.enrolledStudents.length}{" "}
                  {courseData.enrolledStudents.length > 1
                    ? "students"
                    : "student"}
                </p>
              </div>
              <p className="text-sm">
                Course by <span className="text-gray-500 underline">Ajay</span>
              </p>

              <div className="pt-8 text-gray-800 ">
                <h2 className="text-xl font-semibold">Course Structure</h2>

                <div className="pt-5">
                  {courseData.courseContent.map((chapter, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 bg-white mb-2 rounded-lg"
                    >
                      <div
                        onClick={() => toggleSection(index)}
                        className="flex items-center justify-between px-4 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className={`transform transition-transform ${
                              openSections[index] ? "rotate-180" : ""
                            }`}
                            src={assets.down_arrow_icon}
                            alt=""
                          />
                          <p className="font-medium md:text-base text-sm">
                            {chapter.chapterTitle}
                          </p>
                        </div>
                        <p className="text-sm md:text-xl">
                          {chapter.chapterContent.length} lectures -{" "}
                          {calculateChapterTime(chapter)}{" "}
                        </p>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openSections[index] ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-600">
                          {chapter.chapterContent.map((lecture, i) => (
                            <li key={i} className="flex items-start gap-2 py-1">
                              <img
                                src={assets.play_icon}
                                alt="play-icon"
                                className="w-4 h-4 mt-1"
                              />
                              <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-xl">
                                <p className="text-sm">
                                  {lecture.lectureTitle}
                                </p>
                                <div className="flex gap-2">
                                  {lecture.isPreviewFree && (
                                    <p
                                      onClick={() =>
                                        setPlayerData({
                                          videoId: lecture.lectureUrl
                                            .split("/")
                                            .pop(),
                                        })
                                      }
                                      className="cursor-pointer text-blue-500 text-sm"
                                    >
                                      Preview
                                    </p>
                                  )}

                                  <p className="text-sm">
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ["h", "m"] }
                                    )}{" "}
                                    mins
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-20 text-sm md:text-base">
                <h3 className="text-xl font-semibold pt-8 text-gray-800">
                  Course Summary
                </h3>
                <p
                  className="pt-3 rich-text"
                  dangerouslySetInnerHTML={{
                    __html: courseData.courseDescription,
                  }}
                ></p>
              </div>
            </div>

            {/* right col */}
            <div className="max-w-xl z-10 shadow-custum-card rounded-t md:rounded-none overflow-hidden bg-white">
              {playerData ? (
                <YouTube
                  videoId={playerData.videoId}
                  opts={{
                    width: "100%",
                    height: "300",
                    // iframeClassName: "w-full aspect-video ",
                    playerVars: {
                      autoplay: 1, // Auto-play the video
                    },
                  }}
                />
              ) : (
                <img
                  src={courseData.courseThumbnail}
                  alt="Course Thumbnail"
                  className="w-full rounded-lg mb-6"
                />
              )}

              <div className="p-5">
                <div className="flex items-center  gap-2">
                  <img
                    src={assets.time_left_clock_icon}
                    alt="time_left_clock_icon"
                    className="w-4.5 h-4.5"
                  />

                  <p className="text-red-500">
                    <span className="font-medium">5 days</span> left at this
                    price!
                  </p>
                </div>

                <div className="flex items-center gap-3  pt-2">
                  <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                    {currency}
                    {(
                      courseData.coursePrice -
                      (courseData.discount * courseData.coursePrice) / 100
                    ).toFixed(2)}
                  </p>
                  <p>{courseData.discount}% off</p>
                </div>

                <div className="flex items-center text-sm md:pt-4 md:text-base gap-4 pt-2">
                  <div className="flex items-center gap-1">
                    <img src={assets.star} alt="staricon" className="" />
                    <p>{calculateRating(courseData)}</p>
                  </div>
                  <div className="h-4 w-px bg-gray-500/40"></div>
                  <div className="flex items-center gap-1">
                    <img src={assets.star} alt="staricon" className="" />
                    <p>{calculateCourseDuration(courseData)}</p>
                  </div>

                  <div className="h-4 w-px bg-gray-500/40"></div>
                  <div className="flex items-center gap-1">
                    <img
                      src={assets.lesson_icon}
                      alt="lesson icon"
                      className=""
                    />
                    <p>{calculateNoOfLectures(courseData)} lessons</p>
                  </div>
                </div>
                <button className="md:mt-6 mt-4 w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  {isAllreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>

                <div className="pt-6">
                  <p className="md:text-xl text-lg font-medium text-gray-800">
                    {" "}
                    What's in the course?
                  </p>
                  <ul className="ml-4 pt-2 text-sm md:text-[15px] list-disc text-gray-500">
                    <li>Lifetime access with free updates.</li>
                    <li>Step-by-step, hands-on project guidence.</li>
                    <li>Downloads source code.</li>
                    <li>Certificate of completion.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          {" "}
          <Loading />
        </>
      )}
    </>
  );
};

export default CourseDetails;
