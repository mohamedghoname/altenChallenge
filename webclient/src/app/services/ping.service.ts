import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceRoutes } from './servecisRoutes';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private http: HttpClient) { }

  public simulateOff(vin) {
   return this.http.post(ServiceRoutes.PingService_simulateOff, {vin}, {responseType: 'text'});
  }

  public ping(vin) {
    return this.http.post(ServiceRoutes.PingService_ping, {vin}, {responseType: 'text'});
   }
}
