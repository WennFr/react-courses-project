using CourseTracker.APi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CourseTracker.APi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {

        private static List<CourseDTO> _courses = new List<CourseDTO>()
             {
               new CourseDTO
               {
                   Id = 1,
                   Title = "React for beginners",
                   Category = "React",
                   Level = "Beginner",
                   Status = "In Progress",
                   Completion = 30
                },

                 new CourseDTO
               {
                   Id = 2,
                   Title = "ASP.NET Core Fundamentals",
                   Category = ".NET",
                   Level = "Intermediate",
                   Status = "Finished",
                   Completion = 100
                    },

                   new CourseDTO
               {
                   Id = 3,
                   Title = "Cloud Computing with Azure",
                   Category = "Azure",
                   Level = "Advanced",
                   Status = "In Progress",
                   Completion = 30
                },

                     new CourseDTO
               {
                   Id = 4,
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


        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDTO>> GetCourse(int id)
        {
            var existingCourse = _courses.FirstOrDefault(c => c.Id == id);

            if (existingCourse == null)
            {
                return BadRequest();
            }

            return Ok(existingCourse);
        }



        [HttpPost]
        [Authorize(Roles = "Teacher")]
        public async Task<ActionResult<CourseDTO>> AddCourse(CourseDTO course)
        {
            if (course.Id == 0)
            {
                course.Id = _courses.Last().Id + 1;
            }
            _courses.Add(course);
            return Ok(course);
        }


        [HttpPut]
        [Authorize(Roles = "Teacher")]
        public async Task<ActionResult<CourseDTO>> UpdateCourse(CourseDTO course)
        {
            var existingCourse = _courses.FirstOrDefault(c => c.Id == course.Id);
            if (existingCourse == null)
            {
                return NotFound();
            }
            existingCourse.Title = course.Title;
            existingCourse.Category = course.Category;
            existingCourse.Level = course.Level;
            existingCourse.Status = course.Status;
            existingCourse.Completion = course.Completion;
            return Ok(existingCourse);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<ActionResult> DeleteCourse(int id)
        {
            var course = _courses.FirstOrDefault(c => c.Id == id);
            if (course == null)
            {
                return NotFound();
            }
            _courses.Remove(course);
            return Ok(course);
        }

        [HttpGet("whoami")]
        [Authorize]
        public IActionResult WhoAmI()
        {
            return Ok(User.Claims.Select(c => new { c.Type, c.Value }));
        }

    }
}
