import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flights } from './flights.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  readonly baseURL = "https://airlineapi2.azurewebsites.net/api/Flight";
  formData: Flights = new Flights();
  list: Flights[] | undefined;

  constructor(private http: HttpClient) {
    this.list = [];
  }

  getFlights(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  getFlightById(id: number) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  async addFlight(data: any): Promise<Observable<any>> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const response = this.http.post<any>(`${this.baseURL}`, JSON.stringify(data), httpOptions)
      return response
    }
  updateFlight(id: number,data:any):Observable<any>{
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  deleteFlight(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.list = res as Flights[];
        console.log("Data Received in Flight Service", this.list);
      });
  }
}























































 // addFlight(data: any) {
  //   return this.http.post(this.baseURL, this.formData);
  // }