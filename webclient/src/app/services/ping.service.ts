import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private http: HttpClient) { }

  public simulateOff(vin) {
   return this.http.post('api/vichlesping/off/', {vin}, {responseType: 'text'});
  }

  public ping(vin) {
    return this.http.post('api/vichlesping/', {vin}, {responseType: 'text'});
   }
}
