import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsregComponent } from './patientsreg.component';

describe('PatientsregComponent', () => {
  let component: PatientsregComponent;
  let fixture: ComponentFixture<PatientsregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
