import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InclinicRevenuComponent } from './inclinic-revenu.component';

describe('InclinicRevenuComponent', () => {
  let component: InclinicRevenuComponent;
  let fixture: ComponentFixture<InclinicRevenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclinicRevenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclinicRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
