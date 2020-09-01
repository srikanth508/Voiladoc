import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRevComponent } from './doctor-rev.component';

describe('DoctorRevComponent', () => {
  let component: DoctorRevComponent;
  let fixture: ComponentFixture<DoctorRevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
