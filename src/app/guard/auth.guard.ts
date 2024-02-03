import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = JSON.parse(localStorage.getItem('sb-vcnvmglstkeblqdcumaj-auth-token') || '{}');
    const accessToken = token.access_token;
    const expiresAt = token.expires_at;

    if (!accessToken || !expiresAt) {
      // No token or expiration data, redirect to login
      this.router.navigate(['/introduction']);
      return false;
    }

    const currentTime = Math.floor(new Date().getTime() / 1000);

    if (parseInt(expiresAt) > currentTime) {
      // Token exists and is not expired
      return true;
    } else {
      // Token is expired, redirect to login
      this.router.navigate(['/introduction']);
      return false;
    }
  }

}
