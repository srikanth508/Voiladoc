import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRegComponent } from './support-reg.component';

describe('SupportRegComponent', () => {
  let component: SupportRegComponent;
  let fixture: ComponentFixture<SupportRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
