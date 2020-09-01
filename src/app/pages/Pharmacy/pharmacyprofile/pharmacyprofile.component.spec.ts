import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyprofileComponent } from './pharmacyprofile.component';

describe('PharmacyprofileComponent', () => {
  let component: PharmacyprofileComponent;
  let fixture: ComponentFixture<PharmacyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
