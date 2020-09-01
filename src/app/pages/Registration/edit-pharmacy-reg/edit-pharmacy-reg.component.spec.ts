import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPharmacyRegComponent } from './edit-pharmacy-reg.component';

describe('EditPharmacyRegComponent', () => {
  let component: EditPharmacyRegComponent;
  let fixture: ComponentFixture<EditPharmacyRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPharmacyRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPharmacyRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
