import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../model/Reservation';
import { AuthService } from '../services/auth.service';
import { LieuService } from '../services/lieu.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './my-reservations.component.html'
})
export class MyReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  displayed: any[] = [];
  apiUrl = 'http://localhost:8081/api/users';
  currentUserId: number | null = null;
  lieuxMap: Record<number, any> = {};
  filter = '';

  constructor(private http: HttpClient, private auth: AuthService, private lieuService: LieuService) {}

  ngOnInit() {
    const u = this.auth.getCurrentUser();
    this.currentUserId = u ? u.idU : null;
    this.load();
  }

  load() {
    if (!this.currentUserId) return;
    this.http.get<Reservation[]>(`${this.apiUrl}/${this.currentUserId}/reservations`).subscribe({ next: (r) => { this.reservations = r; this.enrich(); }, error: (e) => console.error(e) });
  }

  enrich() {
    const lieuIds = Array.from(new Set(this.reservations.map(x => x.idL)));
    lieuIds.forEach(id => {
      if (!this.lieuxMap[id]) {
        this.lieuService.getLieuById(id).subscribe({ next: l => { this.lieuxMap[id] = l; this.buildDisplay(); }, error: () => { this.lieuxMap[id] = null; this.buildDisplay(); } });
      }
    });
    this.buildDisplay();
  }

  buildDisplay() {
    const f = this.filter?.toLowerCase()?.trim();
    this.displayed = this.reservations.map(r => ({ ...r, lieu: this.lieuxMap[r.idL] || null })).filter(item => {
      if (!f) return true;
      return (item.lieu && ((item.lieu.nom||'').toLowerCase().includes(f) || (item.lieu.categorie||'').toLowerCase().includes(f))) || (''+item.idR).includes(f);
    });
  }

  delete(idR: number) {
    if (!this.currentUserId) return;
    if (!confirm('Supprimer cette réservation ?')) return;
    this.http.delete(`${this.apiUrl}/${this.currentUserId}/reservations/${idR}`).subscribe({ next: () => this.load(), error: (e) => console.error(e) });
  }
}
