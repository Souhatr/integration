import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User.model';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  editing = false;
  canEdit = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      // if no id, redirect to login
      this.router.navigate(['/login']);
      return;
    }
    this.load(id);
  }

  load(id: number) {
    this.userService.getUserById(id).subscribe({ next: (u) => { this.user = u; this.evaluateEdit(); }, error: (e) => console.error(e) });
  }

  evaluateEdit() {
    const cur = this.auth.getCurrentUser();
    if (!this.user || !cur) { this.canEdit = false; return; }
    this.canEdit = (cur.idU === this.user.idU);
  }

  save() {
    if (!this.user) return;
    this.userService.updateUser(this.user.idU, this.user).subscribe({ next: (u) => { this.user = u; this.editing = false; }, error: (e) => console.error(e) });
  }
}
