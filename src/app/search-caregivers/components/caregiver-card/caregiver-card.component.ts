import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CaregiverServiceModel } from '../../model/CaregiverService';
@Component({
  selector: 'app-caregiver-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './caregiver-card.component.html',
  styleUrl: './caregiver-card.component.css',
})
export class CaregiverCardComponent {
  @Input() caregiver!: CaregiverServiceModel;
}
