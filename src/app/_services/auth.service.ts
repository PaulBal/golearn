import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  isStudent: boolean = false;
  isTutor: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + role + '/signin', {
      username,
      password
    }, httpOptions);
  }

  signOut() {
    this.isLoggedIn = false;
    this.isStudent = false;
    this.isTutor = false;
  }

  register(username: string, firstName: string, lastName: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + role + '/signup', {
      username,
      firstName,
      lastName,
      email,
      password
    }, httpOptions);
  }
}