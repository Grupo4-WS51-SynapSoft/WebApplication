import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, ProfileSettingsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
