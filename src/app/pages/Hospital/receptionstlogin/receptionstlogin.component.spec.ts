import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionstloginComponent } from './receptionstlogin.component';

describe('ReceptionstloginComponent', () => {
  let component: ReceptionstloginComponent;
  let fixture: ComponentFixture<ReceptionstloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionstloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionstloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
