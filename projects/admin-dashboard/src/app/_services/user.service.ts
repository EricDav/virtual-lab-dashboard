import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    transferFund(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/transfers', data)
        .pipe(map(transfer => {
            return transfer;
        }));
    }

    depositFund(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/verify-payment', data)
        .pipe(map(response => {
            return response;
        }));
    }

    getTeachers(token, role) {
        return this.http.get<any>(environment.apiBaseUrl + '/teachers?token='+token + '&role=' + role)
        .pipe(map(response => {
            return response;
        }));
    }
    
    create(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/users', data)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.token));
            this.currentUserSubject.next(user.token);
            return user;
        }));
    }

    getDetails(token) {
        return this.http.get<any>(environment.apiBaseUrl + '/user-details?token='+token)
        .pipe(map(response => {
            return response;
        }));
    }

    login(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/users/login', data)
        .pipe(map(user => {
            if (!user.success) {
                return user;
            }
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const loginDate = new Date().toString(); // Date time the user logsin
            localStorage.setItem('currentUser', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            localStorage.setItem('_ld', loginDate);
            localStorage.setItem('_exp', user.exp);
            this.currentUserSubject.next(user.token);
            return user;
        }));
    }

    signup(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/users', data)
        .pipe(map(user => {
            if (!user.success) {
                return user;
            }


            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const loginDate = new Date().toString(); // Date time the user logsin
            localStorage.setItem('currentUser', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            localStorage.setItem('_ld', loginDate);
            localStorage.setItem('_exp', user.exp);
            this.currentUserSubject.next(user.token);
            return user;
        }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    updateProfile(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/users/update', data)
        .pipe(map(user => {
            return user;
        }));
    }

    updatePassword(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/users/update/password', data)
        .pipe(map(user => {
            return user;
        }));
    }
}
