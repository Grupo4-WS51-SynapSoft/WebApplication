import { Component, Input } from '@angular/core';
import { Reservation } from '../../model/reservation';
import { User } from '../../../auth/model/user';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.css',
})
export class ReservationCardComponent {
  @Input() reservation?: Reservation;
}
