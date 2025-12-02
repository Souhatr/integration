import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../model/Reservation';
import { LieuService } from '../services/lieu.service';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-reservations.component.html'
})
export class AdminReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  displayed: any[] = [];
  apiUrl = 'http://localhost:8081/api/reservations';
  lieuxMap: Record<number, any> = {};
  usersMap: Record<number, any> = {};
  filter = '';

  constructor(private http: HttpClient, private lieuService: LieuService, private userService: UserService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<Reservation[]>(this.apiUrl).subscribe({ next: (r) => { this.reservations = r; this.enrich(); }, error: (e) => console.error(e) });
  }

  enrich() {
    const lieuIds = Array.from(new Set(this.reservations.map(x => x.idL)));
    const userIds = Array.from(new Set(this.reservations.map(x => x.idU)));

    // fetch lieux
    lieuIds.forEach(id => {
      if (!this.lieuxMap[id]) {
        this.lieuService.getLieuById(id).subscribe({ next: l => { this.lieuxMap[id] = l; this.buildDisplay(); }, error: () => { this.lieuxMap[id] = null; this.buildDisplay(); } });
      }
    });

    // fetch users
    userIds.forEach(id => {
      if (!this.usersMap[id]) {
        this.userService.getUserById(id).subscribe({ next: u => { this.usersMap[id] = u; this.buildDisplay(); }, error: () => { this.usersMap[id] = null; this.buildDisplay(); } });
      }
    });

    this.buildDisplay();
  }

  buildDisplay() {
    this.displayed = this.reservations.map(r => ({
      ...r,
      lieu: this.lieuxMap[r.idL] || null,
      user: this.usersMap[r.idU] || null
    })).filter(item => {
      const f = this.filter?.toLowerCase()?.trim();
      if (!f) return true;
      return (item.lieu && ((item.lieu.nom||'').toLowerCase().includes(f) || (item.lieu.categorie||'').toLowerCase().includes(f))) || (item.user && ((item.user.username||'').toLowerCase().includes(f) || (item.user.nom||'').toLowerCase().includes(f))) || (''+item.idR).includes(f);
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cette réservation ?')) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({ next: () => this.load(), error: (e) => console.error(e) });
  }
}
