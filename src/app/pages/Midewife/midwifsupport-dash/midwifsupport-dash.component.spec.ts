import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifsupportDashComponent } from './midwifsupport-dash.component';

describe('MidwifsupportDashComponent', () => {
  let component: MidwifsupportDashComponent;
  let fixture: ComponentFixture<MidwifsupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifsupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifsupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
