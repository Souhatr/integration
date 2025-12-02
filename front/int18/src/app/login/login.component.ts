import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  motdepasse: string = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = null;
    this.auth.login(this.username, this.motdepasse).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/lieuxA']);
        } else {
          this.error = 'Identifiants invalides';
        }
      },
      error: (err) => {
        this.error = 'Erreur lors de la connexion';
        console.error(err);
      }
    });
  }
}
