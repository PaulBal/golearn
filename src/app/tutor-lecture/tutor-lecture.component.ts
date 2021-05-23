import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from '../_services/call.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { TutorService } from '../_services/tutor.service';

@Component({
  selector: 'app-tutor-lecture',
  templateUrl: './tutor-lecture.component.html',
  styleUrls: ['./tutor-lecture.component.scss'],
})
export class TutorLectureComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() startDate: Date;

  deleted: boolean = false;

  constructor(
    private tutorService: TutorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getStartTime() {
    let sDate = new Date(this.startDate);
    let hoursDiff = sDate.getHours() - sDate.getTimezoneOffset() / 60;
    let minutesDiff = (sDate.getHours() - sDate.getTimezoneOffset()) % 60;
    sDate.setHours(hoursDiff);
    sDate.setMinutes(minutesDiff);

    return (
      sDate.getUTCHours() +
      ':' +
      (sDate.getUTCMinutes() < 10
        ? '0' + sDate.getUTCMinutes()
        : sDate.getUTCMinutes())
    );
  }

  onDelete(): void {
    this.tutorService.deleteLecture(this.id).subscribe(() => {
      this.deleted = true;
    });
  }

  initiateCall() {
    this.router.navigate(['room', this.id]);
  }
}
