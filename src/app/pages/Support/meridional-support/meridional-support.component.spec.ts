import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeridionalSupportComponent } from './meridional-support.component';

describe('MeridionalSupportComponent', () => {
  let component: MeridionalSupportComponent;
  let fixture: ComponentFixture<MeridionalSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeridionalSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeridionalSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
