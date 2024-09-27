import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {Observable, of} from "rxjs";
import {Reservation} from "../../models/reservation.model";
import {ReservationService} from "../../services/reservation.service";



@Component({
  selector: 'app-reservation-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent {
  reservations$: Observable<Reservation[]>;

  constructor(private reservationService: ReservationService) {
    this.reservations$ = this.reservationService.reservations$;
  }


  updateReservation(reservation: Reservation) {

  }


  cancelReservation(reservation: Reservation) {
    reservation.status = 'Cancelled';
    this.reservationService.updateReservation(reservation);
  }
}
