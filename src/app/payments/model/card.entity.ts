export class Card {
  id?: number;
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;

  constructor() {
    this.cardHolderName = '';
    this.cardNumber = '';
    this.expirationDate = '';
    this.cvv = '';
  }
}
