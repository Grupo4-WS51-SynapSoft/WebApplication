export class Card {
  id?: number;
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  userId: number;

  constructor() {
    this.userId = 0;
    this.cardHolder = '';
    this.cardNumber = '';
    this.expirationDate = '';
    this.cvv = '';
  }
}
