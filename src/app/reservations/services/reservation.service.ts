import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Reservation } from '../model/reservation';
import { User } from '../../auth/model/user';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService<Reservation> {
  user: User | null = null;
  role: string = '';

  constructor() {
    super();
    this.basePath = `${this.basePath}/reservations`;

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = this.user?.role ?? '';
  }

  getReservations() {
    return this.http
      .get<Reservation[]>(
        `${this.basePath}?_expand=tutor&_expand=caregiver&${
          this.role === 'tutor' ? 'tutorId' : 'caregiverId'
        }=${this.user?.id}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
