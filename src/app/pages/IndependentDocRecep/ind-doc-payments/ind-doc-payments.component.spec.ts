import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndDocPaymentsComponent } from './ind-doc-payments.component';

describe('IndDocPaymentsComponent', () => {
  let component: IndDocPaymentsComponent;
  let fixture: ComponentFixture<IndDocPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndDocPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndDocPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
