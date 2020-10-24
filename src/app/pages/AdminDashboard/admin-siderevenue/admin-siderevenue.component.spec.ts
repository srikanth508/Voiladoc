import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiderevenueComponent } from './admin-siderevenue.component';

describe('AdminSiderevenueComponent', () => {
  let component: AdminSiderevenueComponent;
  let fixture: ComponentFixture<AdminSiderevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSiderevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSiderevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
