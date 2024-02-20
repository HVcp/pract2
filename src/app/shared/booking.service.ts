import { Injectable } from '@angular/core';
import { Bookings } from './bookings.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  readonly baseURL = "https://airlineapi2.azurewebsites.net/api/Booking";
  formData: Bookings = new Bookings();
  list: Bookings[] | undefined;

  constructor(private http: HttpClient) {
    this.list = [];
  }

  getBookings(): Observable<any> {
    return this.http.get(this.baseURL);
  }


  deleteBookings(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.list = res as Bookings[];
        console.log("Data Received in Flight Service", this.list);
      });
  }
}





































































  // getBookingsById(id: number) {
  //   return this.http.get(`${this.baseURL}/${id}`);
  // }

  // addBookings(data: any) {
  //   return this.http.post(this.baseURL, this.formData);
  // }

  // updateBookings(id: number) {
  //   return this.http.put(`${this.baseURL}/${this.formData.flightId}`, this.formData);
  // }