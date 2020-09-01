import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapdashComponent } from './soapdash.component';

describe('SoapdashComponent', () => {
  let component: SoapdashComponent;
  let fixture: ComponentFixture<SoapdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
