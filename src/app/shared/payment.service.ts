import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from './payments.model'; 

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  readonly baseURL = "https://airlineapi2.azurewebsites.net/api/Payment";
  formData: Payments = new Payments(); 
  list: Payments[] | undefined;

  constructor(private http: HttpClient) {
    this.list = [];
  }

  getPayments(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  refreshList(): void {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.list = res as Payments[];
        console.log("Data Received in Payment Service", this.list);
      });
  }
}






















































// getPaymentById(id: number): Observable<any> {
  //   return this.http.get(`${this.baseURL}/${id}`);
  // }

  // async addPayment(data: any): Promise<Observable<any>> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   const response = this.http.post<any>(`${this.baseURL}`, JSON.stringify(data), httpOptions);
  //   return response;
  // }

  // updatePayment(id: number): Observable<any> {
  //   return this.http.put(`${this.baseURL}/${this.formData.paymentId}`, this.formData);
  // }

  // deletePayment(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseURL}/${id}`);
  // }