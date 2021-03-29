import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhysiopwdComponent } from './change-physiopwd.component';

describe('ChangePhysiopwdComponent', () => {
  let component: ChangePhysiopwdComponent;
  let fixture: ComponentFixture<ChangePhysiopwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhysiopwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhysiopwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
