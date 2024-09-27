import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CaregiverCardComponent } from "../../components/caregiver-card/caregiver-card.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [MatSelectModule, MatFormField, MatButtonModule, MatIconModule, CaregiverCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {}
