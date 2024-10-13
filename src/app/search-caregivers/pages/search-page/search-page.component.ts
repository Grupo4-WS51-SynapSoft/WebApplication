import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CaregiverCardComponent } from '../../components/caregiver-card/caregiver-card.component';
import { CaregiverService } from '../../services/caregiver.service';
import { CaregiverServiceModel } from '../../model/CaregiverService';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormField,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    CaregiverCardComponent,
    FormsModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit, OnChanges {
  caregiversList: CaregiverServiceModel[] = [];
  filteredCaregiversList: CaregiverServiceModel[] = [];
  orderByRating: 'relevant' | 'popular' = 'relevant';
  locationOptions: string[] = [];
  selectedLocation = '';

  constructor(private caregiverService: CaregiverService) {}

  ngOnInit() {
    this.getCaregiversList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['selectedLocation']) {
      console.log('Location changed to: ', this.selectedLocation);
      console.log('Location changed to: ', changes);
    }
  }

  onReloadList() {
    this.caregiversList = [];
    this.filteredCaregiversList = [];

    // Se simula una carga de 2 segundos
    window.setTimeout(() => {
      this.getCaregiversList();
    }, 2000);
  }

  getCaregiversList() {
    this.caregiverService.getAll().subscribe((caregivers) => {
      this.caregiversList = caregivers;

      this.updateFilteredCaregiversList();

      this.locationOptions = caregivers.map((caregiver) => caregiver.address);
      this.locationOptions = Array.from(new Set(this.locationOptions));
    });
  }

  changeSelectedLocation(event: MatSelectChange) {
    this.selectedLocation = event.value;

    this.updateFilteredCaregiversList();
  }

  changeOrderByRating(event: MatSelectChange) {
    this.orderByRating = event.value;

    this.updateFilteredCaregiversList();
  }

  updateFilteredCaregiversList() {
    this.filteredCaregiversList = this.caregiversList.filter(
      (c) => !this.selectedLocation || c.address === this.selectedLocation
    );

    this.filteredCaregiversList =
      this.orderByRating === 'popular'
        ? this.filteredCaregiversList.sort((a, b) => b.rate - a.rate)
        : this.filteredCaregiversList;
  }
}
