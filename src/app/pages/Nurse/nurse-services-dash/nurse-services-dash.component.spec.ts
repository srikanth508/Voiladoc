import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseServicesDashComponent } from './nurse-services-dash.component';

describe('NurseServicesDashComponent', () => {
  let component: NurseServicesDashComponent;
  let fixture: ComponentFixture<NurseServicesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseServicesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseServicesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
