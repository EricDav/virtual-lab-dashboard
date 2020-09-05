import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionService {
    constructor(private http: HttpClient) {
        
    }

    get(token) {
        return this.http.get<any>('http://localhost:8888/api/v1/transactions?token=' + token)
        .pipe(map(transactions => {
            return transactions;
        }));
    }
}
