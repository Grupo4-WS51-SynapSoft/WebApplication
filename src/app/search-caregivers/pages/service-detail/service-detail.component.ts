import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ServiceSearch } from '../../model/service-search';
import { ServiceSearchService } from '../../services/service-search.service';
import { CreateReservationDialogComponent } from '../../../reservations/components/create-reservation-dialog/create-reservation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit {
  public serviceSearchId?: number;
  public canEdit = false;

  public biographyEditMode = false;
  public biographyForm = new FormGroup({
    description: new FormControl(''),
  });

  public serviceSearch?: ServiceSearch;
  public displayedScheduleColumns: string[] = ['day', 'startHour', 'endHour'];

  constructor(
    private route: ActivatedRoute,
    private serviceSearchService: ServiceSearchService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.serviceSearchId = params['id'];
    });
  }

  ngOnInit() {
    if (!this.serviceSearchId) {
      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (user?.role !== 'caregiver') return;
      this.canEdit = true;

      this.serviceSearchService
        .getByCaregiverId(user.id)
        .subscribe((services) => {
          this.serviceSearchId = services.id;
          this.serviceSearch = services;

          console.log(this.serviceSearch);

          this.biographyForm.setValue({
            description: this.serviceSearch.description,
          });
        });
    } else
      this.serviceSearchService
        .getById(this.serviceSearchId)
        .subscribe((serviceSearch) => {
          console.log(serviceSearch);
          this.serviceSearch = serviceSearch;
        });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateReservationDialogComponent, {
      data: this.serviceSearch,
      width: '640px',
      maxWidth: '640px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);

      const message =
        result === 'success'
          ? 'Reservation created'
          : 'Reservation not created';

      this.snackBar.open(message, 'Close', {
        duration: 2000,
      });
    });
  }

  cancelEditBiographyMode($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.biographyEditMode = false;
  }

  updateDescription() {
    console.log('Updated');
    this.serviceSearchService
      .patch(this.serviceSearchId, {
        description: this.biographyForm.value.description,
      })
      .subscribe(() => {
        this.snackBar.open('Biography description updated', 'Close', {
          duration: 3000,
        });
        this.biographyEditMode = false;

        if (this.serviceSearch?.description)
          this.serviceSearch.description =
            this.biographyForm.value.description || '';
      });
  }
}
