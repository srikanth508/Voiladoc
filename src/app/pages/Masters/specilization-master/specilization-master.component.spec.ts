import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecilizationMasterComponent } from './specilization-master.component';

describe('SpecilizationMasterComponent', () => {
  let component: SpecilizationMasterComponent;
  let fixture: ComponentFixture<SpecilizationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecilizationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecilizationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
