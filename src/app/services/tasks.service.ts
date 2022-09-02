import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Response } from '../models/response.model';
import { DialogData } from '../models/dialogData.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<any> {
    return this.http
      .get<Response>(this.apiUrl + 'tasks')
      .pipe(map((res) => res.data));
  }

  public addTask(data: DialogData, tableId: number): Observable<any> {
    return this.http.post<Response>(this.apiUrl + 'tasks', {
      title: data.task,
      tableId,
      tags: [],
    });
  }

  public clearTasks(tableId: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}tables/${tableId}`);
  }
}
