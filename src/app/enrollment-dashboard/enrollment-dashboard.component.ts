import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Lecture } from '../lecture/lecture';
import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-enrollment-dashboard',
  templateUrl: './enrollment-dashboard.component.html',
  styleUrls: ['./enrollment-dashboard.component.scss'],
})
export class EnrollmentDashboardComponent implements OnInit {
  lectures: Lecture[];
  fetching: boolean = true;
  display: boolean = true;

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.studentService.getEnrollments().subscribe((lectures: Lecture[]) => {
      this.lectures = lectures;
      this.fetching = false;
    });
  }
}
