import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryCompanyComponent } from './edit-delivery-company.component';

describe('EditDeliveryCompanyComponent', () => {
  let component: EditDeliveryCompanyComponent;
  let fixture: ComponentFixture<EditDeliveryCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
