import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RulesIteratorService } from './rules_iterator';

describe('RulesIteratorService', () => {
  let service: RulesIteratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RulesIteratorService]
    });
    service = TestBed.inject(RulesIteratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});