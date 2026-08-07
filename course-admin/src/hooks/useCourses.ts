import { useState, useEffect } from 'react';
import { getCourses } from '../api/coursesApi';
import type { Course } from '../types/Course';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
     async function fetchCourses() {
      try {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
    };
    fetchCourses();
  }, [])


  return { courses, setCourses, isLoading};



}
