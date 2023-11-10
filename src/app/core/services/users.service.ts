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

  // functions to auth

  public getUserToAuth(user: User): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?email=${user.email}&password=${user.password}`);
  }

  public getToCheck(user: User): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?email=${user.email}`)
  }

  public addUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/Users`, user)
  }

  //functions for token

  public generateToken(user: User): string {
    return 'Bearer' + user.id;
  }

  public setCurrentUser(token: string): void {
    localStorage.setItem('token', token)
  }

  public getCurrentUser(): Observable<User[]> | null {
    const token = localStorage.getItem('token');
    if (token) {
      return this.verifyToken(token);
    } else {
      return null;
    }
  }

  private getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users?id=${id}`)
  }

  private verifyToken(token: string): Observable<User[]> | null{
    if (token.startsWith('Bearer')) {
      const userId = token.replace('Bearer', '');
      return this.getUserById(parseInt(userId));
    }
    else {
      console.log("Token invalido")
      return null;
    }
  }
  public logout() {
    localStorage.removeItem('token')
    this.router.navigate(['']);
  }

  //functions to get and edit user data

  public editUser(id: number, updateUser: User): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/Users/${id}`, updateUser)
  }
  
}

//ejemplo de implementacion

// constructor(private usersService: UsersService) { }

// user: User = new User();

// ngOnInit(): void {
//   this.loadUser();
// }

// loadUser() {
//   const user = this.usersService.getCurrentUser();
//   if (user) {
//     user.subscribe((user: User[]) => {
//       this.user = user[0];
//       console.log("user del token:" + JSON.stringify(this.user))
//     })
//   }
// }