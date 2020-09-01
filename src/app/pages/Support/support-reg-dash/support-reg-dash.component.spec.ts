import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRegDashComponent } from './support-reg-dash.component';

describe('SupportRegDashComponent', () => {
  let component: SupportRegDashComponent;
  let fixture: ComponentFixture<SupportRegDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportRegDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRegDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
