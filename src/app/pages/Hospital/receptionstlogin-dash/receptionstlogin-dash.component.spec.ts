import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionstloginDashComponent } from './receptionstlogin-dash.component';

describe('ReceptionstloginDashComponent', () => {
  let component: ReceptionstloginDashComponent;
  let fixture: ComponentFixture<ReceptionstloginDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionstloginDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionstloginDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
