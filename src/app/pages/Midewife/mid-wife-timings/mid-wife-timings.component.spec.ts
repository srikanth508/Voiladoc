import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidWifeTimingsComponent } from './mid-wife-timings.component';

describe('MidWifeTimingsComponent', () => {
  let component: MidWifeTimingsComponent;
  let fixture: ComponentFixture<MidWifeTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidWifeTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidWifeTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
