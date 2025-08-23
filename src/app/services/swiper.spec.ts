import { TestBed } from '@angular/core/testing';

import { Swiper } from './swiper';

describe('Swiper', () => {
  let service: Swiper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Swiper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
