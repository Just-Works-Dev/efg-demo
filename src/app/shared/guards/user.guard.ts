import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    public router: Router,
    @Inject(LOCAL_STORAGE) private LocalStorage: any
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user = '';
    let token = '';
    try {
      user = this.LocalStorage.getItem('user');
      token = this.LocalStorage.getItem('token');
    }
    catch{ }

    if (!user && !token) {
      this.router.navigate(['register']);
      return false
    }
    return true;
  }
}
