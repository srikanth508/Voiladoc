import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyFeesComponent } from './add-my-fees.component';

describe('AddMyFeesComponent', () => {
  let component: AddMyFeesComponent;
  let fixture: ComponentFixture<AddMyFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
