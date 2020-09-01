import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtousedashComponent } from './howtousedash.component';

describe('HowtousedashComponent', () => {
  let component: HowtousedashComponent;
  let fixture: ComponentFixture<HowtousedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtousedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtousedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
