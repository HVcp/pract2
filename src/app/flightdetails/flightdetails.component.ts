import { Component,OnInit, ViewChild } from '@angular/core';
import { FlightService } from '../shared/flight.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Flights } from '../shared/flights.model';
import { AddeditflightsComponent } from '../addeditflights/addeditflights.component';

@Component({
  selector: 'app-flightdetails',
  templateUrl: './flightdetails.component.html',
  styleUrl: './flightdetails.component.scss'
})
export class FlightdetailsComponent {

  displayedColumns: string[] = [
    'flightId', 
    'departureAirportLocation', 
    'arrivalAirportLocation', 
    'departureDateTime', 
    'arrivalDateTime', 
    'availableSeats',
    'ticketPrice',
    'action'
  ];
  dataSource!: MatTableDataSource<Flights>;


  constructor( private _dialog: MatDialog,
    private _flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.getFlight();
  }

  getFlight(){
    this._flightService.getFlights().subscribe({
      next:(res:any) => {
        this.dataSource = new MatTableDataSource(res);
        console.log('data',res)
      },
      error: console.log,
    })
  }

  deleteFlight(flightId: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((res) => {
      if (res.value) {
    this._flightService.deleteFlight(flightId).subscribe({
      next: (res) =>{
            Swal.fire('Removed!', 'Flight data removed successfully.', 'success');
            this. getFlight();
          }})
        }
        else if (res.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Flight data still in our database.', 'error');
        }
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    openEditForm(data: any) {
   const dialogRef = this._dialog.open(AddeditflightsComponent, {
    data,
   });
   dialogRef.afterClosed().subscribe({
     next: (val) =>{
       if(val){
         this.getFlight();
       }
     },
   });
  }
}



























































































































 // openEditForm() {
  //   const dialogRef = this._dialog.open(AddeditflightsComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) =>{
  //       if(val){
  //         this.getFlight();
  //       }
  //     },
  //   });
  // }


  // import {MatPaginator} from '@angular/material/paginator';
  // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  // import { MatDialogRef } from '@angular/material/dialog';

  //import { Component,OnInit, ViewChild } from '@angular/core';
