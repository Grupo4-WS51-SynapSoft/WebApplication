import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CaregiverCardComponent } from '../../components/caregiver-card/caregiver-card.component';

import { FormsModule } from '@angular/forms';
import { ServiceSearch } from '../../model/service-search';
import { ServiceSearchService } from '../../services/service-search.service';

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
  searchServiceList: ServiceSearch[] = [];
  filteredSearchServiceList: ServiceSearch[] = [];
  orderByRating: 'relevant' | 'popular' = 'relevant';
  locationOptions: string[] = [];
  selectedLocation = '';

  constructor(private serviceSearchService: ServiceSearchService) {}

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
    this.searchServiceList = [];
    this.filteredSearchServiceList = [];

    // Se simula una carga de 2 segundos
    window.setTimeout(() => {
      this.getCaregiversList();
    }, 2000);
  }

  getCaregiversList() {
    this.serviceSearchService.getAll().subscribe((searchResults) => {
      this.searchServiceList = searchResults;

      this.updateFilteredCaregiversList();

      this.locationOptions = searchResults.map(
        (result) => result.districtsScope
      );
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
    this.filteredSearchServiceList = this.searchServiceList.filter(
      (c) =>
        !this.selectedLocation || c.districtsScope === this.selectedLocation
    );

    this.filteredSearchServiceList =
      this.orderByRating === 'popular'
        ? this.filteredSearchServiceList.sort((a, b) => b.caregiverExperience - a.caregiverExperience)
        : this.filteredSearchServiceList;
  }
}
