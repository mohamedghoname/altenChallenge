import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomersService } from './customers.service';
import { CustomersData } from './customers.service.data';
import { ServiceRoutes } from './servecisRoutes';
import { Customer } from './../models/customer.model';



describe('CustomersService', () => {
  let service: CustomersService
;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CustomersService
  ]
  });
                    service = TestBed.get(CustomersService
                    );
                    httpMock = TestBed.get(HttpTestingController);

});

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const dummyCustomers: Customer[] = CustomersData.Get_Customers ;

    service.getCustomers().subscribe((Customers) => {
      expect(Customers.length).toBe(2);
      expect(Customers).toEqual(dummyCustomers);
    });

    const request = httpMock.expectOne(ServiceRoutes.CustomersService_getCustomers);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCustomers);
  });
});
