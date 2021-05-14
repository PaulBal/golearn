import { Component, OnInit } from '@angular/core';
import { Lecture } from '../lecture/lecture';
import { TutorService } from '../_services/tutor.service';

@Component({
  selector: 'app-tutor-lecture-dashboard',
  templateUrl: './tutor-lecture-dashboard.component.html',
  styleUrls: ['./tutor-lecture-dashboard.component.scss']
})
export class TutorLectureDashboardComponent implements OnInit {

  createdLectures: Lecture[];
  fetching: boolean = true;

  constructor(private tutorService: TutorService) { }

  ngOnInit(): void {
    this.tutorService.getLectures().subscribe((lectures) => {
      this.createdLectures = lectures;
      console.log(lectures);
      this.fetching = false;
    })
  }
}
