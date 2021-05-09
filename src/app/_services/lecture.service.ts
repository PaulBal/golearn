import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { root } from "postcss";
import { Observable } from 'rxjs';

const LECTURE_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class LectureService {

    constructor(private http: HttpClient) {}

    enroll(lectureId: string, studentId: string): Observable<any> {
        return this.http.put(LECTURE_API + lectureId, {
            studentId
        }, httpOptions);
    }
}