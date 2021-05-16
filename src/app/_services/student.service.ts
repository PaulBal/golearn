import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecture } from '../_models/lecture';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>('http://localhost:8080/my/enrollments');
  }
}
