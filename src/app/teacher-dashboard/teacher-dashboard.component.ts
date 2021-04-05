import { Component, OnInit } from '@angular/core';
import { TutorService } from '../tutor.service';
import { Tutor } from '../tutor/tutor';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  private tutors: Tutor[] = [];

  constructor(private tutorService: TutorService) { }

  ngOnInit(): void {
    this.tutorService.tutors.subscribe((tutors: Tutor[]) => {
      this.tutors = tutors;
    });
  }
}
