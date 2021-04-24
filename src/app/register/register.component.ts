import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['student', Validators.required]
  })

  invalidForm = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  hide = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.registerForm.valid) {
      this.invalidForm = true;
      return;
    }

    this.invalidForm = false;

    const username =  this.registerForm.get('username').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const role = this.registerForm.get('role').value;

    console.log(username + ' ' + email + password + role);

    this.authService.register(username, email, password, role).subscribe(
      
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}