import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPatientsComponent } from './register-patients.component';

describe('RegisterPatientsComponent', () => {
  let component: RegisterPatientsComponent;
  let fixture: ComponentFixture<RegisterPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
