import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HosrecpChangepwdComponent } from './hosrecp-changepwd.component';

describe('HosrecpChangepwdComponent', () => {
  let component: HosrecpChangepwdComponent;
  let fixture: ComponentFixture<HosrecpChangepwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HosrecpChangepwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HosrecpChangepwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
