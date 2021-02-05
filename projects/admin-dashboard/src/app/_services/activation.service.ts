import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ActivationService {
    constructor(private http: HttpClient) {

    }

    activate(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/user-activation', data)
        .pipe(map(activation => {
            return activation;
        }));
    }

    activateWithPin(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/activate', data)
        .pipe(map(activation => {
            return activation;
        }));
    }

    get(token) {
        return this.http.get<any>(environment.apiBaseUrl + '/activations?token=' + token)
        .pipe(map(pins => {
            return pins;
        }));
    }
}