import type { Course } from '../types/Course';
import CourseCard from './CourseCard';
import { useState } from 'react';

function CourseList({ courses, setCourses, onEdit }: { courses: Course[], setCourses: React.Dispatch<React.SetStateAction<Course[]>>, onEdit: (course: Course) => void }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  let coursesToShow = courses;

  if (selectedCategory !== "All") {
    coursesToShow = courses.filter(course => course.category === selectedCategory)
  }
  if (selectedStatus !== "All") {
    coursesToShow = coursesToShow.filter(course => course.status === selectedStatus)
  }


  console.log("course list render")



  function changeStatus(course: Course) {

    if (course.status === "In Progress")
      course.status = "Finished"
    else if (course.status === "Finished") {
      course.status = "In Progress"
    }

    setCourses((prevCourses) => prevCourses.map((c) => (c === course ? course : c)));
  }

  function deleteCourse(course: Course) {

    if (courses.includes(course)) {
      setCourses(courses.filter(c => c !== course))
    }

  }

  return (
    <>
      <div>Courses</div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="React">React</option>
        <option value=".NET">.NET</option>
        <option value="Azure">Azure</option>
        <option value="SharePoint">SharePoint</option>
      </select>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="All">All</option>s
        <option value="In Progress">In Progress</option>
        <option value="Finished">Finished</option>
      </select>

      {coursesToShow.map((course) => (
        <CourseCard key={course.title} course={course} changeStatus={changeStatus} deleteCourse={deleteCourse} onEdit={onEdit} />
      ))}

      {coursesToShow.length === 0 ? (<p>No courses matching filtering.</p>) : null}

    </>

  )
}

export default CourseList
