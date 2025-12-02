import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LieuService } from '../services/lieu.service';
import { Lieu } from '../model/Lieu';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../model/Reservation';

@Component({
  selector: 'app-lieu-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lieu-detail.component.html'
})
export class LieuDetailComponent implements OnInit {
  lieu: Lieu | null = null;
  loading = false;
  selectedDate: string | null = null;
  selectedPlageId: number | null = null;
  reservations: Reservation[] = [];

  constructor(private route: ActivatedRoute, private lieuService: LieuService, private router: Router,
              private userService: UserService, private auth: AuthService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.loading = true;
      this.lieuService.getLieuById(id).subscribe({ next: (l) => { this.lieu = l; this.loading = false; this.loadReservations(); }, error: (e) => { console.error(e); this.loading = false; } });
    }
  }

  loadReservations() {
    if (!this.lieu) return;
    this.lieuService.getReservationsForLieu(this.lieu.idL).subscribe({ next: (r) => this.reservations = r, error: (e) => console.error(e) });
  }

  reserve() {
    const user = this.auth.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }
    if (!this.lieu) return;
    if (!this.selectedDate) { alert('Choisissez une date'); return; }

    if (this.isConflict(this.selectedDate, this.selectedPlageId)) {
      alert('Date/plage déjà réservée. Choisissez une autre date ou plage.');
      return;
    }

    const payload: any = {
      idL: this.lieu.idL,
      idU: user.idU,
      dateDebut: this.selectedDate,
      dateFin: this.selectedDate,
      dateReservation: new Date()
    };

    this.userService.createReservation(user.idU, payload).subscribe({
      next: (ok) => {
        alert('Réservation enregistrée');
        this.loadReservations();
      },
      error: (err) => {
        console.error('Erreur réservation', err);
        alert('Erreur lors de la réservation');
      }
    });
  }

  // Check for reservation conflicts before creating
  isConflict(dateStr: string, plageId?: number | null): boolean {
    if (!dateStr) return false;
    const d = dateStr;
    return this.reservations.some(r => {
      const rd = r.dateDebut ? (typeof r.dateDebut === 'string' ? r.dateDebut.split('T')[0] : '') : '';
      if (!rd) return false;
      if (rd !== d) return false;
      if (plageId == null) return true; // any reservation on the date blocks if no plage chosen
      // if reservation includes plage info (not currently), skip detailed check
      return true;
    });
  }

  formatTime(value?: string): string {
    if (!value) return '';
    // If it's a full ISO string, convert to Date
    if (value.indexOf('T') >= 0) {
      try {
        const d = new Date(value);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return value;
      }
    }
    // If it's a simple time like "10:00:00", return HH:mm
    if (value.length >= 5) return value.substring(0,5);
    return value;
  }

  back() {
    this.router.navigate(['/lieuxA']);
  }
}
