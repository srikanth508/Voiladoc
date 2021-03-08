import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicMasterDashComponent } from './topic-master-dash.component';

describe('TopicMasterDashComponent', () => {
  let component: TopicMasterDashComponent;
  let fixture: ComponentFixture<TopicMasterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicMasterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicMasterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
