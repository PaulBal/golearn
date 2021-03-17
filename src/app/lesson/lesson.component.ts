import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from './lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() studentsEnrolled: number;
  @Input() maximumEnrollments: number;
  @Input() price: number;

  constructor() { }

  ngOnInit(): void {
  }

  availableSpots = (): number => {
    return this.maximumEnrollments - this.studentsEnrolled;
  }

}
