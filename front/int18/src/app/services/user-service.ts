import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private apiUrl = 'http://localhost:8081/api/users'; 

  constructor(private http: HttpClient) { }


  getAllUsers(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }


  getUserById(idU: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${idU}`);
  }

  
  inscrire(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/inscrire`, user);
  }

  login(username: string, motdepasse: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { nomUser: username, motdepasse });
  }


  logout(idU: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout/${idU}`, null);
  }

  createReservation(idU: number, res: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${idU}/reservations`, res);
  }


  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }


  updateUser(idU: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${idU}`, user);
  }

  deleteUser(idU: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idU}`);
  }}
