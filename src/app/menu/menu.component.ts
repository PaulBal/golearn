import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  open: boolean = false;
  username?: string;
  isStudent: boolean = false;
  isTutor: boolean = false;
  isLoggedIn: Boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    public router: Router,
    public auth: AuthService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let expectedRole = this.activatedRoute.snapshot.data.expectedRole;
    if (expectedRole === 'student') {
      this.isLoggedIn = true;
      this.isStudent = true;
      this.isTutor = false;
    } else if(expectedRole === 'tutor') {
      this.isLoggedIn = true;
      this.isStudent = false;
      this.isTutor = true;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
