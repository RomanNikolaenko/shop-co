import { TestBed } from '@angular/core/testing';

import { IsCurrentRoute } from './is-current-route';

describe('IsCurrentRoute', () => {
  let service: IsCurrentRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsCurrentRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
