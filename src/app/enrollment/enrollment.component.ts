import { Component, Input, OnInit } from '@angular/core';
import { LectureService } from '../_services/lecture.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getDuration, getStartTime, getDate } from '../_shared/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
})
export class EnrollmentComponent implements OnInit {
  getStartT = getStartTime;
  getTime = getDuration;
  getD = getDate;

  @Input() id: string;
  @Input() tutorId: string;
  @Input() title: string;
  @Input() startDate: Date;

  enrolled: boolean = true;

  constructor(
    private lectureService: LectureService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onUnEnroll() {
    this.lectureService.unenroll(this.id).subscribe(
      () => {
        this.enrolled = false;
        this._snackBar.open(
          `You have been unenrolled from ${this.title}!`,
          null,
          { duration: 3000 }
        );
      },
      (err) => console.log(err)
    );
  }

  joinCall() {
    this.router.navigate(['room', this.id]);
  }
}
