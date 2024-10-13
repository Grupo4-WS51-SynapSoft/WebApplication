import { Component, OnInit } from '@angular/core';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Card } from '../../model/card.entity';
import { MatIcon } from '@angular/material/icon';
import { CreateEditPaymentDialogComponent } from '../../components/create-edit-payment-dialog/create-edit-payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethodsService } from '../../services/payment-methods.service';
import { DeletePaymentDialogComponent } from '../../components/delete-payment-dialog/delete-payment-dialog.component';

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
export class PaymentPageComponent implements OnInit {
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

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private paymentMethodsService: PaymentMethodsService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(window.localStorage.getItem('user') || '{}');
    this.paymentMethodsService.getByUserId(user.id).subscribe((cards) => {
      this.cards = cards;
    });
  }

  addCard() {
    const dialogRef = this.dialog.open(CreateEditPaymentDialogComponent);

    dialogRef.afterClosed().subscribe((card) => {
      if (card) {
        this.cards.push(card);
        this.snackBar.open('Card added successfully', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  removeCard(card: Card) {
    if (!card?.id) return;

    const dialogRef = this.dialog.open(DeletePaymentDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'delete') return;

      this.paymentMethodsService.delete(card?.id).subscribe(() => {
        this.snackBar.open('Card removed successfully', 'Close', {
          duration: 2000,
        });
        this.cards = this.cards.filter((c) => c !== card);
      });
    });
  }
}
