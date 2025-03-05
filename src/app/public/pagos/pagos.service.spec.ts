/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { PagosService } from './services/pagos.service';

describe('Service: Pagos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagosService]
    });
  });

  it('should ...', inject([PagosService], (service: PagosService) => {
    expect(service).toBeTruthy();
  }));
});
