import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeDashboardComponent } from './midwife-dashboard.component';

describe('MidwifeDashboardComponent', () => {
  let component: MidwifeDashboardComponent;
  let fixture: ComponentFixture<MidwifeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
