import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lieu } from '../model/Lieu';
import { PageResponse } from '../model/PageResponse';

@Injectable({
  providedIn: 'root'
})
export class LieuService {



private apiUrl = 'http://localhost:8081/api/lieux';

  constructor(private http: HttpClient) { }

  // GET tous les lieux avec pagination
  getAllLieux(page: number = 0, size: number = 10): Observable<PageResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<PageResponse>(this.apiUrl, { params });
  }

  // Get reservations for a given lieu
  getReservationsForLieu(idL: number) {
    return this.http.get<any[]>(`${this.apiUrl.replace('/lieux','/reservations/lieu')}/${idL}`);
  }

  // GET lieu par ID
  getLieuById(id: number): Observable<Lieu> {
    return this.http.get<Lieu>(`${this.apiUrl}/${id}`);
  }

  // POST créer un lieu
  createLieu(lieu: Lieu): Observable<Lieu> {
    return this.http.post<Lieu>(this.apiUrl, lieu);
  }

  // PUT mettre à jour un lieu
  updateLieu(id: number, lieu: Lieu): Observable<Lieu> {
    return this.http.put<Lieu>(`${this.apiUrl}/${id}`, lieu);
  }

  // DELETE supprimer un lieu
  deleteLieu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Recherche par nom
  searchByNom(nom: string, page: number = 0, size: number = 10): Observable<PageResponse> {
    let params = new HttpParams()
      .set('nom', nom)
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<PageResponse>(`${this.apiUrl}/search/nom`, { params });
  }

  // Recherche par catégorie
  searchByCategorie(categorie: string, page: number = 0, size: number = 10): Observable<PageResponse> {
    let params = new HttpParams()
      .set('categorie', categorie)
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<PageResponse>(`${this.apiUrl}/search/categorie`, { params });
  }}