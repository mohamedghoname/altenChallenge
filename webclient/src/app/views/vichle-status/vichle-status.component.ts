import { Component, OnInit } from '@angular/core';
import { VichlesStatusesService } from 'src/app/services/vichles-statuses.service';
import { PingService } from 'src/app/services/ping.service';
import { CustomersService } from 'src/app/services/customers.service';
import {VichleStatus} from './../../models/vichle_status.model';
import { Customer } from './../../models/customer.model';
@Component({
  selector: 'app-vichle-status',
  templateUrl: './vichle-status.component.html',
  styleUrls: ['./vichle-status.component.css']
})
export class VichleStatusComponent implements OnInit {

  constructor(private statusesService: VichlesStatusesService,
              private pingService: PingService,
              private customersService: CustomersService) { }

  public vichles: VichleStatus[];
  vichlesResultSet: VichleStatus[];
  public customers: Customer[];
  public selectedCustomerId = '0';
  public selectedStatus = 'All';

  ngOnInit() {
    this.getStatuses();
    setInterval(() => {
      this.getStatuses();
    }, 6000);

    this.customersService.getCustomers().subscribe(customers => {
      this.customers = [{id: 0, name: 'All'}, ... customers as unknown as Customer[]];
    });
  }

  applyFilters() {
    this.vichles = this.vichlesResultSet;
    if(this.selectedCustomerId != '0') {
      this.vichles = this.vichles.filter(v => v.customerId.toString() === this.selectedCustomerId);
    }
    if(this.selectedStatus != 'All') {
      this.vichles = this.vichles.filter(v => v.status.toString() === this.selectedStatus);
    }
  }

  public simulateOff(vichle: VichleStatus ) {

    if (vichle.status) {
      this.pingService.simulateOff(vichle.vin).subscribe(Response => {this.getStatuses(); } , (err) => {console.log(err);});
    } else {
      this.pingService.ping(vichle.vin).subscribe(Response => {this.getStatuses(); } , (err) => {console.log(err); });
    }

  }
  getStatuses() {
    this.statusesService.getVichleStatuses().subscribe(result => {
      this.vichlesResultSet = result as unknown as VichleStatus[];
      this.vichlesResultSet = this.vichlesResultSet.sort(this.compare);
      this.applyFilters();
    }, err => {console.log(err);
    });
  }

  compare( v1: VichleStatus, v2: VichleStatus )  {
    if ( v1.vin < v2.vin ) {
      return -1;
    }
    if ( v1.vin > v2.vin ) {
      return 1;
    }
    return 0;
  }

}
