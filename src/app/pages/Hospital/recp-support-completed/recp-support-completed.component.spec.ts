import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpSupportCompletedComponent } from './recp-support-completed.component';

describe('RecpSupportCompletedComponent', () => {
  let component: RecpSupportCompletedComponent;
  let fixture: ComponentFixture<RecpSupportCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecpSupportCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpSupportCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
