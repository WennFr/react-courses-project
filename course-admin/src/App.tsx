import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import CreateCourse from "./pages/CreateCourse"
import CourseDetails from "./pages/CourseDetails"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
      </Routes>

    </>
  )
}

export default App
