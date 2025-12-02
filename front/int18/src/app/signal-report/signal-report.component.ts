import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignalService } from '../services/signal.service';
import { Signal } from '../model/Signal.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signal-report',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signal-report.component.html'
})
export class SignalReportComponent {
  signal: Signal = new Signal();
  categories: any[] = [];

  constructor(private svc: SignalService, private router: Router, private toastr: ToastrService) {
    this.loadCategories();
  }

  loadCategories() {
    this.svc.getCategories().subscribe((res: any) => this.categories = res || []);
  }

  submit() {
    this.svc.report(this.signal).subscribe({
      next: () => {
        this.toastr.success('Signal envoyé');
        this.router.navigate(['/mes-reservations']);
      },
      error: (e) => {
        // show detailed server response when available
        console.error('Signal report failed', e);
        try {
          console.error('Server body:', e.error);
        } catch (err) { /* ignore */ }
        const detail = e?.error?.detail || e?.message || 'Erreur serveur';
        this.toastr.error(detail, 'Erreur');
      }
    });
  }
}
