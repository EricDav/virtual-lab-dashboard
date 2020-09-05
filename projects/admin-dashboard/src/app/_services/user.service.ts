import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {
        
    }

    transferFund(data) {
        return this.http.post<any>('http://localhost:8888/api/v1/transfers', data)
        .pipe(map(transfer => {
            return transfer;
        }));
    }

    depositFund(data) {
        return this.http.post<any>('http://localhost:8888/api/v1/verify-payment', data)
        .pipe(map(response => {
            return response;
        }));
    }

    get(token, role) {
        return this.http.get<any>('http://localhost:8888/api/v1/users?token='+token + '&role=' + role)
        .pipe(map(response => {
            return response;
        }));
    }
    
    create(data) {
        return this.http.post<any>('http://localhost:8888/api/v1/users', data)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user.jwt));
            // this.currentUserSubject.next(user);
            return user;
        }));
    }
}
