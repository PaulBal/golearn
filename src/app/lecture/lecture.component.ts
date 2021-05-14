import { Component, Input, OnInit } from '@angular/core';
import { LectureService } from '../_services/lecture.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit {
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
        this._snackBar.open(`You have been enrolled to ${this.title}!`, null, {duration: 3000});
      },
      (err) => this._snackBar.open(`You are busy at this time!`, null, {duration: 3000})
    );
  }

  getDate() {
    let sDate = new Date(this.startDate);
    return (
      sDate.getDate() +
      '/' +
      sDate.getUTCMonth() +
      '/' +
      sDate.getUTCFullYear()
    );
  }

  getStartTime() {
    let sDate = new Date(this.startDate);
    let hoursDiff = sDate.getHours() - sDate.getTimezoneOffset() / 60;
    let minutesDiff = (sDate.getHours() - sDate.getTimezoneOffset()) % 60;
    sDate.setHours(hoursDiff);
    sDate.setMinutes(minutesDiff);

    return sDate.getUTCHours() + ':' + sDate.getUTCMinutes();
  }

  getDuration() {
    return (
      (new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) /
      (60 * 1000)
    );
  }
}
