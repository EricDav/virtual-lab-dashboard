import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PinService {
    constructor(private http: HttpClient) {

    }

    create(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/create-pins', data)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user.jwt));
            // this.currentUserSubject.next(user);
            return user;
        }));
    }

    get(token) {
        return this.http.get<any>(environment.apiBaseUrl + '/pins?token=' + token)
        .pipe(map(pins => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user.jwt));
            // this.currentUserSubject.next(user);
            return pins;
        }));
    }

    getHistory(pinId) {
        return this.http.get<any>(environment.apiBaseUrl + '/pins/history?pin_id=' + pinId)
        .pipe(map(pinHistory => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user.jwt));
            // this.currentUserSubject.next(user);
            return pinHistory;
        }));
    }
}