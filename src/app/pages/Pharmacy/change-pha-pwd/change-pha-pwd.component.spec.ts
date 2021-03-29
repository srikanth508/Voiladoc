import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhaPwdComponent } from './change-pha-pwd.component';

describe('ChangePhaPwdComponent', () => {
  let component: ChangePhaPwdComponent;
  let fixture: ComponentFixture<ChangePhaPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhaPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhaPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
