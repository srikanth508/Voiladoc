import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeMasterDashComponent } from './degree-master-dash.component';

describe('DegreeMasterDashComponent', () => {
  let component: DegreeMasterDashComponent;
  let fixture: ComponentFixture<DegreeMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
