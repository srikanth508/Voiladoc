import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredPatientsComponent } from './referred-patients.component';

describe('ReferredPatientsComponent', () => {
  let component: ReferredPatientsComponent;
  let fixture: ComponentFixture<ReferredPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
