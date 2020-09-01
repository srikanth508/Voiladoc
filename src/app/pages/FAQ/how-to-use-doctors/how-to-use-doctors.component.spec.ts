import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUseDoctorsComponent } from './how-to-use-doctors.component';

describe('HowToUseDoctorsComponent', () => {
  let component: HowToUseDoctorsComponent;
  let fixture: ComponentFixture<HowToUseDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToUseDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToUseDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
