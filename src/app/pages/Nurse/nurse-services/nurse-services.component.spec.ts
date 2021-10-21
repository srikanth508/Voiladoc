import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseServicesComponent } from './nurse-services.component';

describe('NurseServicesComponent', () => {
  let component: NurseServicesComponent;
  let fixture: ComponentFixture<NurseServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
