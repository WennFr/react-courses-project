import { useState, useEffect } from 'react';
import { CoursesData } from '../data/CoursesData';
import { getCourses } from '../api/coursesApi';

export function useCourses() {
  const [courses, setCourses] = useState(CoursesData);
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
