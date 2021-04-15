import { Component, OnInit } from '@angular/core';
import { Lecture } from '../lecture/lecture';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lecture-dashboard',
  templateUrl: './lecture-dashboard.component.html',
  styleUrls: ['./lecture-dashboard.component.scss']
})
export class LectureDashboardComponent implements OnInit {

  lectures: Lecture[];
  lecturesUrl: string = 'http://localhost:8080/lectures';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<Lecture[]>(this.lecturesUrl).subscribe(
        (lectures) => {
          this.lectures = lectures;
        }
    );
  }


}
