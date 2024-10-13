import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { Card } from '../../model/card.entity';

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
  public editMode: boolean;

  public user = JSON.parse(window.localStorage.getItem('user') || '{}');

  public cardForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    cardHolder: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
    expirationDate: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEditPaymentDialogComponent>,
    public paymentMethodsService: PaymentMethodsService,
    @Inject(MAT_DIALOG_DATA) public data?: Card
  ) {
    this.editMode = !!data;

    if (this.editMode) {
      this.cardForm.patchValue({
        cardHolder: data?.cardHolder,
        cardNumber: data?.cardNumber,
        cvv: data?.cvv,
        expirationDate: data?.expirationDate,
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddCard() {
    const card: Card = {
      cardHolder: this.cardForm.value.cardHolder ?? '',
      cardNumber: this.cardForm.value.cardNumber ?? '',
      cvv: this.cardForm.value.cvv ?? '',
      expirationDate: '12/23',
    };

    if (this.user.role === 'tutor') card.tutorId = this.user.id;
    else if (this.user.role === 'caregiver') card.caregiverId = this.user.id;

    this.paymentMethodsService.create(card).subscribe((card) => {
      this.dialogRef.close(card);
    });
  }

  onEditCard() {
    this.paymentMethodsService
      .patch(this.data?.id, this.cardForm.value)
      .subscribe((card) => this.dialogRef.close(card));
  }

  onSubmit() {
    if (this.editMode) {
      this.onEditCard();
    } else {
      this.onAddCard();
    }
  }
}
