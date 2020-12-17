import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySupportDashComponent } from './pharmacy-support-dash.component';

describe('PharmacySupportDashComponent', () => {
  let component: PharmacySupportDashComponent;
  let fixture: ComponentFixture<PharmacySupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacySupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacySupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
