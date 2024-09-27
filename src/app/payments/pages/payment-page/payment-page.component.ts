import { Component } from '@angular/core';
import {PaymentFormComponent} from "../../components/payment-form/payment-form.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {Card} from "../../model/card.entity";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    PaymentFormComponent, MatIcon],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  cards: Card[] = [];
  showForm = false;
  paymentSuccess: boolean = false;


  addCard(newCard: Card) {
    this.cards.push(newCard);
    this.showForm = false;
  }


  removeCard(card: Card) {
    this.cards = this.cards.filter(c => c !== card);
  }
}
