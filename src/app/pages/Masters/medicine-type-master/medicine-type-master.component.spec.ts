import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeMasterComponent } from './medicine-type-master.component';

describe('MedicineTypeMasterComponent', () => {
  let component: MedicineTypeMasterComponent;
  let fixture: ComponentFixture<MedicineTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
