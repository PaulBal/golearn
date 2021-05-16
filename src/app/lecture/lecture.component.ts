import { Component, Input, OnInit } from '@angular/core';
import { LectureService } from '../_services/lecture.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getDuration, getStartTime, getDate } from '../_shared/shared';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit {
  getStartT = getStartTime;
  getTime = getDuration;
  getD = getDate;

  @Input() id: string;
  @Input() title: string;
  @Input() description: string;
  @Input() studentsEnrolled: number;
  @Input() maxEnrollments: number;
  @Input() availableSpots: number;
  @Input() price: number;
  @Input() subjects: string[];
  @Input() professorId: string;
  @Input() disabled: boolean;
  @Input() startDate: Date;
  @Input() endDate: Date;

  constructor(
    private lectureService: LectureService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  enroll() {
    this.lectureService.enroll(this.id).subscribe(
      () => {
        this.disabled = true;
        this._snackBar.open(`You have been enrolled to ${this.title}!`, null, {
          duration: 3000,
        });
      },
      (err) =>
        this._snackBar.open(`You are busy at this time!`, null, {
          duration: 3000,
        })
    );
  }
}
