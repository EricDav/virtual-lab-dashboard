import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(
        private router: Router,
        private authenticationService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('currentUser');
        if (token) {
            // Checks if token has expired
            let dateLogin = new Date(localStorage.getItem('_ld'));
            let nowDate = new Date();
            let dateDiffInSec = (nowDate.getTime() - dateLogin.getTime())/1000;

            console.log(dateDiffInSec);
            console.log(Number.parseInt(localStorage.getItem('_exp')));

            if (dateDiffInSec > Number.parseInt(localStorage.getItem('_exp'))) {
                this.router.navigate([''], { queryParams: { returnUrl: state.url }});
                localStorage.clear();
                return false;
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
