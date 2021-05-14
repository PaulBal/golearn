import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../lecture/lecture';

const LECTURES_EP = 'http://localhost:8080/lectures/';
const ENROLLMENT_EP = 'http://localhost:8080/lectures/enroll/';

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  constructor(private http: HttpClient) {}

  getLectures(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(LECTURES_EP);
  }

  enroll(lectureId: string): Observable<any> {
    return this.http.put(ENROLLMENT_EP + lectureId, null);
  }

  unenroll(lectureId: string): Observable<any> {
    return this.http.delete(ENROLLMENT_EP + lectureId);
  }

  createLecture(
    title: string,
    maxEnrollments: number,
    subject: string,
    startDate: Date,
    duration: number
  ): Observable<any> {
    let endDate = new Date();
    endDate.setTime(endDate.getTime() + (duration * 1000 * 60));

    let data = {
      title: title,
      maxEnrollments: maxEnrollments,
      subject: subject,
      startDate: startDate,
      endDate: endDate,
    };

    return this.http.post(LECTURES_EP, data);
  }
}
