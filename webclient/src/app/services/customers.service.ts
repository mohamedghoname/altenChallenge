import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Customer> {
    return this.http.get<Customer>('api/customers/');
  }
}
