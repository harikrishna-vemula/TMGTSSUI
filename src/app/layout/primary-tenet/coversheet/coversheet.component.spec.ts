import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoversheetComponent } from './coversheet.component';

describe('CoversheetComponent', () => {
  let component: CoversheetComponent;
  let fixture: ComponentFixture<CoversheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoversheetComponent]
    });
    fixture = TestBed.createComponent(CoversheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
