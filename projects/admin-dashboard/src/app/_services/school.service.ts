import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SchoolService {
    constructor(private http: HttpClient) {

    }

    create(data) {
        return this.http.post<any>('http://localhost:8888/api/v1/schools', data)
        .pipe(map(user => {
            console.log(user);
            return user;
        }));
    }

    get(token) {
        return this.http.get<any>('http://localhost:8888/api/v1/schools?token=' + token)
        .pipe(map(schools => {
            return schools;
        }));
    }
    getClassrooms(token, schoolId) {
        return this.http.get<any>('http://localhost:8888/api/v1/classrooms?token=' + token + '&school_id=' + schoolId)
        .pipe(map(classrooms => {
            return classrooms;
        }));
    }
}