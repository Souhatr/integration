import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../model/User.model';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  filterTerm = '';
  editing: User | null = null;
  newUser: User = { idU: 0, nom: '', prenom: '', email: '', telephone: '', username: '', motdepasse: '', role: 'USER' } as User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.userService.getAllUsers().subscribe({ next: (p) => { this.users = p.content || p; }, error: (e) => console.error(e) });
  }

  filteredUsers() {
    const t = this.filterTerm?.toLowerCase()?.trim();
    if (!t) return this.users;
    return this.users.filter(u => (u.username||'').toLowerCase().includes(t) || (u.email||'').toLowerCase().includes(t) || ((u.nom||'') + ' ' + (u.prenom||'')).toLowerCase().includes(t));
  }

  create() {
    this.userService.createUser(this.newUser).subscribe({ next: () => { this.newUser = { idU: 0, nom: '', prenom: '', email: '', telephone: '', username: '', motdepasse: '', role: 'USER' } as User; this.load(); }, error: (e) => console.error(e) });
  }

  edit(u: User) { this.editing = { ...u }; }
  save() { if (!this.editing) return; this.userService.updateUser(this.editing.idU, this.editing).subscribe({ next: () => { this.editing = null; this.load(); }, error: (e) => console.error(e) }); }
  delete(id: number) { this.userService.deleteUser(id).subscribe({ next: () => this.load(), error: (e) => console.error(e) }); }
}
