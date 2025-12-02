import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { LieuListComponent } from './lieu-list/lieu-list.component';
import { LoginComponent } from './login/login.component';
import { AdminLieuxComponent } from './admin-lieux/admin-lieux.component';
import { AdminReservationsComponent } from './admin-reservations/admin-reservations.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { authGuard } from './services/auth-guard.service';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ProfileComponent } from './profile/profile.component';
import { SignalReportComponent } from './signal-report/signal-report.component';
import { AdminSignalsComponent } from './admin-signals/admin-signals.component';
import { AdminSignalCategoriesComponent } from './admin-signal-categories/admin-signal-categories.component';
import { TasksMineComponent } from './tasks-mine/tasks-mine.component';
import { AdminTasksComponent } from './admin-tasks/admin-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail/:email', component: VerifEmailComponent },
  { path: 'lieuxA', component: LieuListComponent , canActivate: [authGuard] },
  { path: 'lieux/:id', loadComponent: () => import('./lieu-detail/lieu-detail.component').then(m => m.LieuDetailComponent) },
  { path: 'admin/lieux', component: AdminLieuxComponent, data: { admin: true }, canActivate: [authGuard] },
  { path: 'admin/reservations', component: AdminReservationsComponent, data: { admin: true }, canActivate: [authGuard] },
  { path: 'admin/users', component: AdminUsersComponent, data: { admin: true }, canActivate: [authGuard] },
  { path: 'signal/report', component: SignalReportComponent, canActivate: [authGuard] },
  { path: 'admin/signals', component: AdminSignalsComponent, data: { admin: true }, canActivate: [authGuard] },
  { path: 'admin/signal-categories', component: AdminSignalCategoriesComponent, data: { admin: true }, canActivate: [authGuard] },
  { path: 'tasks/mine', component: TasksMineComponent, canActivate: [authGuard] },
  { path: 'admin/tasks', component: AdminTasksComponent, data: { admin: true }, canActivate: [authGuard] },
  { path: 'users/:id', component: ProfileComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'mes-reservations', component: MyReservationsComponent , canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
