import React from 'react'
import type { Course } from '../types/Course'
import { useState } from 'react'
import { editCourse } from '../api/coursesApi'

const EditModal = ({ setCourses, selectedCourse, setIsModalOpen }: {
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    selectedCourse: Course;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [title, setTitle] = useState(selectedCourse.title ?? "")
    const [category, setCategory] = useState(selectedCourse.category ?? "")
    const [level, setLevel] = useState(selectedCourse.level ?? "")
    const [status, setStatus] = useState(selectedCourse.status ?? "")
    const [completion, setCompletion] = useState(selectedCourse.completion ?? 0)

    const [errors, setErrors] = useState({
        title: "",
        category: "",
        level: "",
        status: "",
    })


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
            id: selectedCourse.id,
            title,
            category,
            level,
            status,
            completion,
        }

        console.log(newCourseData)

        const editedCourse: Course = await editCourse(newCourseData)

        setCourses((courses) => courses.map(course => course.id ===  editedCourse .id ? editedCourse : course))
        resetForm()
        setIsModalOpen(false)
    }

  

    function resetForm() {
        setTitle(selectedCourse.title ?? "")
        setCategory(selectedCourse.category ?? "")
        setLevel(selectedCourse.level ?? "")
        setStatus(selectedCourse.status ?? "")
        setCompletion(selectedCourse.completion ?? 0)

        setErrors({
            title: "",
            category: "",
            level: "",
            status: "",
        })
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <form className="edit-form" onSubmit={handleSubmit}>
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

                        <div className="form-actions">

                            <button className="btn" type="submit">Save</button>
                            <button className="btn cancel" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditModal