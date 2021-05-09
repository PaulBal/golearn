import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public tokenService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = this.tokenService.getToken();
    const isLoggedIn = !!token;
    const tokenPayload: {id: string, role: string} =  decode(token);

    // if(isLoggedIn) {
    //   this.router.navigate(['register']);
    //   return false;
    // } else if(tokenPayload.role === 'student') {
    //   this.router.navigate(['lectures']);
    // } else if(tokenPayload.role === 'tutor') {
    //   this.router.navigate(['tutor']);
    // }
    
    return true;
  }
}
