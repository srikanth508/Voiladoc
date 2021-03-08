import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableLocalDoctorComponent } from './enable-local-doctor.component';

describe('EnableLocalDoctorComponent', () => {
  let component: EnableLocalDoctorComponent;
  let fixture: ComponentFixture<EnableLocalDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableLocalDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableLocalDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
