import { Injectable } from '@angular/core';
import {Reservation} from "../models/reservation.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];
  private reservationsSubject = new BehaviorSubject<Reservation[]>(this.reservations);

  reservations$ = this.reservationsSubject.asObservable();

  addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
    this.reservationsSubject.next(this.reservations);
  }


  updateReservation(updatedReservation: Reservation) {
    const index = this.reservations.findIndex(res => res.caregiverName === updatedReservation.caregiverName);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
      this.reservationsSubject.next(this.reservations);
    }
  }
}
