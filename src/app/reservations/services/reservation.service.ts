import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Reservation } from '../model/reservation';
import { User } from '../../auth/model/User';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService<Reservation> {
  user: User | null = null;

  constructor() {
    super();
    this.basePath = `${this.basePath}/reservations?_expand=search-caregiver&_expand=user`;

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getReservations() {
    return this.http
      .get<Reservation[]>(`${this.basePath}&userId=${this.user?.id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
