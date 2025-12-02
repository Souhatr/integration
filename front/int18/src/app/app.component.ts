import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'integration';
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  get currentUserRaw(): string | null {
    return localStorage.getItem('currentUser');
  }

  get currentUser(): any | null {
    const raw = this.currentUserRaw;
    return raw ? JSON.parse(raw) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  get isAdmin(): boolean {
    const u = this.currentUser;
    const role = u?.role?.toString()?.toUpperCase();
    return !!role && (role === 'ADMIN' || role === 'SUPER_ADMIN');
  }

  get isSuperAdmin(): boolean {
    const u = this.currentUser;
    const role = u?.role?.toString()?.toUpperCase();
    return !!role && role === 'SUPER_ADMIN';
  }

  get isEmployee(): boolean {
    const u = this.currentUser;
    const role = u?.role?.toString()?.toUpperCase();
    return !!role && role === 'EMPLOYEE';
  }

  get currentUserId(): number | null {
    return this.currentUser ? this.currentUser.idU : null;
  }
}
