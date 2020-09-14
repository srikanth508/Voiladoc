import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyioSupportComponent } from './phyio-support.component';

describe('PhyioSupportComponent', () => {
  let component: PhyioSupportComponent;
  let fixture: ComponentFixture<PhyioSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhyioSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyioSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
