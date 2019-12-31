import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Injectable()
export class CourseService {
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
    private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';
    private addNewCourseUrl = SERVER_API_URL + '/api/course/addCourse';
    private registerCourseUrl = SERVER_API_URL + '/api/course/registerCourse';
    private registeredCoursesUrl = SERVER_API_URL + '/api/course/getRegisteredCourse';
    private dropRegisteredCourseUrl = SERVER_API_URL + '/api/course/dropRegisteredCourse';

    constructor(private http: HttpClient) {}

    getCourseInfo(): Observable<CourseDto[]> {
        debugger;
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }

    getRegisteredCourses(): Observable<CourseDto[]> {
        return this.http.get<CourseDto[]>(`${this.registeredCoursesUrl}`);
    }

    delete(courseName: String): Observable<Response> {
        return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
    }

    dropRegisteredCourse(courseName: String): Observable<Response> {
        return this.http.delete<Response>(`${this.dropRegisteredCourseUrl}/${courseName}`);
    }

    registerCourse(courseName: String) {
        return this.http.post(`${this.registerCourseUrl}/${courseName}`, courseName);
    }

    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }

    addCourseToStudent(courseName: String, currentUserCredential: String) {
        return this.http.post(this.addCourseToStudentUrl, { courseName, currentUserCredential });
    }

    addCourse(newCourse: CourseDto) {
        debugger;
        console.log('You are in Course Service');
        console.log(newCourse.teacherId);
        return this.http.post<Response>(this.addNewCourseUrl, newCourse);
    }
}
