// hooks/useCourse.ts

import { useEffect, useState } from "react";
import type { Course } from "../types/Course";
import { getCourse } from "../api/coursesApi";

export function useCourse(id: number) {
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const fetchedCourse = await getCourse(id);
                setCourse(fetchedCourse);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchCourse();

    }, [id]);

    return {
        course,
        isLoading
    };
}