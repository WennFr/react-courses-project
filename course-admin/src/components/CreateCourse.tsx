import type { Course } from "../types/Course"


const CreateCourse = ({setCourses} : {setCourses: React.Dispatch<React.SetStateAction<Course[]>>} ) => {

    function create(formData: FormData) {

        const newCourseData: Course = {
            title: formData.get('title')?.toString(),
            category: formData.get('category')?.toString(),
            level: formData.get('level')?.toString(),
            status: formData.get('status')?.toString(),
            completion: Number(formData.get('completion')?.toString())
        };


        if (newCourseData !== null) {
          setCourses((courses) => [...courses, newCourseData])  
        }
        else {
            console.log("failed")
        }
    }


    return (
        <>
            <form className="create-form" action={create}>
                <label>Title:</label>
                <input type="text" name="title" />
                <label>Category:</label>
                <input type="text" name="category" />
                <label>Level:</label>
                <input type="text" name="level" />
                <label>Status:</label>
                <input type="text" name="status" />
                <label>Completion:</label>
                <input type="number" name="completion" />
                <button type="submit">Create Course</button>
            </form>
        </>


    )
}

export default CreateCourse


