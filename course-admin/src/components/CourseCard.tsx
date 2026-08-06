import { Link } from "react-router-dom"
import type { Course } from "../types/Course"




const CourseCard = (props: { course: Course, changeStatus: (course: Course) => void, removeCourse: (course: Course) => void, onEdit: (course: Course) => void, isTeacher: boolean }) => {
  return (
    <div className="course-card">
      <p>Id: {props.course.id}</p>
      <h3>{props.course.title}</h3>
      <p>{props.course.category}</p>
      <p>{props.course.level}</p>
      <p>{props.course.status}</p>
      <p>Hours: {props.course.completion}</p>

      <Link to={`/courses/${props.course.id}`}>
        View details
      </Link>


      {props.isTeacher && <>
        <button className="btn mark" onClick={() => props.changeStatus(props.course)}>Mark as {props.course.status === "In Progress" ? "Finished" : "In Progress"}</button>
        <button className="btn delete" onClick={() => props.removeCourse(props.course)}>Delete</button>
        <button className="btn edit" onClick={() => props.onEdit(props.course)}>Edit</button>
      </>}


    </div>
  )
}



export default CourseCard
