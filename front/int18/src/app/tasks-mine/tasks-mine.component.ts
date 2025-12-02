import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-mine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks-mine.component.html'
})
export class TasksMineComponent {
  tasks: any[] = [];
  displayed: any[] = [];
  filter = '';
  constructor(private svc: TaskService) { this.load(); }
  load() { this.svc.myTasks().subscribe((r:any)=> { this.tasks = r || []; this.buildDisplay(); }); }
  updateStatus(t:any, status:string){ t.status = status; this.svc.update(t.id, t).subscribe(()=> this.load()); }
  buildDisplay(){
    const f = (this.filter||'').toLowerCase();
    if (!f) { this.displayed = [...this.tasks]; return; }
    this.displayed = this.tasks.filter(t => (t.title||'').toLowerCase().includes(f) || (t.description||'').toLowerCase().includes(f) || (t.status||'').toLowerCase().includes(f));
  }
}
