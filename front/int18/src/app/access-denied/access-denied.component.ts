import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="alert alert-danger">
        <h4>Accès refusé</h4>
        <p>Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
      </div>
    </div>
  `
})
export class AccessDeniedComponent {}
