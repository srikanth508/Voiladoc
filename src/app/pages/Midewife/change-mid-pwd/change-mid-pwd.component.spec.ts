import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMidPwdComponent } from './change-mid-pwd.component';

describe('ChangeMidPwdComponent', () => {
  let component: ChangeMidPwdComponent;
  let fixture: ComponentFixture<ChangeMidPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMidPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMidPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
