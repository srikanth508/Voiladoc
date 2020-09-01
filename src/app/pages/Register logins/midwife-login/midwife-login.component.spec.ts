import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeLoginComponent } from './midwife-login.component';

describe('MidwifeLoginComponent', () => {
  let component: MidwifeLoginComponent;
  let fixture: ComponentFixture<MidwifeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
