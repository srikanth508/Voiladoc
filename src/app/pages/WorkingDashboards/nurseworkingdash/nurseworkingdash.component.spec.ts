import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseworkingdashComponent } from './nurseworkingdash.component';

describe('NurseworkingdashComponent', () => {
  let component: NurseworkingdashComponent;
  let fixture: ComponentFixture<NurseworkingdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseworkingdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseworkingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
