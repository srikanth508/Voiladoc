import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorslotsComponent } from './doctorslots.component';

describe('DoctorslotsComponent', () => {
  let component: DoctorslotsComponent;
  let fixture: ComponentFixture<DoctorslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
