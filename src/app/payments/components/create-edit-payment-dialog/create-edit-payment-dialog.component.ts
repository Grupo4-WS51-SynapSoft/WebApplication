import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentMethodsService } from '../../services/payment-methods.service';

@Component({
  selector: 'app-create-edit-payment-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './create-edit-payment-dialog.component.html',
  styleUrl: './create-edit-payment-dialog.component.css',
})
export class CreateEditPaymentDialogComponent {
  user = JSON.parse(window.localStorage.getItem('user') || '{}');

  cardForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    cardHolder: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
    expirationDate: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEditPaymentDialogComponent>,
    public paymentMethodsService: PaymentMethodsService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onAddCard() {
    this.paymentMethodsService
      .create({
        ...this.cardForm.value,
        userId: this.user.id,
      })
      .subscribe((card) => {
        this.dialogRef.close(card);
      });
  }
}
