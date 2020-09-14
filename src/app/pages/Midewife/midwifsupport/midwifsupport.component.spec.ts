import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifsupportComponent } from './midwifsupport.component';

describe('MidwifsupportComponent', () => {
  let component: MidwifsupportComponent;
  let fixture: ComponentFixture<MidwifsupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifsupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
