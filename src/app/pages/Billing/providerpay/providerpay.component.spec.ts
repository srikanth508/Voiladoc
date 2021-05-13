import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderpayComponent } from './providerpay.component';

describe('ProviderpayComponent', () => {
  let component: ProviderpayComponent;
  let fixture: ComponentFixture<ProviderpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
