import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistLoginComponent } from './receptionist-login.component';

describe('ReceptionistLoginComponent', () => {
  let component: ReceptionistLoginComponent;
  let fixture: ComponentFixture<ReceptionistLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
