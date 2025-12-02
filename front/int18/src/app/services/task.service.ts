import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../model/Task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:8081/api/tasks';

  constructor(private http: HttpClient) {}

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  myTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}/mine`);
  }

  update(id: number, t: Task): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${id}`, t);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
