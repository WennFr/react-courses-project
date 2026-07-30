import { useState } from "react"
import type { Course } from "../types/Course"
import { createCourse } from "../api/coursesApi"
import { useNavigate } from "react-router-dom"

const CreateCourse = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")
    const [status, setStatus] = useState("")
    const [completion, setCompletion] = useState(0)
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        title: "",
        category: "",
        level: "",
        status: "",
    })

    console.log("create course render")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newErrors = {
            title: "",
            category: "",
            level: "",
            status: "",
        }

        if (!title.trim()) newErrors.title = "Title is required"
        if (!category.trim()) newErrors.category = "Category is required"
        if (!level.trim()) newErrors.level = "Level is required"
        if (!status.trim()) newErrors.status = "Status is required"

        setErrors(newErrors)

        const hasErrors = Object.values(newErrors).some(Boolean)

        if (hasErrors) return

        const newCourseData: Course = {
            id: 0,
            title,
            category,
            level,
            status,
            completion,
        }


        await createCourse(newCourseData)
        navigate("/courses")


        resetForm()
    }



    function resetForm() {
        setTitle("")
        setCategory("")
        setLevel("")
        setStatus("")
        setCompletion(0)

        setErrors({
            title: "",
            category: "",
            level: "",
            status: "",
        })
    }

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label>Title:</label>
                <div className="input-group">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
            </div>

            <div className="form-row">
                <label>Category:</label>
                <div className="input-group">
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>
            </div>

            <div className="form-row">
                <label>Level:</label>
                <div className="input-group">
                    <input
                        type="text"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    />
                    {errors.level && <p className="error">{errors.level}</p>}
                </div>
            </div>

            <div className="form-row">
                <label>Status:</label>
                <div className="input-group">
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    {errors.status && <p className="error">{errors.status}</p>}
                </div>
            </div>

            <div className="form-row">
                <label>Completion:</label>
                <div className="input-group">
                    <input
                        type="number"
                        value={completion}
                        onChange={(e) => setCompletion(Number(e.target.value))}
                    />
                </div>
            </div>

            <button type="submit">Create Course</button>
        </form>
    )
}

export default CreateCourse