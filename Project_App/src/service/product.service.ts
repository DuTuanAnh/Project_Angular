import { Injectable } from '@angular/core';

export interface Course {
  id?: string;
  courseCode?: string;
  courseName?: string;
  credit?: number;
  status?: string; // APPROVED | PENDING | REJECTED
}

@Injectable()
export class CourseService {
  private courses: Course[] = [];

  getCourses() {
    return Promise.resolve(this.courses);
  }

  addCourse(course: Course) {
    course.id = String(Date.now());
    this.courses.push(course);
  }

  updateCourse(course: Course) {
    const index = this.courses.findIndex((c) => c.id === course.id);
    if (index > -1) this.courses[index] = course;
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter((c) => c.id !== id);
  }
}