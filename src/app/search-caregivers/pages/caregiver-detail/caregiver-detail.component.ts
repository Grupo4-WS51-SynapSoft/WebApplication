import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-caregiver-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './caregiver-detail.component.html',
  styleUrl: './caregiver-detail.component.css',
})
export class CaregiverDetailComponent {}
