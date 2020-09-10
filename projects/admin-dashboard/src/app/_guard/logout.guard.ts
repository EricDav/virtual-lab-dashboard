import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser')) {
            console.log("dashboard");
            this.router.navigate(['/dashboard']);
            return false;
        } else {
            console.log('Not Dashboard');
            return true;
        }
    }
}
