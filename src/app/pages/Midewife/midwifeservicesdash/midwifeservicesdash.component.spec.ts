import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeservicesdashComponent } from './midwifeservicesdash.component';

describe('MidwifeservicesdashComponent', () => {
  let component: MidwifeservicesdashComponent;
  let fixture: ComponentFixture<MidwifeservicesdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeservicesdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeservicesdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
