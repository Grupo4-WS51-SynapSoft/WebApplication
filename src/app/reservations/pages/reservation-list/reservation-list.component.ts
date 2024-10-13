import { Component, OnInit } from '@angular/core';
import { ReservationCardComponent } from '../../components/reservation-card/reservation-card.component';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../model/reservation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [ReservationCardComponent, CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservationList: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((reservations) => {
      console.log(reservations);
      this.reservationList = reservations;
    });
  }
}
