import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightdetailsComponent } from './flightdetails/flightdetails.component';
import { AddeditflightsComponent } from './addeditflights/addeditflights.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { PaymentdetailsComponent } from './paymentdetails/paymentdetails.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: './', component: AppComponent },
  { path: 'flightDetails', component: FlightdetailsComponent },
  { path: 'addeditflightDetails', component: AddeditflightsComponent },
  { path: 'bookingDetails', component: BookingdetailsComponent },
  { path: 'paymentDetails', component: PaymentdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 
  
  
}
