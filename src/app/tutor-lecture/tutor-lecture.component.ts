import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorService } from '../_services/tutor.service';
import { getStartTime } from '../_shared/shared';

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
    return getStartTime(this.startDate);
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
