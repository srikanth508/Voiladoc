import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyWorkingDetailsComponent } from './add-my-working-details.component';

describe('AddMyWorkingDetailsComponent', () => {
  let component: AddMyWorkingDetailsComponent;
  let fixture: ComponentFixture<AddMyWorkingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyWorkingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyWorkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
