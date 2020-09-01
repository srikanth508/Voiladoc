import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacydashComponent } from './pharmacydash.component';

describe('PharmacydashComponent', () => {
  let component: PharmacydashComponent;
  let fixture: ComponentFixture<PharmacydashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacydashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
