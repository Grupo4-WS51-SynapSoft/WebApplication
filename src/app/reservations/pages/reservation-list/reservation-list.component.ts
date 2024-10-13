import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../model/reservation';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservationList: Reservation[] = [];
  displayedColumns = [
    'id',
    'subject',
    'createdAt',
    'schedule',
    'totalFare',
    'status',
    'actions',
  ];

  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((reservations) => {
      console.log(reservations);
      this.reservationList = reservations;
    });
  }

  handleCancel(reservation: Reservation) {
    this.reservationService
      .patch(reservation.id, { status: 'cancelled' })
      .subscribe(() => {
        this.reservationList = this.reservationList.map((r) => {
          if (r.id === reservation.id) {
            return { ...r, status: 'cancelled' };
          }
          return r;
        });
      });
  }

  handleAccept(reservation: Reservation) {
    this.reservationService
      .patch(reservation.id, { status: 'accepted' })
      .subscribe(() => {
        this.reservationList = this.reservationList.map((r) => {
          if (r.id === reservation.id) {
            return { ...r, status: 'accepted' };
          }
          return r;
        });
      });
  }

  handleStartService(reservation: Reservation) {
    this.reservationService
      .patch(reservation.id, { status: 'in progress' })
      .subscribe(() => {
        this.reservationList = this.reservationList.map((r) => {
          if (r.id === reservation.id) {
            return { ...r, status: 'in progress' };
          }
          return r;
        });
      });
  }

  handleFinishService(reservation: Reservation) {
    this.reservationService
      .patch(reservation.id, { status: 'completed' })
      .subscribe(() => {
        this.reservationList = this.reservationList.map((r) => {
          if (r.id === reservation.id) {
            return { ...r, status: 'completed' };
          }
          return r;
        });
      });
  }
}
