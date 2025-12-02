import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'app-admin-signals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-signals.component.html'
})
export class AdminSignalsComponent {
  signals: any[] = [];
  displayed: any[] = [];
  filter = '';

  constructor(private svc: SignalService) { this.load(); }

  load() { this.svc.getAll().subscribe((r:any)=> { this.signals = r || []; this.buildDisplay(); }); }

  delete(id:number) { this.svc.delete(id).subscribe(()=> this.load()); }

  setStatus(id:number, status:string) { this.svc.updateStatus(id,status).subscribe(()=> this.load()); }

  buildDisplay() {
    const f = (this.filter || '').toString().toLowerCase();
    if (!f) { this.displayed = [...this.signals]; return; }
      this.displayed = this.signals.filter(s => {
        return (s.idS && s.idS.toString().includes(f)) ||
               (s.description && s.description.toLowerCase().includes(f)) ||
               (s.status && s.status.toLowerCase().includes(f)) ||
               (s.category && s.category.name && s.category.name.toLowerCase().includes(f));
      });
  }
}
