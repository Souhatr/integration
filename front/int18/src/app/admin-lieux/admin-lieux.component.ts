import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LieuService } from '../services/lieu.service';
import { Lieu } from '../model/Lieu';

@Component({
  selector: 'app-admin-lieux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-lieux.component.html'
})
export class AdminLieuxComponent implements OnInit {
  lieux: Lieu[] = [];
  allLieux: Lieu[] = [];
  filterTerm = '';
  editing: Lieu | null = null;
  newLieu: Lieu = {
    idL: 0,
    nom: '',
    description: '',
    adresse: '',
    categorie: '',
    tarif: 0,
    idImage: 0,
    disponible: true,
    plagesHoraires: []
  };

  constructor(private lieuService: LieuService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.lieuService.getAllLieux(0, 100).subscribe({
      next: (resp) => { this.allLieux = resp.content; this.applyFilter(); },
      error: (err) => console.error(err)
    });
  }

  applyFilter() {
    const t = this.filterTerm?.toLowerCase()?.trim();
    if (!t) this.lieux = [...this.allLieux];
    else this.lieux = this.allLieux.filter(l => (l.nom || '').toLowerCase().includes(t) || (l.categorie || '').toLowerCase().includes(t) || (l.adresse || '').toLowerCase().includes(t));
  }

  create() {
    this.lieuService.createLieu(this.newLieu).subscribe({
      next: (l) => { this.newLieu = { ...this.newLieu, idL: 0, nom: '', description: '', adresse: '', categorie: '', tarif: 0, idImage: 0, disponible: true, plagesHoraires: [] }; this.load(); },
      error: (err) => console.error(err)
    });
  }

  edit(l: Lieu) {
    this.editing = { ...l };
  }

  saveEdit() {
    if (!this.editing) return;
    this.lieuService.updateLieu(this.editing.idL, this.editing).subscribe({
      next: () => { this.editing = null; this.load(); },
      error: (err) => console.error(err)
    });
  }

  cancelEdit() { this.editing = null; }

  delete(id: number) {
    if (!confirm('Supprimer ce lieu ?')) return;
    this.lieuService.deleteLieu(id).subscribe({ next: () => this.load(), error: (err) => console.error(err) });
  }
}
