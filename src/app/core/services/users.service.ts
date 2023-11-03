import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getUserToAuth(user:User): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/Users?email=${user.email}&password=${user.password}`);
  }
  public getToCheck(user:User): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/Users?email=${user.email}`)
  }
  public addUser(user:User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/Users`,user)
  }
}
