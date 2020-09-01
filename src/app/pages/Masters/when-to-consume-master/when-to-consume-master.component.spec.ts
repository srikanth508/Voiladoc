import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenToConsumeMasterComponent } from './when-to-consume-master.component';

describe('WhenToConsumeMasterComponent', () => {
  let component: WhenToConsumeMasterComponent;
  let fixture: ComponentFixture<WhenToConsumeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhenToConsumeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhenToConsumeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
