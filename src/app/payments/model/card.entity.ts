export class Card {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;

  constructor() {
    this.cardHolderName='';
    this.cardNumber= '';
    this.expirationDate='';
    this.cvv='';
  }
}
