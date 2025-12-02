import { Component, OnInit } from '@angular/core'; 
 
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-service';
import { User } from '../model/User.model';
 
@Component({ 
  selector: 'app-verif-email', 
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './verif-email.component.html', 

}) 
export class VerifEmailComponent implements OnInit { 
  code: string = ''; 
  user: User = new User(); 
  err = ''; 
 
  constructor( 
    private route: ActivatedRoute, 
    private userService: UserService, 
    private router: Router 
  ) {} 
 
  ngOnInit(): void { 
    
  } 
 
  onValidateEmail() { 
  
} 
}