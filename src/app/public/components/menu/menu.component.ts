import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuItems = [
    {
      name: 'Search Caregivers',
      link: '/search-caregiver',
      icon: 'search',
    },
    {
      name: 'Your Reservations',
      link: '/your-reservations',
      icon: 'event_note',
    },
  ];
}
