import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LieuService } from '../services/lieu.service';
import { Lieu } from '../model/Lieu';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PageResponse } from '../model/PageResponse';

@Component({
  selector: 'app-lieu-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lieu-list.component.html',
})
export class LieuListComponent implements OnInit {
  lieux: Lieu[] = [];
  pageResponse?: PageResponse;
  currentPage = 0;
  pageSize = 6;
  loading = false;
  
  searchTerm = '';
  selectedCategorie = '';
  categories = ['Hotel', 'Restaurant', 'Musée', 'Monument', 'Parc', 'Bar', 'Cinéma'];
  
  showAddForm = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  
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

  editingId: number | null = null;
  editingLieu: Lieu | null = null;

  constructor(private lieuService: LieuService, private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.loadLieux();
  }

  loadLieux() {
    this.loading = true;
    this.lieuService.getAllLieux(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.pageResponse = response;
        this.lieux = response.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 0;
    
    if (this.searchTerm) {
      this.lieuService.searchByNom(this.searchTerm, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.pageResponse = response;
          this.lieux = response.content;
        },
        error: (error) => console.error('Erreur recherche:', error)
      });
    } else if (this.selectedCategorie) {
      this.lieuService.searchByCategorie(this.selectedCategorie, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.pageResponse = response;
          this.lieux = response.content;
        },
        error: (error) => console.error('Erreur recherche:', error)
      });
    } else {
      this.loadLieux();
    }
  }

  resetSearch() {
    this.searchTerm = '';
    this.selectedCategorie = '';
    this.currentPage = 0;
    this.loadLieux();
  }

  onSubmit() {
    this.lieuService.createLieu(this.newLieu).subscribe({
      next: (lieu) => {
        this.lieux.unshift(lieu);
        this.showAddForm = false;
        this.resetNewLieu();
        this.loadLieux();
      },
      error: (error) => console.error('Erreur création:', error)
    });
  }

  cancelAdd() {
    this.showAddForm = false;
    this.resetNewLieu();
  }

  editLieu(lieu: Lieu) {
    // start inline editing
    this.editingId = lieu.idL;
    this.editingLieu = { ...lieu };
  }

  saveEdit() {
    if (!this.editingLieu) return;
    this.lieuService.updateLieu(this.editingLieu.idL, this.editingLieu).subscribe({
      next: () => { this.editingId = null; this.editingLieu = null; this.loadLieux(); },
      error: (e) => console.error('Erreur mise à jour:', e)
    });
  }

  cancelEdit() { this.editingId = null; this.editingLieu = null; }

  deleteLieu(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) {
      this.lieuService.deleteLieu(id).subscribe({
        next: () => {
          this.lieux = this.lieux.filter(l => l.idL !== id);
          this.loadLieux();
        },
        error: (error) => console.error('Erreur suppression:', error)
      });
    }
  }

  viewDetails(lieu: Lieu) {
    this.router.navigate(['/lieux', lieu.idL]);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadLieux();
    }
  }

  nextPage() {
    if (this.pageResponse && this.currentPage < this.pageResponse.totalPages - 1) {
      this.currentPage++;
      this.loadLieux();
    }
  }

  pages(): number[] {
    const total = this.pageResponse?.totalPages || 0;
    return Array.from({ length: total }, (_, i) => i);
  }

  private resetNewLieu() {
    this.newLieu = {
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
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }
}