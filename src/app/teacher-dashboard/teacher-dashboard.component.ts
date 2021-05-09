import { Component, OnInit } from '@angular/core';
import { TutorService } from '../tutor.service';
import { Tutor } from '../tutor/tutor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  private name: FormControl = new FormControl('');
  private maxAttendees: FormControl = new FormControl('');
  private subject: FormControl = new FormControl('');
  private tutors: Tutor[] = [];
  buttonClicked: boolean = false;
  content?: string;

  constructor(private tutorService: TutorService) { }

  ngOnInit(): void { }

  onClick() {
    this.buttonClicked = true;

  }
}
