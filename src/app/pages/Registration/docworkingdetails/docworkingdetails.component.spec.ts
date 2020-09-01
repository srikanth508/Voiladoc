import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocworkingdetailsComponent } from './docworkingdetails.component';

describe('DocworkingdetailsComponent', () => {
  let component: DocworkingdetailsComponent;
  let fixture: ComponentFixture<DocworkingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocworkingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocworkingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
