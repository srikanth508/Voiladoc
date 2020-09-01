import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagdashComponent } from './diagdash.component';

describe('DiagdashComponent', () => {
  let component: DiagdashComponent;
  let fixture: ComponentFixture<DiagdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
