import type { Course } from '../types/Course'

const CourseStatisticsCard = ({ courses }: { courses: Course[] }) => {

const coursesAmount = courses.length
const finishedCourses = courses.filter(c => c.status === "Finished").length
const inProgressCourses = courses.filter(c => c.status === "In Progress").length
const totalHours = courses.reduce((acc, course) => acc + course.completion, 0)


  return (
    <div className='course-card'>
        <h3>Stats</h3>
        <p>Amount of Courses: {coursesAmount}</p>
        <p>Finished: {finishedCourses}</p>
        <p>In Progress: {inProgressCourses}</p>
        <p>Total amount of hours: {totalHours}</p>

    </div>
  )
}

export default CourseStatisticsCard