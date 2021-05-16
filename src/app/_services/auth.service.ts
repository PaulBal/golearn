import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  isStudent: boolean;
  isTutor: boolean;

  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + role + '/signin', {
      username,
      password,
    });
  }

  register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    return this.http.post(AUTH_API + role + '/signup', {
      username,
      firstName,
      lastName,
      email,
      password,
    });
  }
}
