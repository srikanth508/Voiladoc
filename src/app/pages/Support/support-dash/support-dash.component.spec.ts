import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDashComponent } from './support-dash.component';

describe('SupportDashComponent', () => {
  let component: SupportDashComponent;
  let fixture: ComponentFixture<SupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
