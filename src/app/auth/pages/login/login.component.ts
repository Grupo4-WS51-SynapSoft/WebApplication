import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  showPassword = false;

  toggleShowPassword(event: MouseEvent) {
    this.showPassword = !this.showPassword;
    event.stopPropagation();
  }

  ngOnInit() {
    const user = window.localStorage.getItem('user');
    if (user) this.router.navigate(['/search-caregiver']);

    console.log('Hello world');
  }

  login() {
    const { email, password } = this.userForm.value;

    if (!email || !password) return;

    this.authService.login(decodeURI(email), password).subscribe((res: any) => {
      if (res.length) {
        this.router.navigate(['/search-caregiver']);
        window.localStorage.setItem('user', JSON.stringify(res[0]));
      }
    });

    // this.router.navigate(['/search-caregiver']);
  }
}
