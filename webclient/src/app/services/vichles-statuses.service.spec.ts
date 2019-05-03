import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VichlesStatusesService } from './vichles-statuses.service';
import { VichleStatus } from './../models/vichle_status.model';
import { ServiceRoutes } from './servecisRoutes';
import { VichelsStatusesData } from './vichles-statuses.service.data';

describe('VichlesStatus', () => {
  let service: VichlesStatusesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [VichlesStatusesService]
  });
                    service = TestBed.get(VichlesStatusesService);
                    httpMock = TestBed.get(HttpTestingController);
});

  afterEach(() => {
    httpMock.verify();
  });

  it('should return 3 Statuses', () => {
    const dummyVichlesStatuses: VichleStatus[] = VichelsStatusesData.Get_VichelsStatuses;

    service.getVichleStatuses().subscribe((VichlesStatuses) => {
      expect(VichlesStatuses.length).toBe(3);
      expect(VichlesStatuses).toEqual(dummyVichlesStatuses);
    });

    const request = httpMock.expectOne(ServiceRoutes.ViechleStatus);
    expect(request.request.method).toBe('GET');
    request.flush(dummyVichlesStatuses);

  });
});
