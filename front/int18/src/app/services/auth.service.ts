import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/User.model';
import { UserService } from './user-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserKey = 'currentUser';

  constructor(private userService: UserService, private router: Router) {}

  login(username: string, password: string): Observable<User | null> {
    return this.userService.login(username, password).pipe(
      tap((user: User) => {
        if (user) {
          localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.currentUserKey);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const u = this.getCurrentUser();
    const role = u?.role?.toString()?.toUpperCase();
    return u !== null && !!role && (role === 'ADMIN' || role === 'SUPER_ADMIN');
  }
}
