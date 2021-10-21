import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioServicesDashComponent } from './physio-services-dash.component';

describe('PhysioServicesDashComponent', () => {
  let component: PhysioServicesDashComponent;
  let fixture: ComponentFixture<PhysioServicesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioServicesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioServicesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
