import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() isLoggedIn;
  @Input() isTutor;
  @Input() isStudent;
  open: boolean = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    public router: Router, 
    public auth: AuthService
  ) { }

  ngOnInit(): void { }

  logout(): void {
    this.tokenStorageService.signOut();
    this.auth.signOut();
    this.router.navigate(['login']);
  }
}
