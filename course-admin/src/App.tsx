import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import CreateCourse from "./pages/CreateCourse"
import CourseDetails from "./pages/CourseDetails"
import Navbar from "./components/Navbar"
import { RequireAuthentication, RequireTeacher } from "./auth/RequireTeacher"

function App() {

  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<RequireAuthentication><Courses /></RequireAuthentication>} />
          <Route path="/courses/create" element={<RequireTeacher><CreateCourse /></RequireTeacher>} />
          <Route path="/courses/:id" element={<RequireAuthentication><CourseDetails /></RequireAuthentication>} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App
