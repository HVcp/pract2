import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../shared/payment.service'; // Import the PaymentService
import { Payments } from '../shared/payments.model'; // Import the Payments model

@Component({
  selector: 'app-payment-details',
  templateUrl: './paymentdetails.component.html',
  styleUrl: './paymentdetails.component.scss',
})
export class PaymentdetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'paymentId',
    'bookingId',
    'amount',
    'paymentDateTime',
    'status',
  ];
  dataSource!: MatTableDataSource<Payments>; // Specify the type for MatTableDataSource

  constructor(
    private _dialog: MatDialog,
    private _paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this._paymentService.getPayments().subscribe({
      next: (res: Payments[]) => {
        this.dataSource = new MatTableDataSource(res);
        console.log('data', res);
      },
      error: console.log,
    });
  }

  
  }















































































































  // deletePayment(paymentId: number) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, go ahead.',
  //     cancelButtonText: 'No, let me think',
  //   }).then((res) => {
  //     if (res.value) {
  //       this._paymentService.deletePayment(paymentId).subscribe({
  //         next: (res) => {
  //           Swal.fire('Removed!', 'Payment data removed successfully.', 'success');
  //           this.getPayments();
  //         }
  //       });
  //     } else if (res.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelled', 'Payment data still in our database.', 'error');
  //     }
  //   });
  //import Swal from 'sweetalert2';