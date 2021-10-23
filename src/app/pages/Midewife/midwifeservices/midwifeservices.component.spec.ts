import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeservicesComponent } from './midwifeservices.component';

describe('MidwifeservicesComponent', () => {
  let component: MidwifeservicesComponent;
  let fixture: ComponentFixture<MidwifeservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
