import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../model/payment.entity';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatButtonModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css',
})
export class PaymentHistoryComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user') || '{}');

  paymentListData: Payment[] = [];
  displayedColumns = ['id', 'date', 'amount', 'subject', 'last-digits'];

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    if (this.user.role === 'tutor') {
      this.paymentService.getByTutorId(this.user.id).subscribe((payments) => {
        this.paymentListData = payments;
      });
    } else {
      this.paymentService
        .getByCaregiverId(this.user.id)
        .subscribe((payments) => {
          this.paymentListData = payments;
        });
    }
  }
}
