export class Card {
  id?: number;
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  tutorId?: number;
  caregiverId?: number;

  constructor() {
    this.tutorId = 0;
    this.caregiverId = 0;
    this.cardHolder = '';
    this.cardNumber = '';
    this.expirationDate = '';
    this.cvv = '';
  }
}
