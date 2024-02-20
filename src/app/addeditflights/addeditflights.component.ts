import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FlightService } from '../shared/flight.service';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators,ValidationErrors, ValidatorFn ,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-addeditflights',
  templateUrl: './addeditflights.component.html',
  styleUrls: ['./addeditflights.component.scss']
})
export class AddeditflightsComponent {

 
  flightForm: FormGroup;

  AirportLoc: string[] = [
    'Mysuru',
    'Bengaluru',
    'Mumbai',
    'Hyderabad',
    'Delhi',
  ];

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AddeditflightsComponent>,
    private _flightService: FlightService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.flightForm = this._fb.group({
      flightId: 0,
      departureAirportLocation: ['', Validators.required],
      arrivalAirportLocation: ['', Validators.required],
      departureDateTime: ['', Validators.required],
      arrivalDateTime: ['', Validators.required],
      availableSeats: ['', [Validators.required, Validators.min(0)]],
      ticketPrice: ['', [Validators.required, Validators.min(0)]],
    }, {
      validators: [this.validateDepartureBeforeArrival, this.validateDifferentAirports]
    })as FormGroup<any>;
  }

  empt(){
    this._dialogRef.close(true);
    this._dialog.open(AddeditflightsComponent)
    
  }
  reset(){
    this.flightForm.patchValue(this.data);
  
  }
  
    ngOnInit(): void {
      this.flightForm.patchValue(this.data);
    }
    
  async onFormSubmit(){
    if(this.flightForm.valid){
      if(this.data){
        (await this._flightService.updateFlight(this.data.flightId, this.flightForm.value)).subscribe({
          next: (val: any) =>{
            Swal.fire('Updated!', 'Flight updated successfully.', 'success');
            this._dialogRef.close(true);
          },
          error:(err: any) => {
            console.error(err);
          },
      });
      }
      else{
      (await this._flightService.addFlight(this.flightForm.value)).subscribe({
        next: (val: any) =>{
          Swal.fire('Added!', 'Flight added successfully.', 'success');
          this._dialogRef.close(true);
        },
        error:(err: any) => {
          console.error(err);
        },
    });
  }
    }
  }
  get f(){  
    return this.flightForm.controls;  
  }  

 

  validateDifferentAirports(control: AbstractControl): ValidationErrors | null {
    const departureAirport = control.get('departureAirportLocation')?.value;
    const arrivalAirport = control.get('arrivalAirportLocation')?.value;

    if (departureAirport && arrivalAirport && departureAirport === arrivalAirport) {
      return { 'sameAirports': true };
    }

    return null;
  }

  validateDepartureBeforeArrival(control: AbstractControl): ValidationErrors | null {
    const departureDateTime = control.get('departureDateTime')?.value;
    const arrivalDateTime = control.get('arrivalDateTime')?.value;

    if (departureDateTime && arrivalDateTime && departureDateTime >= arrivalDateTime) {
      return { 'invalidDateRange': true };
    }

    return null;
  }
  
}


























































































































































































// import { Flights } from '../shared/flights.model';
// import { ReactiveFormsModule } from '@angular/forms';



//data: Flights | undefined;
 // isAirportsEqual(): boolean {
  //   const departureAirport = this.flightForm.get('departureAirportLocation')?.value;
  //   const arrivalAirport = this.flightForm.get('arrivalAirportLocation')?.value;
  //   return departureAirport === arrivalAirport;
  // }

  //debugger
  // //  console.log('fromData',this.flightForm.value)

// export const airportsNotEqualValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const departureAirport = control.get('departureAirportLocation')?.value;
//   const arrivalAirport = control.get('arrivalAirportLocation')?.value;

//   if (departureAirport && arrivalAirport && departureAirport === arrivalAirport) {
//     return { airportsEqual: true };
//   }

//   return null;
// };


