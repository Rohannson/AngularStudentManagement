import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    newCourse: CourseDto = new CourseDto();
    registeredCourse: CourseDto = new CourseDto();
    classeNameNeedToReg: string;
    courses: CourseDto[] = [];
    registeredCourses: CourseDto[] = [];
    coursesWithTN: CourseWithTNDto[] = [];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        // debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    getAllRegisteredCourses() {
        this.courseService.getRegisteredCourses().subscribe(curDto => {
            if (!curDto) {
                this.registeredCourses = [];
            } else {
                this.registeredCourses = curDto;
            }
        });
    }

    addNewCourse() {
        this.courseService.addCourse(this.newCourse).subscribe();
        this.courses.push(this.newCourse);
    }

    deleteCourseWithName(courseNameToDelete, i) {
        this.courseService.delete(courseNameToDelete).subscribe();
        this.courses.splice(i, 1);
    }

    dropRegisteredCourse(courseName, i) {
        this.courseService.dropRegisteredCourse(courseName).subscribe();
        this.registeredCourses.splice(i, 1);
    }

    clearAllCourses() {
        this.courses = [];
    }

    clearAllRegisteredCourses() {
        this.registeredCourses = [];
    }

    registerCourse(courseName: string) {
        this.courseService.registerCourse(courseName).subscribe();
        this.registeredCourses.push(this.registeredCourse);
    }
    // addCourseToStudent() {
    //     const courseName = 'temp';
    //     this.courseService.addCourseToStudent(courseName, currentUserCredential);
    // }
}
