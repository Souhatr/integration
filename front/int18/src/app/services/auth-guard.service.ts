import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const requiresAdmin = route?.data?.admin === true;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (requiresAdmin && !this.auth.isAdmin()) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  // Use injector to access Router if needed
  const router = inject(Router);
  const raw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
  if (!raw) {
    router.navigate(['/login']);
    return false;
  }
  let user: any = null;
  try {
    user = JSON.parse(raw);
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
  const requiresAdmin = route?.data?.['admin'] === true;
  const role = user?.role?.toString()?.toUpperCase();
  if (requiresAdmin && !(user && (role === 'ADMIN' || role === 'SUPER_ADMIN'))) {
    router.navigate(['/access-denied']);
    return false;
  }
  return true;
};
