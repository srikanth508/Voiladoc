import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtientregdashComponent } from './ptientregdash.component';

describe('PtientregdashComponent', () => {
  let component: PtientregdashComponent;
  let fixture: ComponentFixture<PtientregdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtientregdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtientregdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
