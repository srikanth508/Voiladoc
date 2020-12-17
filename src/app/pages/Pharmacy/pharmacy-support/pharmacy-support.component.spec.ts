import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySupportComponent } from './pharmacy-support.component';

describe('PharmacySupportComponent', () => {
  let component: PharmacySupportComponent;
  let fixture: ComponentFixture<PharmacySupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacySupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
