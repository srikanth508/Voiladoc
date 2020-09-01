import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkingDetailsComponent } from './my-working-details.component';

describe('MyWorkingDetailsComponent', () => {
  let component: MyWorkingDetailsComponent;
  let fixture: ComponentFixture<MyWorkingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
