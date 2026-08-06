import { Link, useParams } from "react-router-dom";
import { useCourse } from "../hooks/useCourse";

const CourseDetails = () => {
    const { id } = useParams();
    const { course, isLoading } = useCourse(Number(id));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Course Details Page
            <h2>{course?.title}</h2>
            <p>Id: {course?.id}</p>
            <p>Category: {course?.category}</p>
            <p>Level: {course?.level}</p>
            <p>Completion: {course?.completion}%</p>

            <Link to={`/courses`}>
                Back to Courses
            </Link>

        </div>
    )
}
export default CourseDetails