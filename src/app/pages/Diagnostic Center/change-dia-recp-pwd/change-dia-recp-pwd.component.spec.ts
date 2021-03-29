import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDiaRecpPwdComponent } from './change-dia-recp-pwd.component';

describe('ChangeDiaRecpPwdComponent', () => {
  let component: ChangeDiaRecpPwdComponent;
  let fixture: ComponentFixture<ChangeDiaRecpPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDiaRecpPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDiaRecpPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
