import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickSlipGeneratorComponent } from './sick-slip-generator.component';

describe('SickSlipGeneratorComponent', () => {
  let component: SickSlipGeneratorComponent;
  let fixture: ComponentFixture<SickSlipGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickSlipGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickSlipGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
