import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysioFeesComponent } from './physio-fees.component';

describe('PhysioFeesComponent', () => {
  let component: PhysioFeesComponent;
  let fixture: ComponentFixture<PhysioFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysioFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysioFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
