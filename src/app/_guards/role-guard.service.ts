import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public router: Router, public tokenService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    const token = this.tokenService.getToken();
    const isLoggedIn = !!token;
    const tokenPayload: {id: string, role: string} =  decode(token);

    if(tokenPayload.role !== expectedRole || !isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }
}
