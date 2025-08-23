import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByDressStyle } from './browse-by-dress-style';

describe('BrowseByDressStyle', () => {
  let component: BrowseByDressStyle;
  let fixture: ComponentFixture<BrowseByDressStyle>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [BrowseByDressStyle],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseByDressStyle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
