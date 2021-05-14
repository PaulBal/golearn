import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {}

  getStartTime(): string {
    let date = new Date(this.startDate);
    return date.getUTCHours() + ':' + date.getUTCMinutes();
  }

  onDelete(): void {
    this.tutorService.deleteLecture(this.id).subscribe(() => {
      this.deleted = true;
    });
  }
}
