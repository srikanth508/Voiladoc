import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallrevenueComponent } from './videocallrevenue.component';

describe('VideocallrevenueComponent', () => {
  let component: VideocallrevenueComponent;
  let fixture: ComponentFixture<VideocallrevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallrevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocallrevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
