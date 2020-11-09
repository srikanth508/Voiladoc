import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedusersComponent } from './rejectedusers.component';

describe('RejectedusersComponent', () => {
  let component: RejectedusersComponent;
  let fixture: ComponentFixture<RejectedusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
