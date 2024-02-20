import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../shared/booking.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Bookings } from '../shared/bookings.model'; // Import the Booking model

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})
export class BookingdetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'bookingId',
    'flightId',
    'passengerName',
    'seatNumber',
    'bookingDateTime',
    'status', 
    'passengerEmail',
    'numberofTickets',
    'action',
  ];
  dataSource!: MatTableDataSource<Bookings>; // Specify the type for MatTableDataSource

  constructor(
    private _dialog: MatDialog,
    private _bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this._bookingService.getBookings().subscribe({
      next: (res: Bookings[]) => {
        this.dataSource = new MatTableDataSource(res);
        console.log('data', res);
      },
      error: console.log,
    });
  }

  deleteBooking(bookingId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((res) => {
      if (res.value) {
        this._bookingService.deleteBookings(bookingId).subscribe({
          next: (res) => {
            Swal.fire('Removed!', 'Booking data removed successfully.', 'success');
            this.getBookings();
          }
        });
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Booking data still in our database.', 'error');
      }
    });
  }

}


































































































































// import { MatPaginator } from '@angular/material/paginator';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';