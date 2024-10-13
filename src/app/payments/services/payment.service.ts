import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Payment } from '../model/payment.entity';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService<Payment> {
  constructor() {
    super();
    this.basePath = `${this.basePath}/payments`;
  }

  getByTutorId(id: number) {
    return this.http
      .get<Payment[]>(
        `${this.basePath}?tutorId=${id}&_expand=service&_expand=tutor&_expand=caregiver`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getByCaregiverId(id: number) {
    return this.http
      .get<Payment[]>(
        `${this.basePath}?caregiverId=${id}&_expand=service&_expand=tutor&_expand=caregiver`
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
