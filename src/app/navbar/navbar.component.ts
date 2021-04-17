import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openSidenav = () => {
    this.open = true;
    console.log(this.open);
  }

  closeSidenav = () => {
    this.open = false;
    console.log(this.open);
  }
}
