import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import {
  Schedule as ISchedule,
  ServiceSearch,
} from '../../../search-caregivers/model/service-search';
import { provideNativeDateAdapter } from '@angular/material/core';

const dayLabels = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 0,
};

@Component({
  selector: 'app-create-reservation-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatDatepickerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    MatListModule,
  ],
  templateUrl: './create-reservation-dialog.component.html',
  styleUrl: './create-reservation-dialog.component.css',
})
export class CreateReservationDialogComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceSearch
  ) {
    const formBuilder = new FormBuilder();

    this.firstFormGroup = formBuilder.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
    });
    this.secondFormGroup = formBuilder.group({
      paymentOption: ['', Validators.required],
    });
  }

  filterDates = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    this.data.schedules.filter(
      (schedule: ISchedule) =>
        dayLabels[schedule.day as keyof typeof dayLabels] === day
    );

    return day !== 0 && day !== 6;
  };

  createReservation() {
    this.dialogRef.close('success');
  }
}
