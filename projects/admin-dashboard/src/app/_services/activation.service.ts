import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ActivationService {
    constructor(private http: HttpClient) {
        
    }

    activate(data) {
        return this.http.post<any>('http://localhost:8888/api/v1/user-activation', data)
        .pipe(map(activation => {
            return activation;
        }));
    }

    get(token) {
        return this.http.get<any>('http://localhost:8888/api/v1/activations?token=' + token)
        .pipe(map(pins => {
            return pins;
        }));
    }
}