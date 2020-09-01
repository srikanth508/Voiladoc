import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiFeedashComponent } from './physi-feedash.component';

describe('PhysiFeedashComponent', () => {
  let component: PhysiFeedashComponent;
  let fixture: ComponentFixture<PhysiFeedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiFeedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiFeedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
