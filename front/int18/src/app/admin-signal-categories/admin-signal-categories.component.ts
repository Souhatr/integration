import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalService } from '../services/signal.service';

@Component({
  selector: 'app-admin-signal-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-signal-categories.component.html'
})
export class AdminSignalCategoriesComponent {
  categories: any[] = [];
  name = '';
  filter = '';
  constructor(private svc: SignalService) { this.load(); }
  load() { this.svc.getCategories().subscribe((r:any)=> this.categories = r || []); }
  add() { this.svc.createCategory({name:this.name}).subscribe(()=> { this.name=''; this.load(); }); }
  del(id:number){ this.svc.deleteCategory(id).subscribe(()=> this.load()); }
  filtered() {
    const f = (this.filter||'').toLowerCase();
    if (!f) return this.categories;
    return this.categories.filter((c:any)=> (c.name||'').toLowerCase().includes(f) || (c.idC && c.idC.toString().includes(f)));
  }
}
