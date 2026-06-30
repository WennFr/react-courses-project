import CourseList from './components/CourseList'
import CourseStatisticsCard from './components/CourseStatisticsCard';
import CreateCourseControlledInput from './components/CreateCourseControlledInput';
// import CreateCourse from './components/CreateCourse'
import { CoursesData } from './data/CoursesData';
import './styles/App.css'
import { useEffect, useState } from 'react';
import type { Course } from './types/Course';
import EditModal from './components/EditModal';

function App() {
  const storageCoursesJson = localStorage.getItem("courses");
  const storageCourses = storageCoursesJson ? JSON.parse(storageCoursesJson) as Course[] : null;
  const [courses, setCourses] = useState(storageCourses ?? CoursesData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course>(CoursesData[0]);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
    console.log("added courses")
  }, [courses])


  function onEdit(course: Course) {

    setSelectedCourse(course);
    setIsModalOpen(true);

  }


  return (
    <>
      <h1>Review</h1>
      <CourseStatisticsCard courses={courses} />
      <CourseList courses={courses} setCourses={setCourses} onEdit={onEdit} />
      {/* <CreateCourse setCourses={setCourses} /> */}
      <CreateCourseControlledInput setCourses={setCourses} />

      {isModalOpen && <EditModal setCourses={setCourses} selectedCourse={selectedCourse} setIsModalOpen={setIsModalOpen} />}


    </>
  )
}

export default App
