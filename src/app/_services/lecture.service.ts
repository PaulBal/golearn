import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../lecture/lecture';

const LECTURE_API = 'http://localhost:8080/lectures/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  constructor(private http: HttpClient) {}

  getLectures(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(LECTURE_API);
  }

  enroll(lectureId: string, studentId: string): Observable<any> {
    return this.http.put(
      LECTURE_API + lectureId,
      {
        studentId,
      },
      httpOptions
    );
  }
}
