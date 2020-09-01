import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InclinicAppointementsComponent } from './inclinic-appointements.component';

describe('InclinicAppointementsComponent', () => {
  let component: InclinicAppointementsComponent;
  let fixture: ComponentFixture<InclinicAppointementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclinicAppointementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclinicAppointementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
