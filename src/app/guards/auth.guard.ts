import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // We implement a way to know if the user is logged in
    // The service gives us boolean value loggedIn and also the sessionStorage
    if (this.authService.loggedIn && sessionStorage.getItem('Token')) {
      return true
    } else {
      // If the user is not logged in, we send him to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
