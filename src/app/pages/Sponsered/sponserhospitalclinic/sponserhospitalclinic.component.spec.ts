import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponserhospitalclinicComponent } from './sponserhospitalclinic.component';

describe('SponserhospitalclinicComponent', () => {
  let component: SponserhospitalclinicComponent;
  let fixture: ComponentFixture<SponserhospitalclinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponserhospitalclinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponserhospitalclinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
