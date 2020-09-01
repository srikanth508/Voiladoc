import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurserevenueComponent } from './nurserevenue.component';

describe('NurserevenueComponent', () => {
  let component: NurserevenueComponent;
  let fixture: ComponentFixture<NurserevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurserevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurserevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
