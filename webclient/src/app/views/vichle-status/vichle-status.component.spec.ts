import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VichleStatusComponent } from './vichle-status.component';
import { VichlesStatusesService } from 'src/app/services/vichles-statuses.service';
import { PingService } from 'src/app/services/ping.service';
import { CustomersService } from 'src/app/services/customers.service';
import { from } from 'rxjs';


describe('VichleStatusComponent', () => {
  let component: VichleStatusComponent;
  let statusesService: VichlesStatusesService;
  let pingService: PingService;
  let customersService: CustomersService;


  beforeEach(() => {
    statusesService = new VichlesStatusesService(null);
    pingService =  new PingService(null);
    customersService = new CustomersService(null);
    component = new VichleStatusComponent(statusesService, pingService, customersService);
  });



  function spyOnstatusesService() {
    spyOn(statusesService, 'getVichleStatuses').and.callFake(() => {
      return from([
        {vin : 'YS2R4X20005399401', status: 'true', customerId: 1 },
        {vin : 'VLUR4X20009093588', status: 'true', customerId: 1 },
        {vin : 'VLUR4X20009048066', status: 'false', customerId: 1 },
        {vin : 'YS2R4X20005388011', status: 'true', customerId: 2 },
        {vin : 'YS2R4X20005387949', status: 'false', customerId: 2 },
        {vin : 'VLUR4X20009048061', status: 'false', customerId: 3 },
        {vin : 'YS2R4X20005387055', status: 'true', customerId: 3 }
      ]);
    });
  }

  it('should get status', () => {
    spyOnstatusesService();
    component.getStatuses();
    console.log(component.vichles);
    expect(component.vichles).toBeTruthy();
  });

});
