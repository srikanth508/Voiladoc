import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifenotificationsComponent } from './midwifenotifications.component';

describe('MidwifenotificationsComponent', () => {
  let component: MidwifenotificationsComponent;
  let fixture: ComponentFixture<MidwifenotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifenotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifenotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
