import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditphysiotherapistComponent } from './editphysiotherapist.component';

describe('EditphysiotherapistComponent', () => {
  let component: EditphysiotherapistComponent;
  let fixture: ComponentFixture<EditphysiotherapistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditphysiotherapistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditphysiotherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
