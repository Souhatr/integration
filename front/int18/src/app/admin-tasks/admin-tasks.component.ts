import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tasks.component.html'
})
export class AdminTasksComponent {
  tasks: any[] = [];
  task: any = { title: '', description: '', assignedTo: null };
  filter = '';
  constructor(private svc: TaskService) { this.load(); }
  load(){ this.svc.getAll().subscribe((r:any)=> this.tasks = r || []); }
  create(){ this.svc.create(this.task).subscribe(()=> { this.task = { title: '', description: '', assignedTo: null }; this.load(); }); }
  del(id:number){ this.svc.delete(id).subscribe(()=> this.load()); }
  filtered(){
    const f = (this.filter||'').toLowerCase();
    if (!f) return this.tasks;
    return this.tasks.filter(t => (t.title||'').toLowerCase().includes(f) || (t.description||'').toLowerCase().includes(f) || (t.assignedTo && t.assignedTo.toString().includes(f)) );
  }
}
