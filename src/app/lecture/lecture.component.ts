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
  @Input() maxEnrollments: number;
  @Input() availableSpots: number;
  @Input() price: number;
  @Input() subjects: string[];
  @Input() professorId: string;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
