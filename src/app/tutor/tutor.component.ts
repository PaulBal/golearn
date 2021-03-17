import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() expertise: string[];
  @Input() hoursTutored: number;
  @Input() review: number;

  constructor() { }

  ngOnInit(): void {
  }

}
