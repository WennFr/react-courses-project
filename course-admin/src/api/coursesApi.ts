import type { Course } from "../types/Course";
import { getApiAccessToken } from '../auth/apiToken';

async function authorizedFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const accessToken = await getApiAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);
  return fetch(input, { ...init, headers });
}

export async function getCourses() {
      try {
        const response = await authorizedFetch("/api/courses");
        console.log("response", response)
        const fetchedCourses = await response.json();
        console.log("fetched courses")
        return fetchedCourses;
      }
      catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
      }
    }


export async function getCourse(id: number) {
      try {
        const response = await authorizedFetch(`/api/courses/${id}`);
        console.log("response", response)
        const fetchedCourse = await response.json();
        console.log("fetched course", fetchedCourse)
        return fetchedCourse;
      }
      catch (error) {
        console.error("Error fetching course:", error);
        throw error;
      }
    }

 export async function createCourse(course: Course) {

    try {
      const response = await authorizedFetch("/api/courses", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(course)
      });
      const content = await response.json();

      if (response.ok) {
        console.log("create course response", content)
        return content
      }
      
      throw new Error(`Failed to create course: ${content.message || response.statusText}`);

    } catch (error) {
      console.error("Error creating course:", error)
      throw error
    }
  }

  export async function editCourse(course: Course) {

    try {
      const response = await authorizedFetch("/api/courses", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(course)
      });
      const content = await response.json();

      if (response.ok) {
        console.log("edit course response", content)
        return content
      }
      
      throw new Error(`Failed to edit course: ${content.message || response.statusText}`);

    } catch (error) {
      console.error("Error editing course:", error)
      throw error
    }
  }

  export async function deleteCourse(course: Course) {
      try {
        const response = await authorizedFetch(`/api/courses/${course.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const content = await response.json();
          
          console.log("Course deleted successfully");
          return content;
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    
  }

  
