import { User } from '../../auth/model/user';
import { Card } from './card.entity';

export class Payment {
  id?: number;
  tutorId: number;
  caregiverId: number;
  serviceId: number;
  tutorPaymentMethodId: number;
  caregiverPaymentMethodId: number;
  totalAmount: number;
  date: string;

  tutor?: User;
  caregiver?: User;

  tutorPaymentMethod?: Card;
  caregiverPaymentMethod?: Card;

  constructor(
    tutorId: number,
    caregiverId: number,
    serviceId: number,
    tutorPaymentMethodId: number,
    caregiverPaymentMethodId: number,
    totalAmount: number,
    date: string
  ) {
    this.tutorId = tutorId;
    this.caregiverId = caregiverId;
    this.serviceId = serviceId;
    this.tutorPaymentMethodId = tutorPaymentMethodId;
    this.caregiverPaymentMethodId = caregiverPaymentMethodId;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}
