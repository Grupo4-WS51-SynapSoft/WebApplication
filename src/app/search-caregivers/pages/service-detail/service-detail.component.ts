import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { ServiceSearch } from '../../model/service-search';
import { ServiceSearchService } from '../../services/service-search.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
  ],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit {
  public serviceSearchId?: number;

  public serviceSearch?: ServiceSearch;
  public displayedScheduleColumns: string[] = ['day', 'startHour', 'endHour'];

  constructor(
    private route: ActivatedRoute,
    private serviceSearchService: ServiceSearchService
  ) {
    this.route.params.subscribe((params) => {
      this.serviceSearchId = params['id'];
    });
  }

  ngOnInit() {
    if (!this.serviceSearchId) return;
    this.serviceSearchService
      .getById(this.serviceSearchId)
      .subscribe((serviceSearch) => {
        console.log(serviceSearch);
        this.serviceSearch = serviceSearch;
      });
  }
}
