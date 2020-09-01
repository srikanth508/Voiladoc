import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeProfileComponent } from './midwife-profile.component';

describe('MidwifeProfileComponent', () => {
  let component: MidwifeProfileComponent;
  let fixture: ComponentFixture<MidwifeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
