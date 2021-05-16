import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Lecture } from '../_models/lecture';
import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-enrollment-dashboard',
  templateUrl: './enrollment-dashboard.component.html',
  styleUrls: ['./enrollment-dashboard.component.scss'],
})
export class EnrollmentDashboardComponent implements OnInit {
  enrollments: Lecture[];
  fetching: boolean = true;
  display: boolean = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getEnrollments().subscribe((enrollments: Lecture[]) => {
      this.enrollments = enrollments;
      this.fetching = false;
    });
  }
}
