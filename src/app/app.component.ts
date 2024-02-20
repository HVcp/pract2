import { Component,AfterViewInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddeditflightsComponent } from './addeditflights/addeditflights.component';
import { FlightdetailsComponent } from './flightdetails/flightdetails.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FlightService } from './shared/flight.service';
import {MatTableDataSource} from '@angular/material/table';
//import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AirlineAdmin';
  dataSource!: MatTableDataSource<any>;
  constructor(private _dialog: MatDialog,
    private _flightService: FlightService,private zone: NgZone){}

  openAddEditFlightForm(){
    const dialogRef = this._dialog.open(AddeditflightsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getFlight();
        }
      },
    });

  }

  getFlight(){
    this._flightService.getFlights().subscribe({
      next:(res:any) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    })
  }

  navigationItems = [
    { label: './', route: './ ' },
    { label: 'flightDetails', route: '/flightdetails' },
    { label: 'addeditflightDetails', route: '/addeditflights' },
    { label: 'bookingDetails', route: '/bookingdetails' },
    { label: 'paymentDetails', route: '/paymentdetails' },
  ];
}
