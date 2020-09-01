import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyregistrationComponent } from './pharmacyregistration.component';

describe('PharmacyregistrationComponent', () => {
  let component: PharmacyregistrationComponent;
  let fixture: ComponentFixture<PharmacyregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
