import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyoffersComponent } from './pharmacyoffers.component';

describe('PharmacyoffersComponent', () => {
  let component: PharmacyoffersComponent;
  let fixture: ComponentFixture<PharmacyoffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyoffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
