import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioServicesComponent } from './physio-services.component';

describe('PhysioServicesComponent', () => {
  let component: PhysioServicesComponent;
  let fixture: ComponentFixture<PhysioServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
