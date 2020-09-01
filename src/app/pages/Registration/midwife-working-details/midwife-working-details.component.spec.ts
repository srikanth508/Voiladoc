import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeWorkingDetailsComponent } from './midwife-working-details.component';

describe('MidwifeWorkingDetailsComponent', () => {
  let component: MidwifeWorkingDetailsComponent;
  let fixture: ComponentFixture<MidwifeWorkingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeWorkingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeWorkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
