import { Component } from '@angular/core';
import { UserService } from '../../services/userservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService.loginUser(this.email, this.password).subscribe(
      response => {
        if (response && response.token) {
          this.localStorageService.setItem('authToken', response.token);
          this.localStorageService.setItem('userLogged', response.user);
        } else {
          console.log('Login failed');
        }
      },
      error => {
        console.error('Error during login:', error);
      }
    );
  }
}
