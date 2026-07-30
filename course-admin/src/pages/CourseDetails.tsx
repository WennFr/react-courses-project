import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const { id } = useParams();

    return (
        <div>
            Course ID: {id}
        </div>
    )
}
export default CourseDetails