import { Component } from '@angular/core';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Card } from '../../model/card.entity';
import { MatIcon } from '@angular/material/icon';
import { CreateEditPaymentDialogComponent } from '../../components/create-edit-payment-dialog/create-edit-payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PaymentFormComponent,
    MatIcon,
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  cards: Card[] = [
    {
      cardHolderName: 'John Doe',
      cardNumber: '1234 5678 9012 3456',
      expirationDate: '12/24',
      cvv: '123',
    },
  ];
  showForm = false;
  paymentSuccess: boolean = false;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  addCard() {
    const dialogRef = this.dialog.open(CreateEditPaymentDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cards.push(result);
        this.snackBar.open('Card added successfully', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  removeCard(card: Card) {
    this.cards = this.cards.filter((c) => c !== card);
  }
}
