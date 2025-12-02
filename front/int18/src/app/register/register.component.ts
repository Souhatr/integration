import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/User.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink,CommonModule,HttpClientModule],
  templateUrl: './register.component.html'

})
export class RegisterComponent implements OnInit {

  public user = new User();
  confirmmotdepasse?: string;
  myForm!: FormGroup;
  err?: any;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      username: ['', [Validators.required]],
      motdepasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }


  onRegister() {
    if (this.user.motdepasse !== this.confirmmotdepasse) {
      this.toastr.error('Les mots de passe ne correspondent pas', 'Erreur');
      return;
    }
    this.loading = true;
    this.userService.inscrire(this.user).subscribe({
      next: (res) => {

        this.loading = false;

        this.toastr.success('veillez confirmer votre email', 'Confirmation');

       // this.router.navigate(["/verifEmail"]);

         this.router.navigate(["/verifEmail",this.user.email]); 

      },
      error: (err: any) => {
        this.loading = false;

        if (err.status === 400) {

          this.err = err.error.message;

        }
      }
    }
    )
  }

}
