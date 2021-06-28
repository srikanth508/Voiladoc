import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaPharmaPayComponent } from './dia-pharma-pay.component';

describe('DiaPharmaPayComponent', () => {
  let component: DiaPharmaPayComponent;
  let fixture: ComponentFixture<DiaPharmaPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaPharmaPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaPharmaPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
