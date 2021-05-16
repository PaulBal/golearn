import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LectureService } from '../_services/lecture.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
})
export class TeacherDashboardComponent implements OnInit {
  time: string;

  createLectureForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
    ],
    subject: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
    ],
    maxAttendees: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
  });

  constructor(
    private lectureService: LectureService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let title = this.createLectureForm.get('name').value;
    let subject = this.createLectureForm.get('subject').value;
    let maxAttendees = this.createLectureForm.get('maxAttendees').value;
    let startDate = new Date(this.createLectureForm.get('date').value);
    let duration = this.createLectureForm.get('time').value;

    this.lectureService
      .createLecture(title, maxAttendees, subject, startDate, duration)
      .subscribe(
        () => {
          this._snackBar.open('You have created a new lecture!', null, { duration: 3000 });
          this.router.navigate(['my-lectures']);
        },
        (err: HttpErrorResponse) => this._snackBar.open(`${err.error}!`, null, { duration: 3000 })
      );
  }
}
