using CourseTracker.APi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseTracker.APi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        
        private static List<CourseDTO> _courses = new List<CourseDTO>()
             {
               new CourseDTO
               {
            Title = "React for beginners",
                   Category = "React",
                   Level = "Beginner",
                   Status = "In Progress",
                   Completion = 30
                },

                 new CourseDTO
               {
            Title = "ASP.NET Core Fundamentals",
                   Category = ".NET",
                   Level = "Intermediate",
                   Status = "Finished",
                   Completion = 100
                    },

                   new CourseDTO
               {
            Title = "Cloud Computing with Azure",
                   Category = "Azure",
                   Level = "Advanced",
                   Status = "In Progress",
                   Completion = 30
                },

                     new CourseDTO
               {
            Title = "Azure Fundamentals",
                   Category = "Azure",
                   Level = "Intermediate",
                   Status = "In Progress",
                   Completion = 40
               },

                };

    [HttpGet]

        public async Task<ActionResult<List<CourseDTO>>> GetCourses()
        {
            return Ok(_courses);
        }


        [HttpPost]
        public async Task<ActionResult<CourseDTO>> AddCourse(CourseDTO course)
        {
            _courses.Add(course);
            return Ok(course);
        }


        [HttpPut]
        public async Task<ActionResult<CourseDTO>> UpdateCourse(CourseDTO course)
        {
            var existingCourse = _courses.FirstOrDefault(c => c.Title == course.Title);
            if (existingCourse == null)
            {
                return NotFound();
            }
            existingCourse.Category = course.Category;
            existingCourse.Level = course.Level;
            existingCourse.Status = course.Status;
            existingCourse.Completion = course.Completion;
            return Ok(existingCourse);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCourse(string title)
        {
            var course = _courses.FirstOrDefault(c => c.Title == title);
            if (course == null)
            {
                return NotFound();
            }
            _courses.Remove(course);
            return Ok();
        }

    }
}
