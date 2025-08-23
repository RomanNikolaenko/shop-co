import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLangs } from './select-langs';

describe('SelectLangs', () => {
  let component: SelectLangs;
  let fixture: ComponentFixture<SelectLangs>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SelectLangs],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLangs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
