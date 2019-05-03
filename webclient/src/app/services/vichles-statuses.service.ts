import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VichleStatus } from '../models/vichle_status.model';
import { ServiceRoutes } from './servecisRoutes';


@Injectable({
  providedIn: 'root'
})
export class VichlesStatusesService {

  constructor(private http: HttpClient) { }

  public getVichleStatuses(): Observable<VichleStatus[]> {
    return this.http.get<VichleStatus[]>(ServiceRoutes.ViechleStatus);
  }
}
