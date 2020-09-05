import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PinService {
    constructor(private http: HttpClient) {

    }

    create(data) {
        return this.http.post<any>('http://localhost:8888/api/v1/create-pins', data)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user.jwt));
            // this.currentUserSubject.next(user);
            return user;
        }));
    }

    get(token) {
        return this.http.get<any>('http://localhost:8888/api/v1/pins?token=' + token)
        .pipe(map(pins => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user.jwt));
            // this.currentUserSubject.next(user);
            return pins;
        }));
    }
}