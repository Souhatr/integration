import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Signal } from '../model/Signal.model';

@Injectable({ providedIn: 'root' })
export class SignalService {
  private api = 'http://localhost:8081/api/signals';
  private catApi = 'http://localhost:8081/api/signal-categories';

  constructor(private http: HttpClient) {}

  report(signal: Signal): Observable<Signal> {
    return this.http.post<Signal>(this.api, signal);
  }

  getMySignals(idU: number) {
    return this.http.get<Signal[]>(`${this.api}/user/${idU}`);
  }

  getAll(): Observable<Signal[]> {
    return this.http.get<Signal[]>(this.api);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  updateStatus(id: number, status: string) {
    const headers = new HttpHeaders({'Content-Type':'text/plain'});
    return this.http.put<Signal>(`${this.api}/${id}/status`, status, { headers });
  }

  getCategories() {
    return this.http.get<any[]>(this.catApi);
  }

  createCategory(cat: any) {
    return this.http.post(this.catApi, cat);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.catApi}/${id}`);
  }
}
