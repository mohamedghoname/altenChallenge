import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VichleStatusComponent } from './vichle-status.component';
import { VichlesStatusesService } from 'src/app/services/vichles-statuses.service';
import { PingService } from 'src/app/services/ping.service';
import { CustomersService } from 'src/app/services/customers.service';
import { from } from 'rxjs';
import { VichleStatus } from 'src/app/models/vichle_status.model';


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
      return from([[
        {vin : 'YS2R4X20005399401', status: 'true', customerId: 1 },
        {vin : 'VLUR4X20009093588', status: 'true', customerId: 1 },
        {vin : 'VLUR4X20009048066', status: 'false', customerId: 1 },
        {vin : 'YS2R4X20005388011', status: 'true', customerId: 2 },
        {vin : 'YS2R4X20005387949', status: 'false', customerId: 2 },
        {vin : 'VLUR4X20009048062', status: 'false', customerId: 3 },
        {vin : 'YS2R4X20005387055', status: 'true', customerId: 3 }
      ]]);
    });
  }

  function spyOnSimulateOff() {
    spyOn(pingService, 'simulateOff').and.callFake((vichle: VichleStatus) => {
      return from(['ok']);
    });
  }

  it('should get status', () => {
    spyOnstatusesService();

    statusesService.getVichleStatuses().subscribe((result)=>{
    });
    component.getStatuses();
    expect(component.vichles).toBeTruthy();
  });

  it('should get filter results to based on customer', () => {
    spyOnstatusesService();

    statusesService.getVichleStatuses().subscribe((result) => {
    });
    component.selectedCustomerId = '1';
    component.getStatuses();
    expect(component.vichles.length).toBe(3);
  });

  it('should get filter results to based on status', () => {
    spyOnstatusesService();

    statusesService.getVichleStatuses().subscribe((result) => {
    });
    component.selectedStatus = 'true';
    component.getStatuses();
    expect(component.vichles.length).toBe(4);
  });

  it('should get filter results to based on status and customer', () => {
    spyOnstatusesService();

    statusesService.getVichleStatuses().subscribe((result) => {
    });
    component.selectedStatus = 'true';
    component.selectedCustomerId = '1';
    component.getStatuses();
    expect(component.vichles.length).toBe(2);
  });

  it('should sort results based on vin', () => {
    spyOnstatusesService();

    statusesService.getVichleStatuses().subscribe((result) => {
    });

    component.getStatuses();
    expect(component.vichles[0].vin).toBe('VLUR4X20009048062');
    expect(component.vichles[1].vin).toBe('VLUR4X20009048066');
    expect(component.vichles[6].vin).toBe('YS2R4X20005399401');
  });

  it('Should simulate OFF' , () => {
    spyOnstatusesService();
    spyOnSimulateOff();

    const vichle: VichleStatus = { customerId: 1, status: true, vin: 'VLUR4X20009048062'};

    component.simulateOff(vichle);
    expect(component.vichles).toBeTruthy();
  });



});
