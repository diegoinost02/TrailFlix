import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  // funciones para loguearse

  public getUserToAuth(user: User): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?email=${user.email}&password=${user.password}`);
  }

  public getToCheck(user: User): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?email=${user.email}`)
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/Users`, user)
  }

  //funciones para token de autenticación

  public generateToken(user: User): string {
    return 'Bearer' + user.id;
  }

  public setCurrentUser(token: string): void {
    localStorage.setItem('token', token)
  }

  public getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?id=${id}`)
  }

  public verifyToken(token: string) {
    if (token.startsWith('Bearer')) {
      const userId = token.replace('Bearer', '');
      return this.getUserById(parseInt(userId));
    }
    else {
      console.log("Token invalido")
      return null;
    }
  }
  public getCurrentUser(): Observable<User[]> | null {
    const token = localStorage.getItem('token');
    if (token) {
      return this.verifyToken(token);
    } else {
      return null;
    }
  }
  public logout() {
    localStorage.removeItem('token')
    // this.setCurrentUser(null);
    this.router.navigate(['']);
  }
}

//ejemplo del home
//
// user: User = new User();
// ngOnInit() {
//   const user = this.usersService.getCurrentUser();
//   if (user) {
//     this.user = user;
//   }
// }