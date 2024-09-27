import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar} from "@angular/material/snack-bar";
import { ReservationNotificationComponent } from "../../components/reservation-notification/reservation-notification.component";
import {ReservationService} from "../../../reservations/services/reservation.service";
import {Reservation} from "../../../reservations/models/reservation.model";

@Component({
  selector: 'app-caregiver-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './caregiver-detail.component.html',
  styleUrl: './caregiver-detail.component.css',
})
export class CaregiverDetailComponent {

  constructor(private snackBar: MatSnackBar, private reservationService: ReservationService) {}

  onReserve() {
    const newReservation = new Reservation(
      'Julio Cesar',
      'San Isidro',
      new Date('2024-03-22'),
      'From 9AM to 5PM (8 hours)',
      40,
      'Pending'
    );
    this.reservationService.addReservation(newReservation);


    this.snackBar.openFromComponent(ReservationNotificationComponent, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-container'],
    });
  }
}
