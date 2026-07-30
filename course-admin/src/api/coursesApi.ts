import type { Course } from "../types/Course";

export async function getCourses() {
      try {
        const response = await fetch("/api/courses");
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

 export async function createCourse(course: Course) {

    try {
      const response = await fetch("/api/courses", {
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
      const response = await fetch("/api/courses", {
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
        const response = await fetch(`/api/courses/${course.id}`, {
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

  