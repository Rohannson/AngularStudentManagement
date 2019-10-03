package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.UserCourse;
import com.mycompany.myapp.domain.dto.CourseDto;
import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.dto.CourseWithTNDto;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.service.CourseService;
import com.netflix.ribbon.proxy.annotation.Http;
import io.swagger.annotations.Api;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@Api(value="Course Service Controller", description = "Controller for find couses information")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping(path = "/api/course/findAllCourses", produces = "application/json")
    public HttpEntity<List<CourseDto>> findAllCourses(){

        List<CourseDto> allCourses = courseService.findAllCourses();

        return new ResponseEntity<>(allCourses, HttpStatus.OK);
    }

    @GetMapping(path = "/api/course/findAllCoursesWithCourseNameLongerThan/{length}", produces = "application/json")
    public HttpEntity<List<CourseDto>> findAllCoursesWithCourseNameLongerThan(@PathVariable Integer length) {
        List<CourseDto> allCourses = courseService.findAllCoursesWithNameLongerThan(length);

        return new ResponseEntity<>(allCourses, HttpStatus.OK);
    }

    @GetMapping(path = "/api/course/findAllCoursesDto", produces = "application/json")
    public HttpEntity<List<CourseDto>> findAllCoursesDto(){
        List<CourseDto> allCourses = courseService.findAllCoursesDtoFromDB();

        return new ResponseEntity<>(allCourses, HttpStatus.OK);
    }

    @GetMapping(path = "/api/course/findAllCoursesWithTNDto", produces = "application/json")
    public HttpEntity<List<CourseWithTNDto>> findAllCoursesWithTNDto(){
        List<CourseWithTNDto> allCourses = courseService.findAllCoursesDtoWithTeacherNameFromDB();

        return new ResponseEntity<>(allCourses, HttpStatus.OK);
    }

    @GetMapping(path = "/api/course/getRegisteredCourse", produces = "application/json")
    public HttpEntity<List<Course>> findAllRegisteredCourses() {
        List<UserCourse> allRegisterCoursesBundle = courseService.findAllUserCoursesWithUser();
        List<Course> allRegisteredCourses = new ArrayList<Course>();
        for (UserCourse uc : allRegisterCoursesBundle) {
            allRegisteredCourses.add(uc.getCourse());
        }
        return new ResponseEntity<>(allRegisteredCourses, HttpStatus.OK);
    }


    @PostMapping(path = "/api/course/registerCourse/{courseName}", produces = "application/json")
    public HttpStatus registerCourse(@PathVariable String courseName) {
        try {
            courseService.registerCourse(courseName);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }
    }

    @PostMapping(path = "/api/course/addCourse", produces = "application/json")
    public HttpStatus addCourse(@RequestBody @NotNull CourseDto course) {
        try {
            courseService.addCourse(course);

            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PutMapping(path = "/api/course/updateCourse", produces = "application/json")
    public HttpStatus updateCourse(@RequestBody @NotNull CourseDto course) {
        try {
            courseService.updateCourse(course);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Secured(AuthoritiesConstants.ADMIN)
    @PostMapping(path = "/api/course/createCourse", produces = "application/json")
    public HttpStatus createCourse(@RequestBody @NotNull CourseDto course) {
        try {
            courseService.addCourse(course);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Secured(AuthoritiesConstants.ADMIN)
    @DeleteMapping(path = "/api/course/deleteCourse/{courseName}", produces = "application/json")
    public HttpStatus deleteCourse(@NotNull @PathVariable("courseName") String courseName) {
        try {
            courseService.deleteCourse(courseName);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

//    @PostMapping(path = "/api/course/addCourseToStudent/{courseName}", produces = "application/js")
//    public HttpStatus addCourseToStudent(@NotNull @PathVariable("courseName") UserCourse userCourse) {
//        try {
//            courseService.addCourseToStudent(userCourse);
//            return HttpStatus.OK;
//        } catch (Exception e) {
//            return HttpStatus.BAD_REQUEST;
//        }
//    }
}