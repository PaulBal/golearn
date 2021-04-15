import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() studentsEnrolled: number;
  @Input() maximumEnrollments: number;
  @Input() price: number;
  @Input() subjects: string[];
  @Input() professorId: string;

  constructor() { }

  ngOnInit(): void {
  }

  availableSpots = (): number => {
    return this.maximumEnrollments - this.studentsEnrolled;
  }

}
