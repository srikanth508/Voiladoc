import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyfeesComponent } from './edit-myfees.component';

describe('EditMyfeesComponent', () => {
  let component: EditMyfeesComponent;
  let fixture: ComponentFixture<EditMyfeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyfeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
