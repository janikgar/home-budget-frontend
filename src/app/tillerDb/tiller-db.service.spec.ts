import { TestBed } from '@angular/core/testing';

import { TillerDbService } from './tiller-db.service';

describe('TillerDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TillerDbService = TestBed.get(TillerDbService);
    expect(service).toBeTruthy();
  });
});
