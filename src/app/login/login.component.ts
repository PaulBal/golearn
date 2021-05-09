import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['student', Validators.required]
  })

  invalidForm = false;
  isLoggedIn = this.authService.isLoggedIn;
  isLoginFailed = false;
  errorMessage = '';
  hide = true;
  role: string;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      // this.isLoggedIn = true;
      this.authService.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    
    if (!this.loginForm.valid) {
      this.invalidForm = true;
      return;
    }

    this.invalidForm = false;

    const username =  this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const role = this.loginForm.get('role').value;

    this.authService.login(username, password, role).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.authService.isLoggedIn = true;

        if(role === 'student') {
          this.authService.isStudent = true;
          this.router.navigate(['lectures']);
        } else if(role === 'tutor') {
          this.authService.isTutor = true;
          this.router.navigate(['tutor']);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}