import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyioSupportDashComponent } from './phyio-support-dash.component';

describe('PhyioSupportDashComponent', () => {
  let component: PhyioSupportDashComponent;
  let fixture: ComponentFixture<PhyioSupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhyioSupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyioSupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
