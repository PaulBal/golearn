import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../lecture/lecture';

const GET_LECTURE_EP = 'http://localhost:8080/lectures/';
const ENROLLMENT_EP = 'http://localhost:8080/lectures/enroll/';

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  constructor(private http: HttpClient) {}

  getLectures(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(GET_LECTURE_EP);
  }

  enroll(lectureId: string): Observable<any> {
    return this.http.put(ENROLLMENT_EP + lectureId, null);
  }

  unenroll(lectureId: string): Observable<any> {
    return this.http.delete(ENROLLMENT_EP + lectureId);
  }
}
