import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cache = new Map<string, any>();

  // ✅ CORRECT header: x-api-key
  private httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    })
  };

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<ApiResponse> {
    const key = `users-page-${page}`;
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    } 
    return this.http.get<ApiResponse>(
      `https://reqres.in/api/users?page=${page}`,
      this.httpOptions
    ).pipe(
      tap(data => this.cache.set(key, data))
    );
  }

  getUserById(id: number): Observable<{ data: User }> {
    const key = `user-${id}`;
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }
    return this.http.get<{ data: User }>(
      `https://reqres.in/api/users/${id}`,
      this.httpOptions
    ).pipe(
      tap(data => this.cache.set(key, data))
    );
  }
}
