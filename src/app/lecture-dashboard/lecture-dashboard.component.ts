import { Component, OnInit } from '@angular/core';
import { Lecture } from '../_models/lecture';
import { LectureService } from '../_services/lecture.service';
import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-lecture-dashboard',
  templateUrl: './lecture-dashboard.component.html',
  styleUrls: ['./lecture-dashboard.component.scss']
})
export class LectureDashboardComponent implements OnInit {

  lectures;
  enrollments: Lecture[];
  fetching: boolean = true;

  constructor(private lectureService: LectureService, private studentSevice: StudentService) { }

  ngOnInit() {
    this.studentSevice.getEnrollments().subscribe((enrollments: Lecture[]) => {
      this.enrollments = enrollments;

      this.lectureService.getLectures().subscribe(
        (incomingLectures) => {
          this.lectures = incomingLectures.map(lecture => {
            return {
              ...lecture,
              disabled: this.enrollments.find(enrollment => enrollment._id === lecture._id) !== undefined,
            }
          });

          this.fetching = false;
        }
    );
    }); 
  }
}
