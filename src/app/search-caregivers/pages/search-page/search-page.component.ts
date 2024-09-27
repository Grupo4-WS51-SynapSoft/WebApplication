import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CaregiverCardComponent } from '../../components/caregiver-card/caregiver-card.component';
import { CaregiverService } from '../../services/caregiver.service';
import { CaregiverServiceModel } from '../../model/CaregiverService';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormField,
    MatButtonModule,
    MatIconModule,
    CaregiverCardComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  constructor(private caregiverService: CaregiverService) {}

  caregiversList: CaregiverServiceModel[] = [];

  ngOnInit() {
    this.caregiverService.getAll().subscribe((caregivers) => {
      this.caregiversList = caregivers;
    });
  }
}
