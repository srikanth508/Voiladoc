import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocResolvedTicketsComponent } from './doc-resolved-tickets.component';

describe('DocResolvedTicketsComponent', () => {
  let component: DocResolvedTicketsComponent;
  let fixture: ComponentFixture<DocResolvedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocResolvedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocResolvedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
