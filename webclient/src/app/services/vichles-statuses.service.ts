import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VichlesStatusesService {

  constructor(private http: HttpClient) { }

  public getVichleStatuses(): Observable<VichleStatus> {
    return this.http.get<VichleStatus>('api/vichlesstatus/');
  }
}
