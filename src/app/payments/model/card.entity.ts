export class Card {
  id?: number;
  userId?: number;
  number?: string;
  holder: string;
  year?: number;
  month?: number;
  code?: string;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.number = '';
    this.holder = '';
    this.year = 0;
    this.month = 0;
    this.code = '';
  }
}
