import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../auth/model/User';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent {
  user = JSON.parse(
    window.localStorage.getItem('user') ?? 'null'
  ) as User | null;

  logout() {
    window.localStorage.removeItem('user');
  }
}
