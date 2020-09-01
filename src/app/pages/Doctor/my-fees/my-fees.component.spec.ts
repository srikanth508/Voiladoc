import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeesComponent } from './my-fees.component';

describe('MyFeesComponent', () => {
  let component: MyFeesComponent;
  let fixture: ComponentFixture<MyFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
