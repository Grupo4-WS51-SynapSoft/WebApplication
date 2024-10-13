import { Component, Inject, OnInit } from '@angular/core';
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
import { PaymentMethodsService } from '../../../payments/services/payment-methods.service';
import { Card } from '../../../payments/model/card.entity';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../model/reservation';
import { PaymentService } from '../../../payments/services/payment.service';
import { Payment } from '../../../payments/model/payment.entity';

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
export class CreateReservationDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cardList: Card[] = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    public dialogRef: MatDialogRef<CreateReservationDialogComponent>,
    private paymentMethodsService: PaymentMethodsService,
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: ServiceSearch
  ) {
    const formBuilder = new FormBuilder();

    this.firstFormGroup = formBuilder.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
    this.secondFormGroup = formBuilder.group({
      paymentOption: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.paymentMethodsService
      .getByUserId(this.user?.id, this.user?.role)
      .subscribe((cardList) => {
        this.cardList = cardList;
      });
  }

  filterDates = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    const workingDays = this.data.schedules.map(
      (schedule: ISchedule) => dayLabels[schedule.day as keyof typeof dayLabels]
    );

    return workingDays.includes(day);
  };

  createReservation() {
    const totalHours =
      +this.firstFormGroup.value.endTime.split(':')[0] -
      this.firstFormGroup.value.startTime.split(':')[0];

    const reservation: Reservation = {
      tutorId: this.user.id,
      caregiverId: this.data.caregiver.id,
      serviceId: this.data.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      schedule: {
        date: this.firstFormGroup.value.date,
        startTime: this.firstFormGroup.value.startTime,
        endTime: this.firstFormGroup.value.endTime,
      },
      totalFare: totalHours * this.data.farePerHour,
    };

    const payment: Payment = {
      tutorId: this.user.id,
      caregiverId: this.data.caregiver.id,
      serviceId: this.data.id,
      totalAmount: reservation.totalFare,
      date: new Date().toISOString(),
      tutorPaymentMethodId: this.secondFormGroup.value.paymentOption[0].id,
      tutorPaymentMethod: this.secondFormGroup.value.paymentOption[0],
    };

    console.log(payment);

    this.paymentService.create(payment).subscribe(() => {
      console.log('Payment created');
    });

    this.reservationService.create(reservation).subscribe(() => {
      this.dialogRef.close('success');
    });
  }
}
