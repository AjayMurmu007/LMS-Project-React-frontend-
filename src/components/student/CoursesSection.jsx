import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard';
import { AppContext } from '../../context/AppContext';

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext);
  

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>LEARN FROM  THE BEST</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-6'>
        Our courses are designed by industry experts to provide you with the skills you need to succeed in your career. <br /> Whether you're looking to start a new career or advance in your current one, we have a course for you.
      </p>

      {/* Display only the first 6 courses from card component */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10'>
       { allCourses.slice(0, 6).map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>

      <Link to={"/course-list"} onClick={() => window.scrollTo(0, 0)} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>
        Explore Courses
      </Link>
    </div>
  )
}

export default CoursesSection
