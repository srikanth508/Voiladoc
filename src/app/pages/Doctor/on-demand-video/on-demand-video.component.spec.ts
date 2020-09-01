import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandVideoComponent } from './on-demand-video.component';

describe('OnDemandVideoComponent', () => {
  let component: OnDemandVideoComponent;
  let fixture: ComponentFixture<OnDemandVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
