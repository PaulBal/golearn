import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'golearn';
  open: boolean = false;

  constructor( 
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void { }
}