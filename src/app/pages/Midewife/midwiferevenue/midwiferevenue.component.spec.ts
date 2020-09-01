import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwiferevenueComponent } from './midwiferevenue.component';

describe('MidwiferevenueComponent', () => {
  let component: MidwiferevenueComponent;
  let fixture: ComponentFixture<MidwiferevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwiferevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwiferevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
