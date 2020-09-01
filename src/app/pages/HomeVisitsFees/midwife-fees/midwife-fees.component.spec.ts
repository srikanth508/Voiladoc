import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeFeesComponent } from './midwife-fees.component';

describe('MidwifeFeesComponent', () => {
  let component: MidwifeFeesComponent;
  let fixture: ComponentFixture<MidwifeFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
