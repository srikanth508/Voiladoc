import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallappointementsComponent } from './videocallappointements.component';

describe('VideocallappointementsComponent', () => {
  let component: VideocallappointementsComponent;
  let fixture: ComponentFixture<VideocallappointementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallappointementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocallappointementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
