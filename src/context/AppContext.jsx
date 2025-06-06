import { createContext, useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  // Define any state or functions you want to provide to the context
  const currency = import.meta.env.VITE_CURRENCY || 'USD';
  const navigate = useNavigate();


  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true) 
  const [enrolledCourses, setEnrolledCourses] = useState([]) 



  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses)
  }

  // Function to calculate the average rating of courses
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0; // Return 0 if no ratings are available
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return (totalRating / course.courseRatings.length).toFixed(1); // Return average rating rounded to one decimal place
  }


  // Function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
  }

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) => chapter.chapterContent.map(
      (lecture) => time += lecture.lectureDuration
    ))
    return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
  }

  // Function calculate to no. of lectures in the cuorse
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }

  // User Enrollment Courses
  const fetchUserEnrolledCourses = async () => {
    // This function should fetch the enrolled courses for the user
    // For now, we will use dummy data
    // setEnrolledCourses(dummyCourses.filter(course => course.isEnrolled));
    setEnrolledCourses(dummyCourses);
  }


  useEffect(() => {
    // Call the function to fetch all courses when the component mounts
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  
  const value = {
    currency,
    navigate,
    calculateRating,
    allCourses,
    isEducator,
    setIsEducator,
    fetchAllCourses,
    calculateChapterTime,
    calculateNoOfLectures,
    calculateCourseDuration,
    enrolledCourses,
    fetchUserEnrolledCourses

  }


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}