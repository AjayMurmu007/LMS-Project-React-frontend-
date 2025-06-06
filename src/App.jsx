import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollment from "./pages/student/MyEnrollment";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentEnrolled from "./pages/educator/StudentEnrolled";
import Dashboard from "./pages/educator/Dashboard";
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";


const App = () => {

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className="text-xl min-h-screen bg-white">
    {
      !isEducatorRoute ? <Navbar /> : ''
    }
      
      <Routes>
        {/* routes for student page */}
        <Route path="/" element={<Home />}></Route>

        <Route path="/course-list" element={<CourseList />}></Route>
        <Route path="/course-list/:input" element={<CourseList />}></Route>
        <Route path="/course/:id" element={<CourseDetails />}></Route>
        <Route path="/my-enrollments" element={<MyEnrollment />}></Route>
        <Route path="/player/:courseId" element={<Player />}></Route>
        <Route path="/loading/:path" element={<Loading />}></Route>

        {/* routes for educator page */}
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />}>
          </Route>
          <Route path="add-course" element={<AddCourse />}>
            {" "}
          </Route>
          <Route path="my-course" element={<MyCourses />}>
            {" "}
          </Route>
          <Route path="student-enrolled" element={<StudentEnrolled />}>
            {" "}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
