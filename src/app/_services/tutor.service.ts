import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../_models/lecture';

const TUTORS_API = 'http://localhost:8080/tutors/lectures/';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  constructor(public http: HttpClient) {}

  getLectures(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(TUTORS_API);
  }

  deleteLecture(lectureId: string): Observable<any> {
    return this.http.delete(TUTORS_API + lectureId);
  }
}
