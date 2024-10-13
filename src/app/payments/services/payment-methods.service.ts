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

  getByUserId(userId: string) {
    return this.http
      .get<Card[]>(`${this.basePath}?userId=${userId}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
