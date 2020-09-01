import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeMasterDashComponent } from './medicine-type-master-dash.component';

describe('MedicineTypeMasterDashComponent', () => {
  let component: MedicineTypeMasterDashComponent;
  let fixture: ComponentFixture<MedicineTypeMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineTypeMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
