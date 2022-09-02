import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  apiUrl = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http
      .get<Response>(this.apiUrl + 'tables')
      .pipe(map((res) => res.data));
  }
}
