import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Response } from '../models/response.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl = 'http://127.0.0.1:3000/';
  constructor(private http: HttpClient) {}

  public getTags(): Observable<any> {
    return this.http
      .get<Response>(`${this.apiUrl}tags`)
      .pipe(map((res) => res.data));
  }
}
