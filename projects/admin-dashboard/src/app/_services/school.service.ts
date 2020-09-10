import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SchoolService {
    constructor(private http: HttpClient) {

    }

    create(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/schools', data)
        .pipe(map(user => {
            console.log(user);
            return user;
        }));
    }

    get(token) {
        return this.http.get<any>(environment.apiBaseUrl + '/schools?token=' + token)
        .pipe(map(schools => {
            return schools;
        }));
    }

    getClassrooms(token, schoolId) {
        return this.http.get<any>(environment.apiBaseUrl + '/classrooms?token=' + token + '&school_id=' + schoolId)
        .pipe(map(classrooms => {
            return classrooms;
        }));
    }

    addClassroom(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/classrooms', data)
        .pipe(map(classroom => {
            return classroom;
        }));
    }

    getTeachers(token) {
        return this.http.get<any>(environment.apiBaseUrl + '/teachers?token='+token)
        .pipe(map(response => {
            return response;
        }));
    }

    assignTeacher(data) {
        return this.http.post<any>(environment.apiBaseUrl + '/classrooms/teachers', data)
        .pipe(map(result => {
            return result;
        }));
    }
}
