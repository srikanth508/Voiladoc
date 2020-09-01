import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeWorkingDashComponent } from './midwife-working-dash.component';

describe('MidwifeWorkingDashComponent', () => {
  let component: MidwifeWorkingDashComponent;
  let fixture: ComponentFixture<MidwifeWorkingDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeWorkingDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeWorkingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
