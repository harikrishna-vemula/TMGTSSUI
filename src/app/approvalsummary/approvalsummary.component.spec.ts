import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsummaryComponent } from './approvalsummary.component';

describe('ApprovalsummaryComponent', () => {
  let component: ApprovalsummaryComponent;
  let fixture: ComponentFixture<ApprovalsummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalsummaryComponent]
    });
    fixture = TestBed.createComponent(ApprovalsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
