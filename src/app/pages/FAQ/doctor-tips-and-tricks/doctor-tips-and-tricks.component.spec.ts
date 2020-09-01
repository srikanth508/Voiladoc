import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTipsAndTricksComponent } from './doctor-tips-and-tricks.component';

describe('DoctorTipsAndTricksComponent', () => {
  let component: DoctorTipsAndTricksComponent;
  let fixture: ComponentFixture<DoctorTipsAndTricksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorTipsAndTricksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTipsAndTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
