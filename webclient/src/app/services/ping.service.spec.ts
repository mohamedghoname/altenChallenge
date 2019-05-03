import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PingService } from './ping.service';
import { ServiceRoutes } from './servecisRoutes';


describe('PingService', () => {
  let service: PingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PingService]
  });
                    service = TestBed.get(PingService);
                    httpMock = TestBed.get(HttpTestingController);

});

  it('Should accept a valid VIN', () => {


    service.ping('1234').subscribe(( s ) => {
      expect(s).toBe('200');

    });

    const request = httpMock.expectOne(ServiceRoutes.PingService_ping);
    expect(request.request.method).toBe('POST');
    request.flush(200);

  });

  it('Should reject invalid VIN', () => {

    service.ping('456').subscribe(( s ) => {
      expect(s).toBe('400');
    });

    const request = httpMock.expectOne(ServiceRoutes.PingService_ping);
    expect(request.request.method).toBe('POST');
    request.flush(400);

  });
});


describe('Simulate OFF', () => {
  let service: PingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PingService]
  });
                    service = TestBed.get(PingService);
                    httpMock = TestBed.get(HttpTestingController);

});

  it('Should accept a valid VIN', () => {


    service.simulateOff('1234').subscribe(( s ) => {
      expect(s).toBe('200');

    });

    const request = httpMock.expectOne(ServiceRoutes.PingService_ping);
    expect(request.request.method).toBe('POST');
    request.flush(200);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should reject invalid VIN', () => {

    service.simulateOff('456').subscribe(( s ) => {
      expect(s).toBe('400');
    });

    const request = httpMock.expectOne(ServiceRoutes.PingService_ping);
    expect(request.request.method).toBe('POST');
    request.flush(400);

  });
});
