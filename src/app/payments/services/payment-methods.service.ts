import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Card } from '../model/card.entity';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService extends BaseService<Card> {
  constructor() {
    super();
    this.basePath = `${this.basePath}/user-payment-methods`;
  }

  getByUserId(id: string, role: string) {
    return this.http
      .get<Card[]>(
        `${this.basePath}?${role === 'tutor' ? 'tutorId' : 'caregiverId'}=${id}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
