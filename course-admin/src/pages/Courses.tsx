import { useState } from 'react'
import CourseStatisticsCard from '../components/CourseStatisticsCard'
import CourseList from '../components/CourseList'
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../types/Course';
import EditModal from '../components/EditModal';
import { CoursesData } from '../data/CoursesData';

const Courses = () => {
    const { courses, setCourses, isLoading } = useCourses();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course>(CoursesData[0]);

    function onEdit(course: Course) {

        setSelectedCourse(course);
        setIsModalOpen(true);

    }

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <>
            <h1>Review</h1>
            <CourseStatisticsCard courses={courses} />
            <CourseList courses={courses} setCourses={setCourses} onEdit={onEdit} />
            {isModalOpen && <EditModal setCourses={setCourses} selectedCourse={selectedCourse} setIsModalOpen={setIsModalOpen} />}
        </>
    )
}

export default Courses