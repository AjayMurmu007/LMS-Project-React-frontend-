import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer text-blue-600"
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>

          {/* Search box */}
          <SearchBar data={input} />
        </div>

        {
          input && <div className="inline-flex items-center gap-4 px-4 py-2 border mt-6 -mb-6 text-gray-600 rounded-lg">
            <p>{input}</p>
            <img src={assets.cross_icon} alt="" className="cursor-pointer" onClick={()=>navigate("/course-list")}/>
          </div>
        }

        {/* show all courses */}

        {filteredCourse.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-16 gap-6 px-2 md:px-0">
            {filteredCourse.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))}
          </div>
        ) : (
          <p className=" text-2xl text-gray-600 mt-18">No data found</p>
        )}
      </div>
    </>
  );
};

export default CourseList;
